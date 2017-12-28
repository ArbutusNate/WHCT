import React from 'react';
import './NewPlayerForm.css';

const NewPlayerForm = props =>

  <div>
    <input name="newplayername" placeholder="Enter New Players Name" type="text" />
    <input name="newplayeryt" placeholder="Link to YouTube channel" type="text" />
    <input className="admin-submit" type="submit" value="Add Competitor"/>
  </div>

export default NewPlayerForm;