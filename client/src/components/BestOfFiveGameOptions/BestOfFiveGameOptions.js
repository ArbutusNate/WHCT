import React from 'react';

const BestOfFiveGameOptions = props =>

  <div>

    <select className="bo5-form-item" value={props.player1faction} name="player1faction" onChange={props.handleChange}>
      <option value="default">Select {props.player1} Faction</option>
      <option value="Argwylon">Argwylon</option>
      <option value="Bordeleaux">Bordeleaux</option>
      <option value="Bretonnia">Bretonnia</option>
      <option value="Carcassonne">Carcassonne</option>
      <option value="Clan Angrund">Clan Angrund</option>
      <option value="Clan Pestilens">Clan Pestilens</option>
      <option value="Clan Mors">Clan Mors</option>
      <option value="Cult of Pleasure">Cult of Pleasure</option>
      <option value="Dwarfs">Dwarfs</option>
      <option value="The Empire">The Empire</option>
    </select>

    <select className="bo5-form-item" value={props.player2faction} name="player2faction" onChange={props.handleChange}>
      <option value="default">Select {props.player2} Faction</option>
      <option value="Argwylon">Argwylon</option>
      <option value="Bordeleaux">Bordeleaux</option>
      <option value="Bretonnia">Bretonnia</option>
      <option value="Carcassonne">Carcassonne</option>
      <option value="Clan Angrund">Clan Angrund</option>
      <option value="Clan Pestilens">Clan Pestilens</option>
      <option value="Clan Mors">Clan Mors</option>
      <option value="Cult of Pleasure">Cult of Pleasure</option>
      <option value="Dwarfs">Dwarfs</option>
      <option value="The Empire">The Empire</option>
    </select>

    <button className="bo5-form-item" name="player1wins" onClick={props.updateScore}> + {props.player1} Win</button>
    <button className="bo5-form-item" name="player2wins" onClick={props.updateScore}> + {props.player2} Win</button>
    <br />
    <input className="bo5-form-item" type="submit" value="Save Tournament" />
  </div>


export default BestOfFiveGameOptions