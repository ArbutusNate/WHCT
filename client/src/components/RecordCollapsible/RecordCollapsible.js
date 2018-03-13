import React from 'react';
import './RecordCollapsible.css';

const RecordCollapsible = props => {
  return (
    //Whole Collapsible for each player
  <div className="card">
    <div className="card-header" id={`heading${props.iter}`}>
      <h5 className={`mb-${props.iter}`}>
        <button className="btn btn-link" data-toggle="collapse" data-target={`#collapse${props.iter}`} aria-expanded="true" aria-controls={`collapse${props.iter}`}>
          {props.name}
        </button>
      </h5>
    </div>

    <div id={`collapse${props.iter}`} className="collapse" aria-labelledby={`heading${props.iter}`} data-parent="#accordion">
      <div className="card-body container">
        {/*Header Row*/}
        <div className="row">
          <div className="col-sm"></div>
          <div className="col-sm">Wins</div>
          <div className="col-sm">Losses</div>
        </div>
        {/*Data Row*/}
        <div className="row">
          <div className="col-sm">
            Game Record:
          </div>
          <div className="col-sm">
            {props.gWins}
          </div>
          <div className="col-sm">
            {props.gLosses}
          </div>
        </div>
        {/*Data Row*/}
        <div className="row">
          <div className="col-sm">
            Tournament Record:
          </div>
          <div className="col-sm">
            {props.tWins}
          </div>
          <div className="col-sm">
            {props.tLosses}
          </div>
        </div>
      </div>
    </div>
  </div>
  )
  }

export default RecordCollapsible;