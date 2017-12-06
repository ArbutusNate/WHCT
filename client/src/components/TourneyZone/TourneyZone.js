import React, {Component} from 'react';
import TourneyDecider from '../TourneyDecider';
import BestOfFiveOptions from '../BestOfFiveOptions';
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

  updateTourney = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    console.log("we did it");
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
        <form>
          <select name="mode" onChange={this.handleModeChange}>
            <option value="nope"> Select Tournament Type </option>
            <option value="BestOfThree"> Best of Three </option>
            <option value="BestOfFive"> Best of Five </option>
            <option value="Bracket"> Bracket </option>
          </select>
          {this.state.mode === "BestOfFive" &&
            <BestOfFiveOptions handleChange={this.handleModeChange} updateScore={this.updateScore}/>
          }
        </form>
        <TourneyDecider {...this.state} />
      </div>
    )
  }
}

export default TourneyZone;