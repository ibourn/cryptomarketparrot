import React, { useEffect, useRef } from 'react';
import { useHistory, useParams } from "react-router-dom";

import TradingViewWidget from 'react-tradingview-widget';
import Loader from "../Loader/Loader";

import styled from 'styled-components';

/************************************
 * 
 * CoinsPage
 * 
 * ******************************** */

const Div = styled.div`
width: 800px;
height: 500px;
  `;
  const Div2 = styled.div`
  
    `;
export default function CoinsPage(props) {
 //   const myRef = React.createRef();
 

 
///APIcalls


return(
    <>
<div className="row"> 
<TradingViewWidget
    symbol={props.coin}
    hide_side_toolbar={false}
    locale="fr"
    autosize
  />   


</div>
<Div2 className="container">

<Loader/>
</Div2></>

)

}
