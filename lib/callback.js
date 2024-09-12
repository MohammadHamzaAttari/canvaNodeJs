const axios = require('axios');
const qs = require('qs');
const { codeVerifier } = require('../crypto');
const appConfig=require('../appConfig.json')
async function callback(req, res) {
  try {
    let data = qs.stringify({
      'grant_type': 'authorization_code',
      'code_verifier': codeVerifier,
      'code': req.query.code,
      'redirect_uri': 'http://127.0.0.1:3000/oauth/callback',
      'client_id': appConfig.clientId,
      'client_secret': appConfig.clientSecret
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.canva.com/rest/v1/oauth/token',
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: data
    };
    
    // Make the request for the access token
    const response = await axios.request(config);
    const accessToken = response.data.access_token;
    console.log("accessToken:",accessToken)
    const expiresIn = response.data.expires_in;
    console.log("expiresIn:",expiresIn)
    // Calculate expiration time (current time + expires_in)
    const tokenExpiry = Date.now() + (expiresIn * 1000); // expires_in is in seconds, convert to ms

    // Store access token and expiry in session
    req.session.accessToken = accessToken;
    req.session.tokenExpiry = tokenExpiry;

    // Redirect user after successful token exchange
    res.redirect('/');
  } catch (error) {
    console.error('Error in callback:', error);
    res.status(500).send('Authentication failed');
  }
}

module.exports = { callback };
