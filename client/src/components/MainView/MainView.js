import React, { Component } from 'react';
import Header from '../Header';
import Social from '../Social';
import TourneyZone from '../TourneyZone';
import RecordZone from '../RecordZone';
import './MainView.css';
import openSocket from 'socket.io-client';
const socket = openSocket(process.env.PORT || `http://localhost:3001`);

class MainView extends Component {

  componentDidMount() {
    // socket.on('live', response => {
    //   console.log('connected from MainView');
    // })
  }

  render () {
   return (
    <div className="background">
      <Header handleViewChange={this.props.handleViewChange}/>
      <div className="header-pad"></div>
      <div>
        <Social />
        {this.props.view === 'tournament' &&
          <TourneyZone />
        }
        {this.props.view === 'records' &&
          <RecordZone />
        }
      </div>
    </div>
   )
  }
}

export default MainView;