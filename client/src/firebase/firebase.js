//PRODUCTION FIREBASE

import * as firebase from 'firebase';

var config = {
  //API_KEY
  apiKey: process.env.API_KEY,
  //AUTH_DOMAIN
  authDomain: process.env.AUTH_DOMAIN,
  //DATABASE_URL
  databaseURL: process.env.DATABASE_URL,
  //PROJECT_ID
  projectId: process.env.PROJECT_ID,
  //STORAGE_BUCKET
  storageBucket: process.env.STORAGE_BUCKET,
  //SENDER_ID
  messagingSenderId: process.env.SENDER_ID
};

if(!firebase.apps.length) {
  firebase.initializeApp(config);
}

//export all Firebase endpoints as auth.
const auth =  firebase.auth();

export {
  auth,
}