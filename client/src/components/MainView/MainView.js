import React, { Component } from 'react';
import Header from '../Header';
import TourneyZone from '../TourneyZone';
import RecordZone from '../RecordZone';
import './MainView.css';
import Background from './spiration_dark.png'
import openSocket from 'socket.io-client';
const socket = openSocket();

class MainView extends Component {

  componentDidMount() {
    console.log(`attempting to connect to 'live' socket`)
    // socket.on('live', response => {
    //   console.log('change from server');
    //   console.log(response);
    // })
  }

  render () {
   return (
    <div className="background" style={{backgroundImage: "url(" + Background + ")"}}>
      <Header handleViewChange={this.props.handleViewChange}/>
      <div className="header-pad"></div>
      <div>
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