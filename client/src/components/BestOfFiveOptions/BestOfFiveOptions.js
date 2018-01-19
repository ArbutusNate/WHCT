import React from 'react';
import BestOfFiveGameOptions from '../BestOfFiveGameOptions';
import DropDownOption from '../DropDownOption';
import './BestOfFiveOptions.css';



const BestOfFiveOptions = props =>

  <div id="sub-control-panel" className="pure-g">

    <input disabled={props.isLive} className="bo5-form-item pure-u-7-24" type="text" placeholder="Tournament Name" name="tName" onChange={props.handleChange}></input>

    <select disabled={props.isLive} className="bo5-form-item pure-u-7-24" name="player1" onChange={props.handleChange}>
      <option value="default"> Choose Player 1 </option>
      <DropDownOption playerList={props.playerList}/>
    </select>
    <select disabled={props.isLive} className="bo5-form-item pure-u-7-24" name="player2" onChange={props.handleChange}>
      <option value="default"> Choose Player 2 </option>
      <DropDownOption playerList={props.playerList}/>
    </select>


    <button disabled={props.isLive} className="bo5-form-item pure-u-1-2" onClick={props.socketGoLive}> Go Live! </button>
    <button className="bo5-form-item pure-u-10-24" onClick={props.resetTourney}> Reset </button>

    {props.isLive === true &&
      <BestOfFiveGameOptions {...props} />
    }

  </div>


export default BestOfFiveOptions