import React from 'react';
import './Header.css';

const Header = props =>
  <div className="navbar">
    <img src="images/turin_brand.jpg" alt="Turin's Youtube Brand" className="brand"/>
    <div className="title-box">
        <h1> Community Tournaments </h1>
    </div>
    <ul className="nav">
      <li className="nav-item">
        <button className="hvr-bounce-to-right" view="tournament" onClick={props.handleViewChange}>Tournaments</button>
      </li>
      <li className="nav-item">
        <button className="hvr-bounce-to-right" view="records" onClick={props.handleViewChange}>Records</button>
      </li>
        {props.isLoggedIn ?
          <div className="nav-item">
            <button className="hvr-bounce-to-right" onClick={() => props.logOut()}>
               Log Out
            </button>
          </div> :

          <div className="nav-item">
            <button className="hvr-bounce-to-right" onClick={() => props.showHideModal('block', "Log In")}>
              Log In
            </button>

            <button className="hvr-bounce-to-right" onClick={() => props.showHideModal('block', "Sign Up")}>
              Sign Up
            </button>
          </div>

        }
    </ul>
  </div>

export default Header;