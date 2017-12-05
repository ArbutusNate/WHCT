import React, {Component} from 'react';
import TourneyDecider from '../TourneyDecider';
import './TourneyZone.css';

class TourneyZone extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mode: "nope"
    }
  }

  handleChange = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    this.setState({
      mode: e.target.value
    })
  }

  updateTourney = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    console.log("we did it");
  }

  componentDidMount(){
    this.setState({
      mode: "nope"
    })
  }


  render() {
    return (
      <div className="tourney-zone">
        <form>
          <select name="type-select" onChange={this.handleChange}>
            <option value="nope"> Select Tournament Type </option>
            <option value="BestOfThree"> Best of Three </option>
            <option value="BestOfFive"> Best of Five </option>
            <option value="Bracket"> Bracket </option>
          </select>
          {this.state.mode === "BestOfFive" &&
          <div>
            <select name="player1">
              <option value="Turin"> Turin </option>
              <option value="JonTaun"> JonTaun </option>
            </select>
            <select>
              <option value="Loremaster of Sotek"> Loremaster of Sotek </option>
              <option value="ItalianSpartacus"> ItalianSpartacus </option>
            </select>
          </div>
          }
          <input type="submit" />
        </form>
        <TourneyDecider mode={this.state.mode}/>
      </div>
    )
  }
}

export default TourneyZone;