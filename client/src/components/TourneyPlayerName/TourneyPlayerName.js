import React from "react";
import './TourneyPlayerName.css'

const TourneyPlayerName = (props) => {

  return (
  <div className="b5-p1 b5-player">
    <img src="images/turin_brand.jpg" alt="Turin's Youtube Brand" className="player-thumbnail"/>
    <h3 className="player-name">{props.player}</h3>
    <br/>
    <h4>{props.faction}</h4>
    <p className="b5-score">{props.score}</p>
  </div>
  )
}

export default TourneyPlayerName;