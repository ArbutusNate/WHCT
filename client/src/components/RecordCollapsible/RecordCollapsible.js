import React from 'react';
import './RecordCollapsible.css';

const RecordCollapsible = props => {
  <div class="card">
    <div class="card-header" id="headingOne">
      <h5 class="mb-0">
        <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          {props.playerName}
        </button>
      </h5>
    </div>

    <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
      <div class="card-body">
          Text
      </div>
    </div>
  </div>
  }

export default RecordCollapsible;