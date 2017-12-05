import React, { Component } from 'react';
import Header from '../Header';
import Social from '../Social';
import TournamentView from '../TournamentView';
import './MainView.css';

class MainView extends Component {
  render () {
   return (
    <div className="background">
      <Header />
      <Social />
      <TournamentView />
    </div>
   )
  }
}

export default MainView;