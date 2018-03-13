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

  getRecords = () => {
    Axios.get(`admin/records/sort`)
      .then((res) => {
        console.log(res.data);
        this.setState({
          records: res.data
        })
      })
  }

  componentDidMount() {
    this.getRecords();
  }

  handleSortChange = (e) => {
    e.preventDefault();
    console.log(e.target.name);
    this.setState({
      sort: `-${e.target.value}`
    })
  }

  sortRecords = (e) => {
    e.preventDefault();
    let route = `admin/records/sort/${this.state.sort}/${this.state.search}`
    console.log(route);
    Axios.get(route)
      .then((res) => {
        console.log(res.data);
        this.setState({
          records: res.data,
          sort: ""
        })
      })
  }

  handleSearchChange = (e) => {
    e.preventDefault();
    this.setState({
      search: e.target.value
    })
  }

  searchRecords = (e) => {
    e.preventDefault();
    let route = `admin/records/search/${this.state.search}`
    Axios.get(route)
      .then((res) => {
        this.setState({
          records: res.data,
          search: ""
        })
      })
  }



  render () {
    return (
    <div>

      <form onSubmit={this.searchRecords}>
        <h1> Records </h1>
        <input name="nameSearch" type="text" value={this.state.nameSearch} placeholder="Search By Player" onChange={this.handleSearchChange}/>
        <input type="submit" />
      </form>

      <form onSubmit={this.sortRecords}>
        <select name="sortType" type="dropdown" onChange={this.handleSortChange}>
          <option value={""}>No Sort</option>
          <option value="gRecord.wins">Game Wins</option>
          <option value="gRecord.losses">Game Losses</option>
          <option value="wlRecords">Record</option>
          <option value="tRecord.wins">Tournament Wins</option>
        </select>
        <input type="submit"/>
      </form>

      <button onClick={this.getRecords}> Reset </button>

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
        })}
      </div>
    </div>
    )
  }
}

export default RecordZone;