import React, { Component } from 'react';
import { BrowserRouter }  from 'react-router-dom';
import MainView from './components/MainView';
// import './App.css';

class App extends Component {
  state = {
    view: 'tournament'
  }

  handleViewChange = (e) => {
    console.log(e.target);
    this.setState({
      view: e.target.attributes.view.value
    })
  }

  render() {
    return (
      <BrowserRouter>
        <MainView
          {...this.state}
          handleViewChange={this.handleViewChange}
        />
      </BrowserRouter>
    );
  }
}

export default App;
