import React from 'react'
import Poster from '../Poster/poster';
import Topcat from '../Topcat/topcat';
import Elec from '../Elec/elec';
import Fashion from '../Stores/stores';
import Furniture from '../Latestdeals/latestdeals';

import './index.css';
function index() {
  return (
    <>
        <Poster />
        <div className='topcat'>
          <Topcat />
        </div>
        <Elec />
        <Fashion />
        <Furniture />
    </>
  )
}

export default index