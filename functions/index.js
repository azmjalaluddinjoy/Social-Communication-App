const functions = require('firebase-functions');
const app = require('express')();
const FBAuth = require('./util/fbAuth');
const {getAllScreams,postOneScream, getScream,commentOnScream, likeScream, unlikeScream, deleteScream}= require('./handlers/screams');
const { signup, login, uploadImage, addUserDetails, getAuthenticatedUser, getUserDetails, markNotificationsRead} = require('./handlers/users');
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
  app.get('/user/:handle', getUserDetails);
  app.post('/notifications', FBAuth, markNotificationsRead);
  

//link
exports.api = functions.https.onRequest(app);


//copied from the git download my success run file-folder
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

//Finishing up cloud functions
// exports.exports.createNotificationOnLike = functions
// .firestore.document('likes/{id}')
// .onCreate((snapshot) => {
  // return db
  // .doc(`/screams/${snapshot.data().screamId}`)
  // .get()
  // .then((doc) => {
  //   //if(doc.exists && doc.data().userHandle !== snapshot.data().userHandle){
  //     return db.doc(`/notifications/${snapshot.id}`).set({
  //       createdAt: new Date().toISOString(),
  //       recipient: doc.data().userHandle,
  //       sender: snapshot.data().userHandle,
  //       type: 'like',
  //       read: false,
  //       screamId: doc.id
  //     });
  //   }
  // })
  // .then(() => {
  //   return;
  // })
  // .catch((err) => {
  //   console.error(err);
  //   return;
  // });
// );


//Joybangla
// exports.createNotificationOnLike = functions
//   .firestore.document('likes/{id}')
//   .onCreate((snapshot) => {
//   if(doc.exists){
//     return db
//       .doc(`/screams/${snapshot.data().screamId}`)
//       .get()
//       .then((doc) => {
//         //console.log(`{doc.id}`);
//         if (
//           doc.exists &&
//           doc.data().userHandle !== snapshot.data().userHandle
//         ) {
//           return db.doc(`/notifications/${snapshot.id}`).set({
//             createdAt: new Date().toISOString(),
//             recipient: doc.data().userHandle,
//             sender: snapshot.data().userHandle,
//             type: 'like',
//             read: false,
//             screamId: doc.id
//           });
//         }
//       })
//       .catch((err) => console.error(err));
//   });



exports.deleteNotificationOnUnlike = functions.firestore.document('likes/{id}')
.onDelete((snapshot) =>{
  return db.doc(`/notifications/${snapshot.id}`)
  .delete()
  .catch((err) =>{
    console.error(err);
    return;
  });
});

//creating notification on commenting
exports.createNotificationOnComment = functions.firestore.document('comments/{id}')
.onCreate((snapshot) =>{
  return db.doc(`/screams/${snapshot.data().screamId}`).get()
  .then(doc => {
    if(doc.exists && doc.data().userHandle !== snapshot.data().userHandle){
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
  .catch(err =>  {
    console.error(err);
    return;
  });
});

exports.onUserImageChange = functions.firestore.document('/users/{userId}')
.onUpdate((change) =>{
  console.log(change.before.data());
  console.log(change.before.data());
  if(change.before.data().imageUrl !== change.after.data().imageUrl){
    console.log('image has changed');
    let batch = db.batch();
  return db.collection('screams').where('userHandle', '==', change.before.data().handle).get()
  .then ((data) => {
    data.forEach(doc => {
      const scream = db.doc(`/screams/${doc.id}`);
      batch.update(scream, { onUserImage: change.after.data().imageUrl});
    })
    return batch.commit();
  });
  } else return true;
});

// child delete without scream delete
exports.onScreamDelete = functions.firestore.document('/screams/{screamId}').onDelete((snapshot, context) =>{
  const screamId = context.params.screamId;
  const batch = db.collection('comments').where('screamId', '==', screamId).get()
  .then((data) => {
    data.forEach((doc) => {
      batch.delete(db.doc(`/comments/${doc.id}`));
    });
    return db
    .collection('likes')
    .where('screamId', '==', screamId)
    .get();
  })
  .then((data) => {
    data.forEach((doc) => {
      batch.delete(db.doc(`/likes/${doc.id}`));
    })
    return db.collection('notifications').where('screamId', '==', screamId).get();
  })
  .then((data) => {
    data.forEach((doc) => {
      batch.delete(db.doc(`/notifications/${doc.id}`));
    })
    return batch.commit();
  })
  .catch((err) => 
    console.error(err));
});

exports.onScreamDelete = functions
  .firestore.document('/screams/{screamId}')
  .onDelete((snapshot, context) => {
    const screamId = context.params.screamId;
    const batch = db.batch();
    return db
      .collection('comments')
      .where('screamId', '==', screamId)
      .get()
      .then((data) => {
        data.forEach((doc) => {
          batch.delete(db.doc(`/comments/${doc.id}`));
        });
        return db
          .collection('likes')
          .where('screamId', '==', screamId)
          .get();
      })
      .then((data) => {
        data.forEach((doc) => {
          batch.delete(db.doc(`/likes/${doc.id}`));
        });
        return db
          .collection('notifications')
          .where('screamId', '==', screamId)
          .get();
      })
      .then((data) => {
        data.forEach((doc) => {
          batch.delete(db.doc(`/notifications/${doc.id}`));
        });
        return batch.commit();
      })
      .catch((err) => console.error(err));
  });