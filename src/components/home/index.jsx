import React from 'react'
// import Poster from '../Poster/poster';
import Topcat from '../Topcat/topcat';
// import PopularProducts from '../Pop_prdct/pop_prdt';
import LatestDeals from '../Latestdeals/latestdeals';

import './index.css';
function index() {
  return (
    <>
  
        <LatestDeals />
        {/* <Poster /> */}      
          <Topcat />
        {/* <PopularProducts /> */}
        
    </>
  )
}

export default index