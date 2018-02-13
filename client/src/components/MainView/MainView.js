import React, { Component } from 'react';
import Header from '../Header';
import TourneyZone from '../TourneyZone';
import RecordZone from '../RecordZone';
import './MainView.css';
import Background from './spiration_dark.png';
import LoginModal from '../LoginModal';
// import {auth} from "../../firebase";


class MainView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: 'none',
      isLoggedIn: false
    };
  }

  showHideModal = (string) => {
    console.log('showing Modal');
    console.log(string)
    this.setState({
      showModal: string
    });
  }

  getLoggedIn = () => {
    this.setState({
      isLoggedIn: true
    });
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