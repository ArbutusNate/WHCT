import React, {Component} from 'react';
import RecordCollapsible from "../RecordCollapsible";
import Axios from "axios";
import './RecordZone.css';

class RecordZone extends Component {
    constructor(props) {
    super(props)
    this.state = {
      records: []
    }
  }

  componentDidMount() {
    Axios.get(`/admin/getrecords`)
      .then((res) => {
        console.log(res.data);
        this.setState({
          records: res.data
        })
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
        {this.state.records.map((data, i) => {
          return (
            <RecordCollapsible
              key={i}
              iter={i}
              name={data.name}
              link={data.link}
              gWins={data.gRecord.wins}
              gLosses={data.gRecord.losses}
              tWins={data.tRecord.wins}
              tLosses={data.tRecord.losses}
            />
          )
        })
        }
      </div>
    </div>
    )
  }
}

export default RecordZone;