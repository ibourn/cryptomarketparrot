import React, { Component } from 'react';
import styled from 'styled-components';

import PubBannerMainPage from "../Banners/PubBannerMainPage";
import InfoBannerMainPage from "../Banners/InfoBannerMainPage";
import MarketBannerMainPage from "../Banners/MarketBannerMainPage";

export default function ExchangeHeader(props) {

        return (
            <header>
                <PubBannerMainPage/>
                <InfoBannerMainPage/>
                <MarketBannerMainPage/>
            </header>
        );
}
