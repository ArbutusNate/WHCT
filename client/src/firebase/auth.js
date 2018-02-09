import {auth} from './firebase';

// Sign Up
export const createAccountEmailPassword = (email, password) => auth.createUserAndRetrieveDataWithEmailAndPassword(email, password);

//Sign In
export const signInEmailPassword = (email, password) =>
  auth.signInAndRetrieveDataWithEmailAndPassword(email, password);

//Sign Out

export const signOut = () =>
  auth.signOut();

