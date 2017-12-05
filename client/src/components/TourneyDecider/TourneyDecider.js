import React from 'react';
import BestOfFive from '../BestOfFive';
// import 'TourneyDecider.css';

const TourneyDecider = props => {
  switch(props.mode) {
    case "nope":
      return <p>no tournaments</p>
      break;
    case "BestOfThree":
      return <p>best of three</p>
      break;
    case "BestOfFive":
      return <BestOfFive/>
    default:
      return <p>no tourney</p>
  }
}

export default TourneyDecider;