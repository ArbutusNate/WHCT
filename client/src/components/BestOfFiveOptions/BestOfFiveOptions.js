import React from 'react';
import BestOfFiveGameOptions from '../BestOfFiveGameOptions';
import DropDownOption from '../DropDownOption';
import './BestOfFiveOptions.css';



const BestOfFiveOptions = props =>

  <div>
    <input disabled={props.isLive} className="bo5-form-item" type="text" placeholder="Name this tournament" name="tName" onChange={props.handleChange}></input>

    <select disabled={props.isLive} className="bo5-form-item" name="player1" onChange={props.handleChange}>
      <option value="default"> Choose Player 1 </option>
      <DropDownOption playerList={props.playerList}/>
    </select>
    <select disabled={props.isLive} className="bo5-form-item" name="player2" onChange={props.handleChange}>
      <option value="default"> Choose Player 2 </option>
      <DropDownOption playerList={props.playerList}/>
    </select>


    <button disabled={props.isLive} className="bo5-form-item" onClick={props.socketGoLive}> Go Live! </button>
    <button className="bo5-form-item" onClick={props.resetTourney}> Reset </button>

    {props.isLive === true &&
      <BestOfFiveGameOptions {...props} />
    }

  </div>


export default BestOfFiveOptions