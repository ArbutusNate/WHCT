import React, {Component} from 'react';
import Axios from 'axios';
import TourneyDecider from '../TourneyDecider';
import BestOfFiveOptions from '../BestOfFiveOptions';
import NewPlayerForm from '../NewPlayerForm';
import './TourneyZone.css';

class TourneyZone extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mode: "nope",
      player1: "Choose Player 1",
      player2: "Choose Player 2"
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
      [e.target.name]: this.state[e.target.name] + 1
    })
  }

  updateTitle = (e) => {
    e.preventDefault();
    // this.setState({
      tourneyTitle: e.target.value
    // })
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
    // let config = {
    //   baseURL: 'http://localhost:3001/'
    // }
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
      Axios.post(`http://localhost:3001/admin/saverecord`,
        {params: {
          title: this.state.tourneyTitle,
          type: this.state.mode
        }}
      )
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        })
    }
  }

  componentDidMount = () => {
    this.setState({
      player1: "Choose Player 1",
      player2: "Choose Player 2",
      player1wins: 0,
      player2wins: 0
    })
  }

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
              handleChange={this.handleModeChange}
              updateScore={this.updateScore}
              resetTourney={this.resetTourney}
              updateTitle={this.updateTitle}
            />
          }
          {this.state.mode === "BestOfThree" &&
            <BestOfFiveOptions
              handleChange={this.handleModeChange}
              updateScore={this.updateScore}
              resetTourney={this.resetTourney}
              updateTitle={this.updateTitle}
            />
          }
          <input className="admin-submit" type="submit" />
        </form>
        <TourneyDecider {...this.state} />
      </div>
    )
  }
}

export default TourneyZone;