import React, {Component} from 'react';
import Axios from 'axios';
import TourneyDecider from '../TourneyDecider';
import BestOfFiveOptions from '../BestOfFiveOptions';
import NewPlayerForm from '../NewPlayerForm';
import './AdminControl.css';
import openSocket from 'socket.io-client';
const socket = openSocket(
  // process.env.PORT || `http://localhost:3001`
  );

class AdminControl extends Component {
  constructor(props) {
    super(props)
    // var socket = this.props.socket;
    this.state = {
      mode: 'nope',
      isLive: false,
      player1: "Choose Player 1",
      player2: "Choose Player 2",
      player1wins: 0,
      player2wins: 0,
      player1faction: '',
      player2faction: '',
      tName: 'New Tournament',
      link: 'gotta add this'
    }
  }

  handleModeChange = (e) => {
    e.preventDefault();
    console.log(e.target.name);
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  updateScore = (e) => {
    e.preventDefault();
    let gameNumber = this.state.player1wins + this.state.player2wins + 1;
    console.log(`Adding 1 win to ${e.target.name}`);
    let winner = e.target.name;
    let tId = this.state.currentTourneyId;
    // Outgoing Params: tName, gameNumber, player1, player1faction, player2, player2faction, winner, loser.
    Axios.post(`/admin/savegame/${tId}/${this.state.tName}/${gameNumber}/${this.state.player1}/${this.state.player1faction}/${this.state.player2}/${this.state.player2faction}/${winner}`)
      .then(res => {
        console.log(res);
      })
    this.setState({
      [e.target.name]: this.state[e.target.name] + 1,
      player1faction: '',
      player2faction: ''
    })
    // socket.emit
  }

  Tournament = (name, type, p1, p1Faction, p1Score, p2, p2Faction, p2Score, link, isLive) => {
    return {
      name,
      type,
      p1,
      p1Faction,
      p1Score,
      p2,
      p2Faction,
      p2Score,
      link,
      isLive
    }
  }

  socketGoLive = (e) => {
    this.handleFormSubmit(e);
    e.preventDefault();
    // (name, type, p1, p1Faction, p1Score, p2, p2Faction, p2Score, isLive)
    this.setState({
      isLive: true
    })
    let liveTourney = this.Tournament(this.state.tName, this.state.mode, this.state.player1, this.state.player1faction, this.state.player1wins, this.state.player2, this.state.player2faction, this.state.player2wins, 'youtube link',this.state.isLive);
    console.log("saving tournament results");
    Axios.post(`/admin/save/tournaments/${this.state.tName}/${this.state.mode}/${this.state.player1}/${this.state.player2}/${this.state.link}/${true}`)
    .then(res => {
      console.log(res);
      this.setState({
        currentTourneyId: res.data._id
      })
    })
    .catch(error => {
      console.log(error);
    })
    socket.emit('live', liveTourney);
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
      let playerName = e.target.newplayername.value;
      let ytLink = encodeURIComponent(e.target.newplayeryt.value);
      Axios.post(`/admin/newplayer/${playerName}/${ytLink}`)
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        })
    }
    else if(this.state.mode === "BestOfThree" || "BestOfFive") {
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

  componentDidMount() {
    Axios.get(`/admin/getcompetitors`)
    .then((res) => {
      this.setState({
        'playerList': res.data
      })
    })
  }

  // switchAdminOptions = (e) => {
  //   e.preventDefault();
  //   this.setState({
  //     'controlType': e.target.value
  //   })
  // }


  render () {
    return (
      <div>
        <h2 className="admin-controls"> Tournament Admin Controls </h2>
        <form className="form-control" onSubmit={this.handleFormSubmit}>
          <select name="mode" className="mode-select" onChange={this.handleModeChange}>
            <option value="nope"> Add New Player </option>
            <option value="BestOfThree"> Best of Three </option>
            <option value="BestOfFive"> Best of Five </option>
            <option value="Bracket"> Bracket </option>
          </select>
          {this.state.mode === "nope" &&
            <NewPlayerForm addNewPlayer={this.addNewPlayer}/>
          }
          {this.state.mode === "BestOfFive" &&
            <BestOfFiveOptions
              handleLiveTournament={this.handleLiveTournament}
              tourneyState={this.state.live}
              handleChange={this.handleModeChange}
              updateScore={this.updateScore}
              resetTourney={this.resetTourney}
              socketGoLive={this.socketGoLive}
              isLive={this.state.isLive}
              player1={this.state.player1}
              player2={this.state.player2}
              player1faction={this.state.player1faction}
              player2faction={this.state.player2faction}
              playerList={this.state.playerList}
            />
          }
          {this.state.mode === "BestOfThree" &&
            <BestOfFiveOptions
              handleLiveTournament={this.handleLiveTournament}
              tourneyState={this.state.live}
              handleChange={this.handleModeChange}
              updateScore={this.updateScore}
              resetTourney={this.resetTourney}
              socketGoLive={this.socketGoLive}
              isLive={this.state.isLive}
              player1={this.state.player1}
              player2={this.state.player2}
              player1faction={this.state.player1faction}
              player2faction={this.state.player2faction}
              playerList={this.state.playerList}
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