import React from 'react';
import BestOfFiveGameOptions from '../BestOfFiveGameOptions';
import DropDownOption from '../DropDownOption';


const BestOfFiveOptions = props =>

  <div>

    {props.isLive === false &&
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

        <button onClick={props.socketGoLive}> Go Live! </button>

      </div>
    }

    {props.isLive === true &&
      <BestOfFiveGameOptions updateScore={props.updateScore} handleChange={props.handleChange} playerList={props.playerList} player1={props.player1} player2={props.player2} />
    }

  </div>


export default BestOfFiveOptions