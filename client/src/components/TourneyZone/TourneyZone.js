import React, {Component} from 'react';
import Axios from 'axios';
import AdminControl from '../AdminControl';
import BestOfFive from '../BestOfFive';
import './TourneyZone.css';
import openSocket from 'socket.io-client';
const socket = openSocket(
  // process.env.PORT || `http://localhost:3001`
  );

class TourneyZone extends Component {
    constructor(props) {
    super(props)
    // var socket = this.props.socket;
    this.state = {
      liveTournaments: []
    }
  }

  componentDidMount = () => {
    Axios.get(`/admin/liveTournaments`)
    .then((res) => {
      console.log(res.data);
      this.setState({
        'liveTournaments': res.data,
      })
    })
  }



  render() {
    return (
      <div className="tourney-zone">
        <AdminControl />

        {this.state.liveTournaments.map((data, i) => {
          return (
              <BestOfFive
                key={`liveT` + i}
                tName={data.name}
                player1={data.players[0]}
                player2={data.players[1]}
              />
            )
          })
        }

      </div>
    )
  }
}

export default TourneyZone;