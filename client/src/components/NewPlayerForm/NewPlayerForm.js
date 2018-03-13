import React from 'react';
import './NewPlayerForm.css';

const NewPlayerForm = props =>

  <div className="container npf-div">

    <div className="row">
        <input className="bo5-form-item col-sm" name="newPlayer" placeholder="Enter New Players Name" type="text" value={props.newPlayer} onChange={props.handleChange}/>
    </div>

    <div className="row">
        <input className="bo5-form-item col-sm" name="newPlayerLink" placeholder="Link to YouTube channel" type="url" value={props.newPlayerLink} onChange={props.handleChange}/>
    </div>

    <div className="row">
        <input className="admin-submit col-sm" type="submit" value="Add Competitor"/>
    </div>

  </div>

export default NewPlayerForm;