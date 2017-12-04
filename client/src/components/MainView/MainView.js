import React, { Component } from 'react';
import Header from '../Header';
import Social from '../Social';
import './MainView.css';

class MainView extends Component {
  render () {
   return ( <div>
      <Header/>
      <Social/>
    </div>
   )
  }
}

export default MainView;