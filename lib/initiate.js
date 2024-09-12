//const config = require('../config.json');
const {codeChallenge}=require('../crypto')

async function initiateAuth(req, res) {
    // const options = {
    //     requestType: "code",
    //     // redirectUri: "http://localhost:3000/oauth/callback",
    //     redirectUri: "http://localhost:3000/oauth/callback",
    //     clientId: config.clientId,
    //     scopes: [
            
    //         "contacts.readonly",
          
    //         "opportunities.readonly"

            

            
            
            
    //     ]
    // };
    let url = `https://www.canva.com/api/oauth/authorize?code_challenge_method=s256&response_type=code&client_id=OC-AZHcQmOBlAcY&redirect_uri=http%3A%2F%2F127.0.0.1%3A3000%2Foauth%2Fcallback&scope=app:read%20app:write%20design:content:read%20design:meta:read%20design:content:write%20design:permission:read%20design:permission:write%20folder:read%20folder:write%20folder:permission:read%20folder:permission:write%20asset:read%20asset:write%20comment:read%20comment:write%20brandtemplate:meta:read%20brandtemplate:content:read%20profile:read&code_challenge=${codeChallenge}`;


    return res.redirect(url);
}

module.exports = initiateAuth;
