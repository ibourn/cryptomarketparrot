import React, { Component } from 'react';

import styled from 'styled-components';

import { useClose } from "./useClose.jsx";
import BannerCloser from "./BannerCloser.jsx";

import { useTheme } from '../ThemeToggler/useTheme';
import ThemeToggler from '../ThemeToggler/ThemeToggler';

/************************************
 * 
 * display general data of the market
 * 
 * Theme toggler Dark/Light mode
 * 
 * ******************************** */

 const LiMarketBanner = styled.li`
 
 `;

export default function MarketBannerMainPage(props) {
    const [theme, toggleTheme] = useTheme();
    const [showBanner, closeBanner] = useClose();

    let divClass = "market banner d-flex flex-row justify-content-center";

    return (
        <>
        <div className={divClass}>>
            <ul className={divClass}>
                <li><span>Cryptocurrencies :</span><span>val</span></li>
                <li><span>Markets :</span><span>val</span></li>
                <li><span>Market Cap :</span><span>val</span></li>
                <li><span>24h Vol. :</span><span>val</span></li>
                <li><span>BTC dom :</span><span>val</span></li>
            </ul>
            <ThemeToggler theme={theme} toggleTheme={toggleTheme} />
            </div>
        </>
    );
}