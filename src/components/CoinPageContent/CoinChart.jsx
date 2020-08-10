import React from 'react';
import TradingViewWidget from 'react-tradingview-widget';
import styled from 'styled-components';


/**
 * Style
 */
const Div = styled.div`
width: 800px;
height: 500px;
  `;
const Div2 = styled.div`
  
    `;
/************************************
* 
* CoinChart page
* 
* ******************************** */
export default function CoinChart(props) {


  return (
      <div className="row">

        <TradingViewWidget symbol={props.coin} hide_side_toolbar={false}
          locale="fr" autosize/>

      </div>
)

}
