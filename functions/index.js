const functions = require('firebase-functions');
const app = require('express')();
const FBAuth = require('./util/fbAuth');
const {getAllScreams,postOneScream, getScream,commentOnScream, likeScream, unlikeScream, deleteScream}= require('./handlers/screams');
const { signup, login, uploadImage, addUserDetails, getAuthenticatedUser } = require('./handlers/users');
const { db } = require('./util/admin');

//j
//   const firebase =  require('firebase');
//   firebase.initializeApp(config);

  //scream routes
  app.get('/screams', getAllScreams);
  app.post('/scream', FBAuth, postOneScream);
  app.get('/scream/:screamId', getScream);
  
  // TODO: delete scream
  app.delete('/scream/:screamId', FBAuth, deleteScream);
  app.get('/scream/:screamId/like', FBAuth, likeScream);
  app.get('/scream/:screamId/unlike', FBAuth, unlikeScream);
  app.post('/scream/:screamId/comment', FBAuth, commentOnScream);


  // users routes
  app.post('/signup', signup);
  app.post('/login', login);
  app.post('/user/image', FBAuth, uploadImage);
  app.post('/user', FBAuth, addUserDetails);
  app.get('/user', FBAuth, getAuthenticatedUser);
  

//link
exports.api = functions.https.onRequest(app);

exports.createNotificationOnLike = functions.firestore.document('likes/{id}')
.onCreate((snapshot) =>{
  db.doc(`/screams/${snapshot.data().screamId}`).get()
  .then(doc => {
    if(doc.exists){
      return db.doc(`/notifications/${snapshot.id}`).set({
        createdAt: new Date().toISOString(),
        recipient: doc.data().userHandle,
        sender: snapshot.data().userHandle,
        type: 'like',
        read: false,
        screamId: doc.id
      });
    }
  })
  .then(() => {
    return;
  })
  .catch(err =>  {
    console.error(err);
    return;
  });
});

exports.deleteNotificationOnUnlike = functions.firestore.document('likes/{id}')
.onDelete((snapshot) =>{
  db.doc(`/notifications/${snapshot.id}`)
  .delete()
  .then(() => {
    return;
  })
  .catch((err) =>{
    console.error(err);
    return;
  });
});

exports.createNotificationOnComment = functions.firestore.document('comments/{id}')
.onCreate((snapshot) =>{
  db.doc(`/screams/${snapshot.data().screamId}`).get()
  .then(doc => {
    if(doc.exists){
      return db.doc(`/notifications/${snapshot.id}`).set({
        createdAt: new Date().toISOString(),
        recipient: doc.data().userHandle,
        sender: snapshot.data().userHandle,
        type: 'comment',
        read: false,
        screamId: doc.id
      });
    }
  })
  .then(() => {
    return;
  })
  .catch(err =>  {
    console.error(err);
    return;
  });
});