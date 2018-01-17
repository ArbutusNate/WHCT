import React from 'react';
import './NewPlayerForm.css';

const NewPlayerForm = props =>

  <div>
    <input className="bo5-form-item" name="newplayername" placeholder="Enter New Players Name" type="text" />
    <input className="bo5-form-item" name="newplayeryt" placeholder="Link to YouTube channel" type="url" />
    <input className="admin-submit" type="submit" value="Add Competitor"/>
  </div>

export default NewPlayerForm;