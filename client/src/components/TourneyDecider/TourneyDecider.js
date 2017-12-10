import React from 'react';
import BestOfFive from '../BestOfFive';
// import 'TourneyDecider.css';

const TourneyDecider = props => {
  switch(props.mode) {
    case "BestOfThree":
      return <BestOfFive {...props} bestOf={3} />
    case "BestOfFive":
      return <BestOfFive {...props} bestOf={5} />
    default:
      return <p>no tourney</p>
  }
}

export default TourneyDecider;