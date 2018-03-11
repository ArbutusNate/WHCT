import React, {Component} from 'react';
import RecordCollapsible from "../RecordCollapsible";
import Axios from "axios";
import './RecordZone.css';

class RecordZone extends Component {

  componentDidMount() {
    Axios.get(`/admin/getrecords`)
      .then((res) => {
        console.log(res);
        // this.setState({
        //   records: 
        // })
      })
  }

  render () {
    return (
    <div>
      <div>
        <h1> Records </h1>
        <input type="text" placeholder="Search By Player" />
        <select type="dropdown">
          <option value="wins">Game Wins</option>
          <option value="wlRecords">Record</option>
          <option value="tournamentWins">Tournament Wins</option>
        </select>
      </div>
      <div className="accordion">

      </div>
    </div>
    )
  }
}

export default RecordZone;