import React, { Component } from 'react';
import Header from '../Header';
import Social from '../Social';
import './MainView.css';

class MainView extends Component {
  render () {
   return (
    <div className="background">
      <Header/>
      <Social/>
      <footer>
        <div>Icons made by <a href="https://www.flaticon.com/authors/linh-pham" title="Linh Pham">Linh Pham</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0">CC 3.0 BY</a></div>
      </footer>
    </div>
   )
  }
}

export default MainView;