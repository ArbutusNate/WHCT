import React from 'react';
import './Header.css';

const Header = props =>
  <div className="header">
    <img src="images/turin_brand.jpg" alt="Turin's Youtube Brand" className="brand"/>
    <div className="title-box">
        <h1> Turinments </h1>
    </div>
    <nav>
      <div className="nav-button" view="tournament" onClick={props.handleViewChange}>
        Current Tournaments
      </div>
      <div className="nav-button" view="records" onClick={props.handleViewChange}>
        Records
      </div>
    </nav>
  </div>

export default Header;