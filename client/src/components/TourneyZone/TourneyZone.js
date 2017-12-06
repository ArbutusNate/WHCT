import React, {Component} from 'react';
import TourneyDecider from '../TourneyDecider';
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

  updateTourney = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    console.log("we did it");
  }

  componentDidMount = () => {
    this.setState({
      player1: "Choose Player 1",
      player2: "Choose Player 2"
    })
  }

  render() {
    return (
      <div className="tourney-zone">
        <form>
          <select name="mode" onChange={this.handleModeChange}>
            <option value="nope"> Select Tournament Type </option>
            <option value="BestOfThree"> Best of Three </option>
            <option value="BestOfFive"> Best of Five </option>
            <option value="Bracket"> Bracket </option>
          </select>
          {this.state.mode === "BestOfFive" &&
          <div>
            <select name="player1" onChange={this.handleModeChange}>
              <option value="default"> Choose Player 1 </option>
              <option value="Turin"> Turin </option>
              <option value="JonTaun"> JonTaun </option>
            </select>
            <select name="player2" onChange={this.handleModeChange}>
              <option value="default"> Choose Player 2 </option>
              <option value="Loremaster of Sotek"> Loremaster of Sotek </option>
              <option value="ItalianSpartacus"> ItalianSpartacus </option>
            </select>
          </div>
          }
        </form>
        <TourneyDecider mode={this.state.mode} player1={this.state.player1} player2 = "k"/>
      </div>
    )
  }
}

export default TourneyZone;