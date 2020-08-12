import React, { useContext } from 'react';
import TradingViewWidget, { Themes } from 'react-tradingview-widget';
import styled from 'styled-components';

import { ThemeContext } from "../ThemeToggler/ThemeContext";
import { lightTheme, darkTheme } from '../../themes/Theme';


/**
 * Style
 */
const Section = styled.section`

height: 80vh;
  `;
const Div2 = styled.div`
  
    `;
/************************************
* 
* CoinChart page
* 
* ******************************** */
export default function CoinChart(props) {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const colorTheme = theme == 'light' ? null : Themes.DARK;

  return (
      <Section className="row">

        <TradingViewWidget symbol={props.coin} hide_side_toolbar={false}
          locale="fr" theme={colorTheme} autosize/>

      </Section>
)

}
