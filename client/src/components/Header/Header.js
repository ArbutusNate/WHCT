import React from 'react';
import './Header.css';

const Header = props =>
  <div className="header">
    <img src="images/turin_brand.jpg" alt="Turin's Youtube Brand" className="brand"/>
    <div className="title-box">
        <h1> Community Tournaments </h1>
    </div>
    <ul className="nav">
      <li className="nav-item">
        <button className="nav-link btn-outline-secondary" view="tournament" onClick={props.handleViewChange}>Tournaments</button>
      </li>
      <li className="nav-item">
        <button className="nav-link btn-outline-secondary" view="records" onClick={props.handleViewChange}>Records</button>
      </li>
      <li className="nav-item">
        {props.isLoggedIn ?
          <button className="nav-link btn-outline-secondary" onClick={() => props.logOut()}>
             Log Out
          </button> :

          <div>
            <button className="nav-link btn-outline-secondary" onClick={() => props.showHideModal('block', "Log In")}>
              Log In
            </button>

            <button className="nav-link btn-outline-secondary" onClick={() => props.showHideModal('block', "Sign Up")}>
              Sign Up
            </button>
          </div>

        }
      </li>
    </ul>
  </div>

export default Header;