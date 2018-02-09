import React, { Component } from 'react';
import { BrowserRouter }  from 'react-router-dom';
import MainView from './components/MainView';
// import firebase from 'firebase';
// import Axios from 'axios';
// import Header from './components/Header';
// import logo from './logo.svg';
// import './App.css';

class App extends Component {
  state = {
    userStatus: '',
    view: 'tournament'
  }

  handleViewChange = (e) => {
    console.log(e.target);
    this.setState({
      view: e.target.attributes.view.value
    })
  }

  // FirebaseUI config.

  render() {
    return (
      <BrowserRouter>
        <MainView
          {...this.state}
          handleViewChange={this.handleViewChange}
        />
      </BrowserRouter>
    );
  }
}

export default App;
