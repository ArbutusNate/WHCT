import React, { Component } from 'react';
import Header from '../Header';
import TourneyZone from '../TourneyZone';
import RecordZone from '../RecordZone';
import './MainView.css';
import Background from './spiration_dark.png';
import LoginModal from '../LoginModal';
import {auth} from "../../firebase";
// import openSocket from 'socket.io-client';
// const socket = openSocket();

class MainView extends Component {

  componentWillMount() {
    this.setState({
      showModal: 'none',
      isLoggedIn: false
    })
  }

  showHideModal = (string) => {
    console.log('showing Modal');
    console.log(string)
    this.setState({
      showModal: string
    })
  }

  logOut = (e) => {
    e.preventDefault();
    this.setState({
      isLoggedIn: false
    })
    console.log('logged out')
  }

  render () {
   return (
    <div className="background" style={{backgroundImage: "url(" + Background + ")"}}>
      <Header
        logOut={this.logOut}
        isLoggedIn={this.props.isLoggedIn}
        showHideModal={this.showHideModal}
        handleViewChange={this.props.handleViewChange}
      />
      <div className="header-pad"></div>
      <div>
        {this.props.view === 'tournament' &&
          <TourneyZone isLoggedIn={this.props.isLoggedIn}/>
        }
        {this.props.view === 'records' &&
          <RecordZone />
        }
      </div>
      <LoginModal
        showModal={this.state.showModal}
        showHideModal={this.showHideModal}
        getLoggedIn={this.props.getLoggedIn}
      />
    </div>
   )
  }
}

export default MainView;