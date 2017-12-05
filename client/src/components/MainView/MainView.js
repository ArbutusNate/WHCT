import React, { Component } from 'react';
import Header from '../Header';
import Social from '../Social';
import TourneyZone from '../TourneyZone';
import './MainView.css';

class MainView extends Component {
  render () {
   return (
    <div className="background">
      <Header />
      <div className="header-pad"></div>
      <div>
        <Social />
        <TourneyZone />
      </div>
    </div>
   )
  }
}

export default MainView;