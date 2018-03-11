// Dependencies
import React, {Component} from 'react';
import Axios from 'axios';
import openSocket from 'socket.io-client';
// Components
import TourneyDecider from '../TourneyDecider';
import BestOfFiveOptions from '../BestOfFiveOptions';
import NewPlayerForm from '../NewPlayerForm';
// Utility
import './AdminControl.css';
// import adminFunctions from './AdminFunctions.js';
const socket = openSocket();

let initialState = {
  newPlayer: '',
  newPlayerLink: '',
  mode: 'nope',
  isLive: false,
  player1: "Choose Player 1",
  player2: "Choose Player 2",
  player1wins: 0,
  player2wins: 0,
  player1faction: '',
  player2faction: '',
  tName: 'New Tournament',
  link: '',
  disableButtons: true
}



class AdminControl extends Component {
  constructor(props) {
    super(props)
    // var socket = this.props.socket;
    this.state = {
      ...initialState
    }
  }

updateFaction = (e) => {
  e.preventDefault();
  this.handleModeChange(e);
  console.log('Updating faction...');
  Axios.post(`/admin/updatefaction/${this.state.liveTId}/${e.target.value}/${e.target.name}`)
    .then((response) => {
      console.log("Done updating faction.");
      socket.emit('live', this.state.currentTourneyId);
    })
    .catch((error) => {
      console.log(error);
    })
}

updateScore = (e) => {
  e.preventDefault();
  console.log(e.target);
  let eventName = e.target.name;
  console.log(`Adding 1 win to ${e.target.attributes.pstring.value}`);
  let gameNumber = this.state.player1wins + this.state.player2wins + 1;
  let winner = e.target.attributes.pstring.value;
  let loser;
  let tId = this.state.currentTourneyId;
  // Outgoing Params: tName, gameNumber, player1, player1faction, player2, player2faction, winner, loser.
  let route = `/admin/savegame/${tId}/${this.state.tName}/${gameNumber}/${this.state.player1}/${this.state.player1faction}/${this.state.player2}/${this.state.player2faction}/${winner}`;
  // Save the game for records
  Axios.post(route)
    .then(res => {
      console.log(`Updating player...`);
      if(winner === "player1"){
        loser = this.state.player2;
      } else {
        loser = this.state.player1;
      }
      let route = `/admin/updateplayer/${this.state[winner]}/${loser}/g`;
      console.log(route);
      // Modifies both player docs win/losses to reflect game
      Axios.post(route)
        .then((response) => {
          this.setState({
            [eventName]: this.state[eventName] + 1,
            player1faction: '',
            player2faction: '',
            disableButtons: true
          })
          socket.emit('live', this.state.currentTourneyId);
          return console.log(`Done updating player.`);
        })
        .catch((error) => {
          return console.log(error);
        })
    })
}

endSaveTournament = (e) => {
  e.preventDefault();
  let winner;
  let loser;
  if(this.state.player1wins > this.state.player2wins){
    winner = this.state.player1
    loser = this.state.player2
  } else {
    winner = this.state.player2
    loser = this.state.player1
  }
  console.log('Saving tournament and removing it from live...');
  Axios.post(`/admin/endtournament/${this.state.currentTourneyId}/${this.state.liveTId}/${winner}/${loser}`)
    .then(response => {
      console.log(`Tournament offline and saved.`);
      console.log(`Updating player docs...`)
      Axios.post(`/admin/updateplayer/${winner}/${loser}/t`)
        .then(response => {
          this.setState({
            ...initialState
          })
          console.log(response.data);
          socket.emit('live', this.state.currentTourneyId);
          console.log(`Player docs updated.`)
        })
    })
}

socketGoLive = (e) => {
  this.handleFormSubmit(e);
  e.preventDefault();
  // (name, type, p1, p1Faction, p1Score, p2, p2Faction, p2Score, tlink, isLive)
  if(this.state.player1 === 'Choose Player 1' || this.state.player2 === 'Choose Player 2') {
    console.log('Choose both players');
  } else {
    this.setState({
      isLive: true
    })
    console.log("Going Live");
    Axios.post(`/admin/save/tournaments/${this.state.tName}/${this.state.mode}/${this.state.player1}/${this.state.player2}/${this.state.tLink}/${true}`)
    .then(res => {
      this.setState({
        currentTourneyId: res.data._id,
        liveTId: res.data.currentInfo
      })
      socket.emit('live', this.state.currentTourneyId);
    })
    .catch(error => {
      console.log(error);
    })
  }
}

resetTourney = (e) => {
  e.preventDefault();
  this.setState({
    player1: "Choose Player 1",
    player2: "Choose Player 2",
    player1wins: 0,
    player2wins: 0
  })
}

handleFormSubmit = (e) => {
  e.preventDefault();
  if(this.state.mode === "nope") {
    console.log("saving new player");
    let playerName = e.target.newPlayer.value;
    let ytLink = encodeURIComponent(e.target.newPlayerLink.value);
    Axios.post(`/admin/newplayer/${playerName}/${ytLink}`)
      .then(res => {
        console.log(res);
        this.setState({
          newPlayer: '',
          newPlayerLink: ''
        })
      })
      .catch(error => {
        console.log(error);
      })
  }
  else if(this.state.mode === "BestOf" || "BestOfFive") {
    // console.log("saving tournament results");
    // // let tourneyInfo = {};
    // Axios.post(`/admin/save/tournaments/${this.state.tName}/${this.state.mode}/${this.state.player1}/${this.state.player2}/${this.state.link}/${this.state.status}`)
    // .then(res => {
    //   console.log(res);
    //   this.setState({
    //     currentTourneyId: res.data._id
    //   })
    // })
    // .catch(error => {
    //   console.log(error);
    // })
  }
}

handleModeChange = (e) => {
  e.preventDefault();
  console.log(e.target.name);
  this.setState({
    [e.target.name]: e.target.value
  }, () => {
    if((this.state.player1faction !== "") && (this.state.player2faction !== "")) {
      this.setState({
        disableButtons: false
      });
    }
  });
}

componentDidMount() {
  Axios.get(`/admin/getcompetitors`)
  .then((res) => {
    this.setState({
      'playerList': res.data
    })
  })
}

  render () {
    return (
      <div className="control-panel">
        <div>
          <h2 className="admin-control-header"> Host Controls </h2>
          <select name="mode" className="mode-select" onChange={this.handleModeChange}>
            <option value="nope"> Add New Player </option>
            <option value="BestOf"> Best of </option>
          </select>
        </div>
        <form className="form-control" onSubmit={this.handleFormSubmit}>
            {this.state.mode === "nope" &&
              <NewPlayerForm
                addNewPlayer={this.addNewPlayer}
                newPlayer={this.state.newPlayer}
                newPlayerLink={this.state.newPlayerLink}
                handleChange={this.handleModeChange}
              />
            }
            {this.state.mode === "BestOf" &&
              <BestOfFiveOptions
                handleLiveTournament={this.handleLiveTournament}
                tourneyState={this.state.live}
                handleChange={this.handleModeChange}
                updateFaction={this.updateFaction}
                updateScore={this.updateScore}
                endSaveTournament={this.endSaveTournament}
                tname={this.state.tname}
                resetTourney={this.resetTourney}
                socketGoLive={this.socketGoLive}
                isLive={this.state.isLive}
                player1={this.state.player1}
                player2={this.state.player2}
                player1faction={this.state.player1faction}
                player2faction={this.state.player2faction}
                playerList={this.state.playerList}
                disableButtons={this.state.disableButtons}
              />
            }
        </form>

        <TourneyDecider
          mode={this.state.mode}
          player1={this.state.player1}
          player2={this.state.player2}
          player1wins={this.state.player1wins}
          player2wins={this.state.player2wins}
          player1faction={this.state.player1faction}
          player2faction={this.state.player2faction}
          tName={this.state.tName}
        />

      </div>

    )

  }

}

export default AdminControl;