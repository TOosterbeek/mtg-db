// const functions = require("firebase-functions");
// const admin = require('firebase-admin');

// admin.initializeApp();
// const db = admin.firestore();

// exports.createUser = functions.auth
//     .user()
//     .onCreate(async (user) => {
//         /**
//          * Cherry pick user data to only send
//          * what we actually need to the client.
//          */
//         const newUser = {
//             uid: user.uid,
//         }

//         db.collection('users').doc(user.uid).set(newUser)
//     });

// /**
// * Delete user in Firestore on user account deletion through Firebase Auth.
// */
// export const deleteUserDocument = functions.auth
//     .user()
//     .onDelete(async (user) => {
//         db.collection('users').doc(user.uid).delete()
//     })