import React from 'react';
import './LoginModal.css';
var firebase = require('firebase');
var firebaseui = require('firebaseui');

const LoginModal = props =>

  <div className="modal" style={{display: props.showModal}}>
    <div>
      Log In
    </div>
    <form>
      <input type="text" />
      <input type="text" />
      <submit />
    </form>
  </div>


export default LoginModal;