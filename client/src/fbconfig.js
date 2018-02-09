import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyALPY4qVzrFZPqv9hYKPF8SqziPsrRECsM",
  authDomain: "wildhawgstournam-1517688075718.firebaseapp.com",
  databaseURL: "https://wildhawgstournam-1517688075718.firebaseio.com",
  projectId: "wildhawgstournam-1517688075718",
  storageBucket: "wildhawgstournam-1517688075718.appspot.com",
  messagingSenderId: "759309936970"
};

if(!firebase.apps.length) {
  firebase.initializeApp(config);
}
