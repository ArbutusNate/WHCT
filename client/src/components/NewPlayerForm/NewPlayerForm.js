import React from 'react';
import './NewPlayerForm.css';

const NewPlayerForm = props =>

  <div className="pure-g npf-div">
    <input className="bo5-form-item pure-u-7-24" name="newPlayer" placeholder="Enter New Players Name" type="text" value={props.newPlayer} onChange={props.handleChange}/>
    <input className="bo5-form-item pure-u-7-24" name="newPlayerLink" placeholder="Link to YouTube channel" type="url" value={props.newPlayerLink} onChange={props.handleChange}/>
    <input className="admin-submit pure-u-7-24" type="submit" value="Add Competitor"/>
  </div>

export default NewPlayerForm;