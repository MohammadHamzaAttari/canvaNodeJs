const express = require('express');
const multer = require('multer');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const session = require('express-session');
const initiateAuth = require('./lib/initiate');
const { callback } = require('./lib/callback');
const refreshToken=require('./lib/refresh')

const app = express();
const upload = multer({ dest: 'uploads/' });

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Set up session middleware
app.use(session({
  secret: `${require('crypto').randomBytes(64).toString('hex')}`,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // For production, set secure to true
}));

// Existing routes
app.get('/initiate', initiateAuth);
app.get('/oauth/callback', callback);

// Middleware to check for valid access token
function ensureAccessToken(req, res, next) {
  if (req.session.accessToken && Date.now() < req.session.tokenExpiry) {
    next();
  } else {
    res.redirect('/initiate');
  }
}

// POST route to handle file upload
app.post('/upload', upload.single('file'), ensureAccessToken, async (req, res) => {
  try {
    const filePath = path.join(__dirname, req.file.path);
    const fileStream = fs.createReadStream(filePath);

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.canva.com/rest/v1/asset-uploads',
      headers: {
        'Authorization': `Bearer ${req.session.accessToken}`,
        'Content-Type': 'application/octet-stream',
        'Asset-Upload-Metadata': '{ "name_base64": "TXkgQXdlc29tZSBVcGxvYWQg8J+agA==" }'
      },
      data: fileStream
    };

    const response = await axios(config);
    fs.unlinkSync(filePath);

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('File upload failed');
  }
});

// Start the server
app.listen(3000, () => {
  console.log('App listening on port 3000');
});
