import React from 'react';
import BestOfFive from '../BestOfFive';
// import 'TourneyDecider.css';

const TourneyDecider = props => {
  switch(props.mode) {
    case "BestOfThree":
      return <p>best of three</p>
    case "BestOfFive":
      return <BestOfFive {...props} />
    default:
      return <p>no tourney</p>
  }
}

export default TourneyDecider;