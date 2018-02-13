import React from 'react';
import './Header.css';

const Header = props =>
  <div className="header">
    <img src="images/turin_brand.jpg" alt="Turin's Youtube Brand" className="brand"/>
    <div className="title-box">
        <h1> Community Tournaments </h1>
    </div>
    <nav>
      <div
        className="nav-button"
        view="tournament"
        onClick={props.handleViewChange}
      >
        Current Tournaments
      </div>

      <div
        className="nav-button"
        view="records"
        onClick={props.handleViewChange}
      >
        Records
      </div>

      {props.isLoggedIn ?
        <button
          className="nav-button"
          onClick={() => this.props.logOut}
        >
           Log Out
        </button> :
        <button
          className="nav-button"
          onClick={() => props.showHideModal('block')}
        >
          Log In
        </button>}
    </nav>
  </div>

export default Header;