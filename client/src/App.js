import React, { Component } from 'react';
import { BrowserRouter }  from 'react-router-dom';
import MainView from './components/MainView';
// import Header from './components/Header';
// import logo from './logo.svg';
// import './App.css';

class App extends Component {
  state = {
    userStatus: ''
  }

  render() {
    return (
      <BrowserRouter>
        <MainView />
      </BrowserRouter>
    );
  }
}

export default App;
