import React from 'react';
import './NewPlayerForm.css';

const NewPlayerForm = props =>

  <div>
    <input name="newplayername" placeholder="Enter New Players Name" type="text" />
    <input name="newplayeryt" placeholder="Link to YouTube channel" type="text" />
  </div>

export default NewPlayerForm;