import React, {Component} from 'react';
import RecordCollapsible from "../RecordCollapsible";
import Axios from "axios";
import './RecordZone.css';

  let initialState = {
    records: [],
    sort: "",
    search: ""
  }

class RecordZone extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...initialState
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

  handleSortChange = (e) => {
    e.preventDefault();
    console.log(e.target.name);
    this.setState({
      sort: `-${e.target.value}`
    })
  }

  handleSearchChange = (e) => {
    e.preventDefault();
    this.setState({
      search: e.target.value
    })
  }

  sortFilterRecords = (e) => {
    e.preventDefault();
    let route = `admin/getrecords/${this.state.sort}/${this.state.search}`
    console.log(route);
    Axios.get(route)
      .then((res) => {
        console.log(res.data);
      })
  }

  render () {
    return (
    <div>
      <form onSubmit={this.sortFilterRecords}>
        <h1> Records </h1>
        <input name="nameSearch" type="text" value={this.state.nameSearch} placeholder="Search By Player" onChange={this.handleSearchChange}/>
        <select name="sortType" type="dropdown" onChange={this.handleSortChange}>
          <option value={""}>No Sort</option>
          <option value="gRecord.wins">Game Wins</option>
          <option value="gRecord.losses">Game Losses</option>
          <option value="wlRecords">Record</option>
          <option value="tRecord.wins">Tournament Wins</option>
        </select>
        <input type="submit"/>
      </form>
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