import React, {Component} from 'react';
import './LoginModal.css';
import firebase from 'firebase';


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

  signIn = (e) => {
    firebase.auth().signInAndRetrieveDataWithEmailAndPassword(this.state.username, this.state.password1)
      .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        return alert(errorMessage);
      }
       return console.log(error);
      })
      .then(() => {
        firebase.auth().onAuthStateChanged((user) => {
          if(firebase.auth().currentUser) {
            console.log(user);
            this.setState({
              ...initialState
            })
            this.props.getLoggedIn(true, user.uid);
            this.props.showHideModal('none');
          } else {
            return console.log("Error Logging In");
          }
        })
      })
  }

  signUp = (e) => {
    firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(this.state.username, this.state.password1)
      .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        return alert(errorMessage);
      }
       return console.log(error);
      })
      .then(() => {
        firebase.auth().onAuthStateChanged((user) => {
          if(user) {
            this.setState({
              ...initialState
            })
            this.props.getLoggedIn(true, user.uid);
            this.props.showHideModal('none');
          } else {
            return console.log("Error Logging In");
          }
        })
      })
  }

  auth = (e) => {
    e.preventDefault();
    if (this.props.modalType === "Log In") {
      console.log("Attempting Sign In");
      this.signIn();
    } else {
      console.log("Attempting Sign Up");
      this.signUp();
    }
  }

  render () {

    const isInvalid =
      (this.state.password1 !== this.state.password2 && this.props.modalType === "Sign Up") ||
      this.state.password1 === '' ||
      this.state.username === '';

    return (
      <div className="my-modal" style={{display: this.props.showModal}}>
        <div>
          {this.props.modalType}
          <span className="close-button" onClick={() => this.props.showHideModal('none')}> Close </span>
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
          {this.props.modalType === "Sign Up" &&
            <input
              placeholder="Confirm Password"
              name="password2"
              type="password"
              value={this.state.password2}
              onChange={this.handleFormChange}
            />
          }
          <button disabled={isInvalid} onClick={this.auth}>{this.props.modalType}</button>

        </form>
      </div>
     )
  }

}

export default LoginModal;