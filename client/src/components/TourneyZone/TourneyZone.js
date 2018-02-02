import React, {Component} from 'react';
import Axios from 'axios';
import AdminControl from '../AdminControl';
import BestOfFive from '../BestOfFive';
import './TourneyZone.css';
import openSocket from 'socket.io-client';
const socket = openSocket();


class TourneyZone extends Component {
    constructor(props) {
    super(props)
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
    socket.on('liveResponse', (data) => {
      console.log(data);
      console.log('new live data incoming');
      Axios.get(`/admin/liveTournaments`)
      .then((res) => {
        console.log(res.data);
        this.setState({
          'liveTournaments': res.data,
        })
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
                player1={data.p1.name}
                player1wins={data.p1.score}
                player1faction={data.p1.faction}
                player2={data.p2.name}
                player2wins={data.p2.score}
                player2faction={data.p2.faction}
              />
            )
          })
        }

      </div>
    )
  }
}

export default TourneyZone;