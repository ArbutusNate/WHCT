import React from 'react';
import './DropDownOption.css';

const DropDownOption = props =>

  props.playerList.map((data, i) => {
    return <option key={`${i}+playerOption`}>{data.name}</option>
  })

export default DropDownOption;
