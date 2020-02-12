const functions = require('firebase-functions');
const admin = require("firebase-admin");
const app = require('express')();

let defaultAppConfig = {
    credential: admin.credential.cert({
        "type": "service_account",
        "project_id": "socialapp-2e25e",
        "private_key_id": "de34bbb366e3c052ec319430ee6e9d694c013a4b",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCjduvRYPy2hmDY\nu0rLIG03ij7rMMt7mQTjJ7DJ12gF17QILTW9VcM3gXPMZ/RXx3Yv5txyBnJouu62\n+gkLTeSf25NjIZGnOsANa1Z8KFfy+2W9XsaOwrORyUrJabj+3DQPPlOA4DWy5Lcc\n7pIGzcV8neRonP8//w0nyZge+W8kbSs2aaa9BbdY21nieCAx2GdQSiaHcoTOVcD1\n6jpfeNQahHe8gMpaWZYB9L7PryRLaWO0zvb/BCZjTkaWZyhQT+M/KdUzw/z0DdUr\nnAdI5iu5zFH2YRg4EveK+IT17E0EWE4jBO5Xng+3vL987/Bj8KjPw/OSEkcTvxyQ\n/RFDHGZ7AgMBAAECggEAEwHDPnpSMtWshybn9cx/G+PQQxVOY8Bm0r7iYzslFkt+\n3ICH7MxUbFd6DnzRQC+qLLxhn5njow0xWpyiK+qnuHVrTYMxZh+CW00YJkxOmwCO\nU5b57CRJhZxr52rf9DUd5zPZDnWDk5ndN4Op/m6IwF+07PvBq5Wi2EssNqshjZDl\nySAZkWunLqgOkDyBBjbJ2SSj077yBi2XLLECcIDFLtJ1Q4z1qogfeXTw6PiWAWZH\nLKxlNjbwdXCRmKRwkFg7umOdqMzQGKwyhBx57doMuyQKDGk6cSkjuQUMVt5xe0nV\naW4Imk44nB4Cket94qUNIAlyLSzu+7sG1qouX3mVoQKBgQDT0ZQ/f1hivVzu72qS\nJ6x4L/fgnYYlWoptgK+T54g2RJQh4OVP4aCBUhyVGXNlBnxK3C1KthgGm+/+fwCY\n2Wbqq1CjMAJrjs344jEtuH/p1f2b8avPbN4Br80Kw5fuqy339Holh4a9C/MhIHkj\nfqGkRvz4lcv272kmibpBYRJxcQKBgQDFj2Po13EtKEHZ21sA3+ew0oAhX2By8a9l\ns401pDuK3lxTuttHKBHwBvaCOYO6uSoKUA0q4aMZ3VlowqnPMGFFFaJYa+H3skKb\n4EdRIF/PYf7YZ2NGOkAM6F5wZqpnLnH4RtxT9dtnmaMS8nMRFm/Y29Nemvh4OzO1\nlRh4gSSgqwKBgFtcOvAEUjAMcwgPtcyiVg5kyipUZya3XZuLdK97ntGhVK8kHGQO\n8ja1HuTkXFRHrtZvDw35anV3TtVbG/vRUUWIbLhmHbUcnBRsI0AQIwPNq5xWaX+G\n+l6J4Atzf5WOub4H8aM8SE5D2DMCmZ1IohmEENp7acTxUE4x+2b1oonRAoGBAL54\nVZn6hKpF4t84xk9ckBOBj3kdbG7FpxZFewJZmfJ0Gc28HIdJEao5/FZnPyK6PNb+\ngQNz0X0xVG9VJsST32PszL21HYJjAicon3mO3fCiiUJ4w1TE+lW3fr2drfKW69iz\n8N6d7e+/R2MQD3JNEH6iyfGvNZktcthBq/saf4bLAoGBAKJT+pLMyfqVt/EBYRxU\nLYqFYceMalOJI70Y0/a5zl6P+P5lVT1kNRXR5Mk8S3QhAww/hW53DJRDAllBP9+i\n4dSUN24sRH15H2O1XXGYRPiGOEBPCvw7lAuY5f+4a5tTPfpf0CWornAP/MnMeX4C\n6wuucCvPmdayNfp3azCWxoHM\n-----END PRIVATE KEY-----\n",
        "client_email": "socialapp-2e25e@appspot.gserviceaccount.com",
        "client_id": "110381063559436087465",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/socialapp-2e25e%40appspot.gserviceaccount.com"
    }),
    databaseURL: 'https://socialapp-2e25e.firebaseio.com/'
}

admin.initializeApp(defaultAppConfig);

//var serviceAccount = require("path/to/serviceAccountKey.json");
 
 

  const config = {
    apiKey: "AIzaSyAySVV2P_A4ACZkJdbsxMMx-vTtiYkIgAY",
    authDomain: "socialapp-2e25e.firebaseapp.com",
    databaseURL: "https://socialapp-2e25e.firebaseio.com",
    projectId: "socialapp-2e25e",
    storageBucket: "socialapp-2e25e.appspot.com",
    messagingSenderId: "387325985079",
    appId: "1:387325985079:web:d4598f22851ebd1b3edab2",
    measurementId: "G-H90077G5KV"
 
  };
  const firebase =  require('firebase');
  firebase.initializeApp(config);

  const db = admin.firestore();


app.get('/screams', (req, res) =>{
    db
    .collection('screams')
    .orderBy('createdAt', 'desc')
    .get()
    .then(data => {
        let screams = [];
        data.forEach(doc => {
            screams.push({
                screamId: doc.id,
                body: doc.data().body,
                userHandle: doc.data().userhandle,
                createdAt: doc.data().createdAt,
                commentCount: doc.data().commentCount,
                likeCount: doc.data().likeCount
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
    db
        .collection('screams')
        .add(newScream)
        .then((doc) => {
            res.json({ message: `document ${doc.id} created successfully`});
        })
        .catch(err => {
            res.status(500).json({error: 'something went wrong'});
            console.error(err);
        });
});

//signup route

app.post('/signup', (req, res) => {
    const newUser = {
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      handle: req.body.handle
    };

    db.doc(`/users/${newUser.handle}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return res.status(400).json({ handle: 'this handle is already taken' });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then((data) => {
       
        return data.user.getIdToken();
      })
 
    .then((token) => {
        return res.status(201).json({ token });
    })
    .catch((err) =>{
        console.error(err);
        return res.status(500).json({ error: err.code });
        })
    });


    // firebase
    //     .auth()
    //     .createUserWithEmailAndPassword(newUser.email, newUser.password)
    //     .then(data => {
    //      return res
    //         .status(201)
    //         .json({ message: `user ${data.user.uid} signed up successfully` });
    //     })
    //     .catch((err) => {
    //         console.error(err);
    //         return res
    //         .status(500)
    //         .json({error: err.code});
    //     });

    // db.doc(`/users/${newUser.handle}`).get()
    // .then(doc => {
    //     if(doc.exists){
    //         return res.status(400).json({ handle: 'this handle is already taken' });
    //     } else {
    //         return firebase
    //         .auth()
    //         .createUserWithEmailAndPassword(newUser.email, newUser.password);
    //     }
    // })
    // .then((data) => {
    //     userId = data.user.uid;
    //     return data.user.getIdToken();
    // })
    // .then((token) =>{
    //     token = token;
    //     const userCredentials = {
    //         handle: newUser.handle,
    //         email: newUser.email,
    //         createdAt: new Date().toISOString(),
    //         userId
    //     };
    //     return db.doc(`/users/${newUser.handle}`).set(userCredentials);
    // })
    // .then(() => {
    //     return res.status(201).json({ token });

    // })
    // .catch((err) =>{
    //     console.error(err);
    //     if(err.code === 'auth/email-already-in-use'){
    //         return res.status(400).json({ email: 'Email is already in use'});
    //     } else {
    //         return res.status(500).json({ error: err.code });
    //     }
    // })

exports.api = functions.https.onRequest(app);

