import React from 'react';
import BestOfFive from '../BestOfFive';
// import 'TourneyDecider.css';

const TourneyDecider = props => {
  switch(props.mode) {
    case "BestOf":
      return <BestOfFive {...props} bestOf={3} />
    case "BestOfFive":
      return <BestOfFive {...props} bestOf={5} />
    default:
      return null;
  }
}

export default TourneyDecider;