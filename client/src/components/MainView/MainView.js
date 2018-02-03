import React, { Component } from 'react';
import Header from '../Header';
import TourneyZone from '../TourneyZone';
import RecordZone from '../RecordZone';
import './MainView.css';
import Background from './spiration_dark.png';
import LoginModal from '../LoginModal'
// import openSocket from 'socket.io-client';
// const socket = openSocket();

class MainView extends Component {

  componentWillMount() {
    this.setState({
      showModal: 'none'
    })
  }

  showHideModal = (string) => {
    console.log('showing Modal');
    console.log(string)
    this.setState({
      showModal: string
    })
  }

  render () {
   return (
    <div className="background" style={{backgroundImage: "url(" + Background + ")"}}>
      <Header showHideModal={this.showHideModal}handleViewChange={this.props.handleViewChange}/>
      <div className="header-pad"></div>
      <div>
        {this.props.view === 'tournament' &&
          <TourneyZone />
        }
        {this.props.view === 'records' &&
          <RecordZone />
        }
      </div>
      <LoginModal
        showModal={this.state.showModal}
      />
    </div>
   )
  }
}

export default MainView;