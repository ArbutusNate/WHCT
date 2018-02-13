import {auth} from './firebase';

// Sign Up
export const createAccountEmailPassword = (email, password) => auth.createUserAndRetrieveDataWithEmailAndPassword(email, password)
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode === 'auth/weak-password') {
      alert('The password is too weak.');
    } else {
      alert(errorMessage);
    }
    console.log(error);
  })
  .then(() => console.log('success!'));

//Sign In
export const signInEmailPassword = (email, password) =>
  auth.signInAndRetrieveDataWithEmailAndPassword(email, password)
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        console.log(errorMessage);
      }
    })

//Sign Out

export const signOut = () =>
  auth.signOut();

