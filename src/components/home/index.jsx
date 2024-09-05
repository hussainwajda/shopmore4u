import React from 'react'
// import Poster from '../Poster/poster';
import Topcat from '../Topcat/topcat';
// import PopularProducts from '../Pop_prdct/pop_prdt';
import LatestDeals from '../Latestdeals/latestdeals';

import './index.css';
import AdsenseComponent from '../adSense';
function index() {
  // const metaTags = `
  //           <meta property="og:title" content="shopmore4u" />
  //           <meta property="og:description" content="We Deal With Products Having Immense Discounts" />
  //           <meta property="og:image" content="../Assets/logo.png" />
  //       `;
  return (
    <>

        <LatestDeals />
        {/* <Poster /> */}      
          <Topcat />
          <AdsenseComponent />
        {/* <PopularProducts /> */}
        
    </>
  )
}

export default index