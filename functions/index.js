const functions = require('firebase-functions');

const app = require('express')();

const FBAuth = require('./util/fbAuth');
const { getAllScreams, postOneScream } = require('./handlers/screams');
const { signup, login, uploadImage } = require('./handlers/users');

//j
//   const firebase =  require('firebase');
//   firebase.initializeApp(config);

  //scream routes
  app.get('/screams', getAllScreams);
  app.post('/scream', FBAuth, postOneScream);

  // users routes
  app.post('/signup', signup);
  app.post('/login', login);
  app.post('/user/image', FBAuth, uploadImage);

//link
exports.api = functions.https.onRequest(app);

