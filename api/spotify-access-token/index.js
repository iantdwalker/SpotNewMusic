module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    context.log('Azure function runtime version: ' + process.env.FUNCTIONS_EXTENSION_VERSION);
    context.log('Node js runtime version: ' + process.env.WEBSITE_NODE_DEFAULT_VERSION);
    
    const fetch = require("node-fetch");
    const encodedClientValue = Buffer.from(process.env.clientId + ':' + process.env.clientSecret).toString('base64');
    
    try {
        const response = await fetch(process.env.spotifyRequestTokenUrl, {
            method: 'POST',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + encodedClientValue
            },
            body: 'grant_type=client_credentials'
        });

        if (response.ok) {
            // response.status >= 200 && response.status < 300
            const data = await response.json();
            context.log('Spotify Client Credentials Token Response OK: ' + response.status + ' Token Data: ' + JSON.stringify(data));

            // headers for CORS - does not seem to be required via Azure Function api
            /* context.res.set({
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-type',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
            }); */
        
            context.res = { status: response.status, body: data };
        } else {
            context.log('Spotify clientCredentialsAccessToken fetch error. response.status is not ok: ' + response.status);
            context.res = { status: response.status };
        }
    }
    catch (error) {
        context.log('Spotify clientCredentialsAccessToken fetch error: ' + error);
    }
}