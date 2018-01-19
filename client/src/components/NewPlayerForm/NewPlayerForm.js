import React from 'react';
import './NewPlayerForm.css';

const NewPlayerForm = props =>

  <div className="pure-g npf-div">
    <input className="bo5-form-item pure-u-7-24" name="newplayername" placeholder="Enter New Players Name" type="text" />
    <input className="bo5-form-item pure-u-7-24" name="newplayeryt" placeholder="Link to YouTube channel" type="url" />
    <input className="admin-submit pure-u-7-24" type="submit" value="Add Competitor"/>
  </div>

export default NewPlayerForm;