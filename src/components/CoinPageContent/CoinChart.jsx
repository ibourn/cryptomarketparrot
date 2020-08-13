import React, { useContext } from 'react';
import TradingViewWidget, { Themes } from 'react-tradingview-widget';
import styled from 'styled-components';

import { ThemeContext } from "../ThemeToggler/ThemeContext";


/**
 * Style
 */
const Section = styled.section`
height: 80vh;
  `;

/************************************
* 
* CoinChart page
* 
* ******************************** */
export default function CoinChart(props) {
  const { theme } = useContext(ThemeContext);

  const colorTheme = theme === 'light' ? null : Themes.DARK;

  return (
      <Section className="row">

        <TradingViewWidget symbol={props.coin} hide_side_toolbar={false}
          locale="fr" theme={colorTheme} autosize/>

      </Section>
)

}
