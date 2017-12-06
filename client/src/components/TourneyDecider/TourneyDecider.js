import React from 'react';
import BestOfFive from '../BestOfFive';
// import 'TourneyDecider.css';

const TourneyDecider = props => {
  switch(props.mode) {
    case "BestOfThree":
      return <p>best of three</p>
    case "BestOfFive":
      return <BestOfFive player1="WTF" player2="ugh" />
    default:
      return <p>no tourney</p>
  }
}

export default TourneyDecider;