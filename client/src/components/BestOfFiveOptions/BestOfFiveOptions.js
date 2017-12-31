import React from 'react';
import BestOfFiveGameOptions from '../BestOfFiveGameOptions';

const BestOfFiveOptions = props =>

  <div>
    <input type="text" placeholder="Name this tournament" name="tName"onChange={props.handleChange}></input>

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


    <button onClick={props.resetTourney}> Reset </button>
    <button onClick={props.socketGoLive}> Go Live! </button>

    {props.isLive === true &&
      <BestOfFiveGameOptions {...props} />
    }

  </div>


export default BestOfFiveOptions