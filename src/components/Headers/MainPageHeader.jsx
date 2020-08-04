import React from 'react';
import styled from 'styled-components';

import MainPagePubBanner from "../Banners/HorizontalPubBanner";
import MainPageInfoBanner from "../Banners/MainPageInfoBanner";
import MainPageMarketBanner from "../Banners/MainPageMarketBanner";

export default function ExchangeHeader(props) {

        return (
            <header>
                <MainPagePubBanner/>
                <MainPageInfoBanner/>
                <MainPageMarketBanner/>
            </header>
        );
}
