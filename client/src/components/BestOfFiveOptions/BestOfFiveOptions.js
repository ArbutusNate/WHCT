import React from 'react';
import BestOfFiveGameOptions from '../BestOfFiveGameOptions';
import DropDownOption from '../DropDownOption';


const BestOfFiveOptions = props =>

  <div>
    <input type="text" placeholder="Name this tournament" name="tName"onChange={props.handleChange}></input>

    <select name="player1" onChange={props.handleChange}>
      <option value="default"> Choose Player 1 </option>
      <DropDownOption playerList={props.playerList}/>
    </select>
    <select name="player2" onChange={props.handleChange}>
      <option value="default"> Choose Player 2 </option>
      <DropDownOption playerList={props.playerList}/>
    </select>


    <button onClick={props.resetTourney}> Reset </button>

    {props.isLive === false &&
      <button onClick={props.socketGoLive}> Go Live! </button>
    }

    {props.isLive === true &&
      <BestOfFiveGameOptions {...props} />
    }

  </div>


export default BestOfFiveOptions