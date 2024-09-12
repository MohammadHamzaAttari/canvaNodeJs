const crypto = require('crypto');

const codeVerifier = crypto.randomBytes(96).toString("base64url");
console.log("codeVerifier", codeVerifier);

const codeChallenge = crypto.createHash("sha256").update(codeVerifier).digest("base64url");
console.log("code challenge", codeChallenge);
const state = crypto.randomBytes(96).toString("base64url");
console.log("state",state)
module.exports={codeVerifier,codeChallenge}