import React from 'react';
import "./BestOfFiveGameOptions.css";

const BestOfFiveGameOptions = props =>

  <div className="bo5-game-option-div pure-g">

    <select className="bo5-form-item pure-u-10-24" modeswitch="faction" value={props.player1faction} name="player1faction" onChange={props.updateFaction}>
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

    <select className="bo5-form-item pure-u-10-24" modeswitch="faction" value={props.player2faction} name="player2faction" onChange={props.updateFaction}>
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

    <button disabled={props.disableButtons} className="bo5-form-item pure-u-10-24" name="player1wins" pstring="player1" onClick={props.updateScore}> + {props.player1} Win</button>
    <button disabled={props.disableButtons} className="bo5-form-item pure-u-10-24" name="player2wins" pstring="player2" onClick={props.updateScore}>
      + {props.player2} Win
    </button>
    <br />

    <input className="bo5-form-item pure-u-1-2" type="submit" value="End and Save Tournament" onClick={props.endSaveTournament} />
  </div>


export default BestOfFiveGameOptions