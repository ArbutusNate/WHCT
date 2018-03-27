import React, { Component } from 'react';
import Header from '../Header';
import Axios from 'axios';
import TourneyZone from '../TourneyZone';
import RecordZone from '../RecordZone';
import './MainView.css';
import Background from './spiration_dark.png';
import LoginModal from '../LoginModal';
import {auth} from "../../firebase";


class MainView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: 'none',
      isLoggedIn: false
    };
  }

  showHideModal = (string, type) => {
    this.setState({
      showModal: string,
      modalType: type
    });
  }

  getLoggedIn = (boolean, uid) => {
    Axios.get(`/admin/recon/${this.state.uid}`)
      .then((res) => {
        console.log(res.data[0]);
        if(res.data[0] !== undefined) {
          let object = res.data[0];
          var data = {
            player1: object.player1,
            player2: object.player2,
            currentTourneyId: object._id
          };
        }
        this.setState({
          isLoggedIn: boolean,
          uid: uid,
          reconnectData: data
        });
      }
    )
    console.log(`logged in: ${boolean}`);
  }

  logOut = (e) => {
    // e.preventDefault();
    auth.signOut();
    this.getLoggedIn(false);
  }

  render () {
   return (
    <div className="background" style={{backgroundImage: "url(" + Background + ")"}}>
      <Header
        logOut={this.logOut}
        isLoggedIn={this.state.isLoggedIn}
        showHideModal={this.showHideModal}
        handleViewChange={this.props.handleViewChange}
        // getLoggedIn={this.getLoggedIn}
      />
      <div className="header-pad"></div>
      <div>
        {this.props.view === 'tournament' &&
          <TourneyZone uid={this.state.uid} isLoggedIn={this.state.isLoggedIn}/>
        }
        {this.props.view === 'records' &&
          <RecordZone />
        }
      </div>
      <LoginModal
        showModal={this.state.showModal}
        showHideModal={this.showHideModal}
        getLoggedIn={this.getLoggedIn}
        modalType={this.state.modalType}
      />
    </div>
   )
  }
}

export default MainView;