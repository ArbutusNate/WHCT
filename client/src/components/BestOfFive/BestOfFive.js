import React from 'react';
import TourneyPlayerName from '../TourneyPlayerName';
// import Background from './dark_dotted2.png';
import './BestOfFive.css';

const BestOfFive = props =>

  <div className="b5-background container">
    <div className="b5-header-frame">
      <h4 className="b5-header">{props.tName}</h4>
    </div>
    <div className="b5-main"  >
      <TourneyPlayerName player={props.player1} score={props.player1wins} faction={props.player1faction} />
      <TourneyPlayerName player={props.player2} score={props.player2wins} faction={props.player2faction} />
    </div>
  </div>

export default BestOfFive;