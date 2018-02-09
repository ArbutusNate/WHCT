import React, {Component} from 'react';
import './LoginModal.css';
import firebase from 'firebase';
import { auth } from "../../firebase";
// import firebaseui from 'firebaseui';
// var firebase = require('firebase');
// var firebaseui = require('firebaseui');

const initialState = {
  username: "",
  password1: "",
  password2: "",
  error: null,
  isInvalid: false,
  signInType: ""
}

class LoginModal extends Component {
  constructor(props){
    super(props)
    this.state = {...initialState}
  }

  handleFormChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  // createUser = (email, pw) => {
  //   console.log('now doing what we actually want to do');
  //   firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, pw)
  //   .catch((error) => {
  //     debugger;
  //     console.log(error.message);
  //     return;
  //   })
  // }

  // dumbFunction = (e) => {
  //   e.preventDefault;
  //   debugger;
  //   console.log('doing this stupid unnessecary shit first');
  //   this.createUser(this.state.createName, this.state.createPw)
  // }

  signIn = (e) => {
    e.preventDefault();
    // console.log(e.target);
    auth.signInEmailPassword(this.state.username, this.state.password1);
    this.setState({
      ...initialState
    })
    this.props.showHideModal('none');
  }

  signUp = (e) => {
    e.preventDefault();
    auth.createAccountEmailPassword(this.state.username, this.state.password1)
      .catch(error => console.log(error))
    this.setState({
      ...initialState
    })
    this.props.showHideModal('none');
  }


  render () {

    const isInvalid =
      this.state.password1 !== this.state.password2 ||
      this.state.password1 === '' ||
      this.state.username === '';

    return (
      <div className="modal" style={{display: this.props.showModal}}>
        <div>
          Log In <span className="close-button" onClick={() => this.props.showHideModal('none')}> Close </span>
        </div>
        <form onSubmit={this.authSubmit}>
          <input
            placeholder="Email"
            name="username"
            type="text"
            value={this.state.username}
            onChange={this.handleFormChange}
          />
          <input
            placeholder="Enter Password"
            name="password1"
            type="password"
            value={this.state.password1}
            onChange={this.handleFormChange}
          />
          <input
            placeholder="Confirm Password"
            name="password2"
            type="password"
            value={this.state.password2}
            onChange={this.handleFormChange}
          />
          <button disabled={isInvalid} onClick={this.signIn}>Sign In</button>
          <button disabled={isInvalid} onClick={this.signUp}>Sign Up</button>
        </form>
      </div>
     )
  }

}

export default LoginModal;