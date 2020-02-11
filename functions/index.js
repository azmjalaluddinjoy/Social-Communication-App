const functions = require('firebase-functions');
//const admin = require('firebase-admin');

var admin = require("firebase-admin");

//var serviceAccount = require("path/to/serviceAccountKey.json");


let defaultAppConfig = {
    credential: admin.credential.cert({
        "type": "service_account",
        "project_id": "socialapp-2e25e",
        "private_key_id": "4f57a57b7851b996e8e15a1dd3f498a736804a50",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCvy9JALEfVm0d5\nqDgxCY31lBtvFaZhAIXIaVJhPxy83Wv6dbM8qWydkTQinZfIOI/LhQDTkGT8ktuE\nX+71TijDBlM8S4GT2NV68YMZe4a9Do7xVEiweurweYgJWxNaFFncS7DAljMdpctz\nf++uyEtCT6KezepcsVhk+KdddZOiPQYm2jKPQ1lx3iAoyTghDM10F6bkV8FyhWMs\nbTEdrpsPIeiOMFA7OH3cy67qgIkuaSriFree+f0uJ4GEPIcSs6tjb2lchSKzbuMF\nPhFNXHSrTCq8IBngSgmsCeyOV9X+ufXYvXH2JLaZr76PoH/xPjolUQD8iwEbuIt2\nK0Jw/I51AgMBAAECggEABaHiY993Urr1pIp0+G89ruFWqq23JbL6VlQ3iTmYLl3q\nxHzKaBZmjjrVgIlrkETtqH/jqaOd9LCw21ImihH9wNfeSVeC+I1xM43y3Rll1P9X\nKZjBdnQNvHQsXV5fZZqy0VnUeSsmypuiA9qUv5UXwjFifLOMv3kII74KwLYQa5l6\nz/hoS0rtWwM0pvxcyOqTMdtwu8BOSydvtH3vJLZ5WD3xSdDtvDKO7GkBKE381V4u\nkenjythdgnFaLrseg92J2BUO1egAEzBTe2bm5z3WnwLxCYq7a6Y3bftgKFX2zUzj\nIRKEungAJ6gfbs4x0T4iiJLeXBknyViHhEID0+u6sQKBgQDgrCrCTFUOx9MfIWyE\nkIf6sO4goXnR6zuf67w20Mylz9Jvuz6uusynZE8RS70NGz+yEIIOupYL54Xag27h\na2CyKG5fJx4/BgRGgi0bIimpZi/YmzCSdYka+SwipMxNMdg0Mz/RqVeWe94uLZBm\nLokdN0dc4NGfRGbVqIOAQ/aa0QKBgQDITvsePxA6ZTZLtiGwooysbVCHD5CKvJG+\nJA3FtGiE9rvDWJoWKbs5E6NJTkd51kLuH7ST1RnNhBh6Vw4NKjp5BIShmzGshDB3\nLUea7NZ0+CwDEOaiKYpk93g+UcVt4oeqq2qR8hC+vqhAv3+cfwSCfl8dVKDMjQBY\nh9J7EwRaZQKBgQCfGSw6ZSWCjvyxOdEH2vWAEBTA5LhIb+TMLXod8yRIcu+ZEaak\nw0EzdHQNUm3wvxAO/2OqHHUuvufpwlMdrBVQdBMcrK3dgVw7telNIpcQD33oTJVL\n0ZGimTqo2byXGan55STXSqzsspC2cKulwGR2XPPbEJVAzIZp3Kgqh3Y1UQKBgQCi\nZx7EnB69KbhG1EkmW/QwDIUgq+bmBRMpFTQxWh7vxtfe/uQXGgiYsypNUfEzgBtN\n01jmDv3XmcT608ApvlYgLiCWoiw5Egf1aDnJC0KpHVkZt0c2rPVu/RF5fXTTrbmP\nD2HdKGSZMh1aOajuKjFu16SoNCgXEC76mEx3yqhZ3QKBgA6RtR4SzZTzKUiJruIF\nGt8AD4Bmz/xLOo6xEJQF/L3QYNgLHNINv1DHUDCVBtVDQKdJOf+ctrU77EfgeYd/\nljDdACjKRBddPHLwSTCFASE7z7xb27NZEmhJwvny6EppsRI4q5LD+Ng1tTcFDyPF\nQ3NX1g8BiPfcjvcAUHk0PA+m\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-zrhrv@socialapp-2e25e.iam.gserviceaccount.com",
        "client_id": "101887291894340379013",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-zrhrv%40socialapp-2e25e.iam.gserviceaccount.com"
    }),
    databaseURL: 'https://socialapp-2e25e.firebaseio.com/'
}
 
  admin.initializeApp(defaultAppConfig);
  const express = require('express');
  const app = express();


app.get('/screams', (req, res) =>{
    admin.firestore().collection('screams').orderBy('createdAt', 'desc').get()
    .then(data => {
        let screams = [];
        data.forEach(doc => {
            screams.push({
                screamId: doc.id,
                body: doc.data().body,
                userHandle: doc.data().userhandle,
                createdAt: doc.data().createdAt
            });
        })
        return res.json(screams);
    })
    .catch(err => console.error(err));
})


app.post('/scream', (req, res) => {
    const newScream  = {
        body: req.body.body,
        userHandle: req.body.userHandle,
        createdAt: new Date().toISOString()
    };
    admin.firestore()
        .collection('screams').add(newScream).then((doc) => {
            res.json({ message: `document ${doc.id} created successfully`});
        })
        .catch(err => {
            res.status(500).json({error: 'something went wrong'});
            console.error(err);
        });
});

// https://baseurl.com/api/

exports.api = functions.https.onRequest(app);

