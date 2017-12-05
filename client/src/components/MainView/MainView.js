import React, { Component } from 'react';
import Header from '../Header';
import Social from '../Social';
import BestOfFive from '../BestOfFive';
import './MainView.css';

class MainView extends Component {
  render () {
   return (
    <div className="background">
      <Header />
      <Social />
      <BestOfFive />
    </div>
   )
  }
}

export default MainView;