import React, {Component} from 'react';
import Axios from 'axios';
import TourneyDecider from '../TourneyDecider';
import BestOfFiveOptions from '../BestOfFiveOptions';
import NewPlayerForm from '../NewPlayerForm';
import './TourneyZone.css';
import openSocket from 'socket.io-client';
const socket = openSocket(
  process.env.PORT || `http://localhost:3001`
  );

class TourneyZone extends Component {
  constructor(props) {
    super(props)
    // var socket = this.props.socket;
    this.state = {
      isLive: false,
      mode: "nope",
      player1: "Choose Player 1",
      player2: "Choose Player 2",
      player1wins: 0,
      player2wins: 0,
      player1faction: 'default',
      player2faction: 'default',
      tName: 'unnamed',
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
    console.log(`Adding 1 win to ${e.target.name}`)
    this.setState({
      [e.target.name]: this.state[e.target.name] + 1,
      player1faction: 'default',
      player2faction: 'default'
    })
    // socket.emit
  }

  Tournament = (name, type, p1, p1Faction, p1Score, p2, p2Faction, p2Score, link) => {
    return {
      name,
      type,
      p1,
      p1Faction,
      p1Score,
      p2,
      p2Faction,
      p2Score
    }
  }

  socketGoLive = (e) => {
    e.preventDefault();
    // (name, type, p1, p1Faction, p1Score, p2, p2Faction, p2Score)
    this.setState({
      isLive: true
    })
    let liveTourney = this.Tournament(this.state.tName, this.state.mode, this.state.player1, `p1 faction`, this.state.player1wins, this.state.player2, `p2 faction`, this.state.player2wins, 'youtube link');
    // console.log(liveTourney);
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
      let ytLink = e.target.newplayeryt.value;
      Axios.post(`http://localhost:3001/admin/newplayer/${playerName}/${ytLink}`)
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        })
    }
    else if(this.state.mode === "BestOfThree" || "BestOfFive") {
      console.log("saving tournament results");
      // let tourneyInfo = {};
      Axios.post(`http://localhost:3001/admin/save/tournaments/${this.state.tName}/${this.state.mode}/${this.state.player1}/${this.state.player2}/${this.state.link}`
        // ,
        // {params: {
        //   name: this.state.tName,
        //   type: this.state.mode,
        //   p1: this.state.player1,
        //   p2: this.state.player2,
        //   link: this.state.link
        //   // p1S: this.state.player1wins,
        //   // p2S: this.state.player2wins,
        //   // p1Faction: this.state.player1faction,
        //   // p2Faction: this.state.player2faction
        // }}
      )
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      })
    }
  }

  // componentDidMount = () => {
  //   this.setState({
  //     player1: "Choose Player 1",
  //     player2: "Choose Player 2",
  //     player1wins: 0,
  //     player2wins: 0
  //   })
  // }

  render() {
    return (
      <div className="tourney-zone">
        <h2 className="admin-controls"> Tournament Admin Controls </h2>
        <form className="form-control" onSubmit={this.handleFormSubmit}>
          <select name="mode" className="mode-select"onChange={this.handleModeChange}>
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
            />
          }
        </form>
        <TourneyDecider
          mode={this.state.mode}
          player1={this.state.player1}
          player2={this.state.player2}
          player1wins={this.state.player1wins}
          player2wins={this.state.player2wins}
        />
      </div>
    )
  }
}

export default TourneyZone;