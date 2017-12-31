import React from 'react';

const BestOfFiveGameOptions = props =>

  <div>
    <select value={props.player1faction} name="player1faction" onChange={props.handleChange}>
      <option value="default">Select Player 1 Faction</option>
      <option value="Dark Elves">Dark Elves</option>
    </select>
    <select value={props.player2faction} name="player2faction" onChange={props.handleChange}>
      <option value="default">Select Player 2 Faction</option>
      <option value="Dark Elves">Dark Elves</option>
    </select>
    <button name="player1wins" onClick={props.updateScore}> + {props.player1} Win</button>
    <button name="player2wins" onClick={props.updateScore}> + {props.player2} Win</button>
    <input type="submit" value="Save Tournament" />
  </div>


export default BestOfFiveGameOptions