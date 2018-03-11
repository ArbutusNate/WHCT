import React from 'react';
import BestOfFiveGameOptions from '../BestOfFiveGameOptions';
import DropDownOption from '../DropDownOption';
import './BestOfFiveOptions.css';



const BestOfFiveOptions = props =>
  <div className="container">
    <div className="row">

      <input disabled={props.isLive} className="bo5-form-item col-sm" type="text" value={props.tName} placeholder="Tournament Name" name="tName" onChange={props.handleChange}></input>

      <select disabled={props.isLive} className="bo5-form-item col-sm" name="player1" onChange={props.handleChange}>
        <option value="default">Player 1 </option>
        <DropDownOption playerList={props.playerList}/>
      </select>

      <select disabled={props.isLive} className="bo5-form-item col-sm" name="player2" onChange={props.handleChange}>
        <option value="default">Player 2 </option>
        <DropDownOption playerList={props.playerList}/>
      </select>

    </div>
    <div>
      <input className="bo5-form-item col-sm" type="text" name="tLink" onChange={props.handleChange} value={props.tLink} placeholder="Link to Stream"> </input>
    </div>
    <div className="row">

      <button disabled={props.isLive} className="bo5-form-item col-sm" onClick={props.socketGoLive}> Go Live! </button>

      <button className="bo5-form-item col-sm" onClick={props.resetTourney}> Reset </button>

    </div>
    <div className="row">
      {props.isLive ? <BestOfFiveGameOptions {...props}/> : null
      }
    </div>
  </div>

export default BestOfFiveOptions