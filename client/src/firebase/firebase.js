
import * as firebase from 'firebase';

var config = {
  //API_KEY
  apiKey: "AIzaSyALPY4qVzrFZPqv9hYKPF8SqziPsrRECsM",
  //AUTH_DOMAIN
  authDomain: "wildhawgstournam-1517688075718.firebaseapp.com",
  //DATABASE_URL
  databaseURL: "https://wildhawgstournam-1517688075718.firebaseio.com",
  //PROJECT_ID
  projectId: "wildhawgstournam-1517688075718",
  //STORAGE_BUCKET
  storageBucket: "wildhawgstournam-1517688075718.appspot.com",
  //SENDER_ID
  messagingSenderId: "759309936970"
};

if(!firebase.apps.length) {
  firebase.initializeApp(config);
}

//export all Firebase endpoints as auth.
const auth =  firebase.auth();

export {
  auth,
}