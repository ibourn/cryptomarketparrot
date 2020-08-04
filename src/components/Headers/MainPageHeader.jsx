import React, { Component } from 'react';
import styled from 'styled-components';

import MainPagePubBanner from "../Banners/MainPagePubBanner";
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
