import React from 'react';
import './BestOfFive.css';

const BestOfFive = props =>

  <div className="b5-background">
    <div className="b5-header">
      <h2>Best 3 of 5 Tournament</h2>
    </div>
    <div className="b5-main">
      <div className="b5-p1 b5-player">
        <img src="images/turin_brand.jpg" alt="Turin's Youtube Brand" className="player-thumbnail"/>
        <h3></h3>
        <p className="b5-score">0</p>
      </div>
      <div className="b5-p2 b5-player">
        <img src="images/turin_brand.jpg" alt="Turin's Youtube Brand" className="player-thumbnail"/>
        <h3></h3>
        <p className="b5-score">0</p>
      </div>
    </div>
  </div>

export default BestOfFive;