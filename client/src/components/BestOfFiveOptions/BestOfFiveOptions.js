import React from 'react';

const BestOfFiveOptions = props =>

  <div>
    <input type="text" placeholder="Name this tournament" onChange={props.updateTitle}></input>
    <select name="player1" onChange={props.handleChange}>
      <option value="default"> Choose Player 1 </option>
      <option value="Turin"> Turin </option>
      <option value="JonTaun"> JonTaun </option>
    </select>
    <select name="player2" onChange={props.handleChange}>
      <option value="default"> Choose Player 2 </option>
      <option value="Loremaster of Sotek"> Loremaster of Sotek </option>
      <option value="ItalianSpartacus"> ItalianSpartacus </option>
    </select>
    <button name="player1wins" onClick={props.updateScore}>Player 1 Win</button>
    <button name="player2wins" onClick={props.updateScore}>Player 2 Win</button>
    <button onClick={props.resetTourney}> Reset </button>
  </div>


export default BestOfFiveOptions