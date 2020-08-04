import React, { Component } from 'react';
//import paprikaLogo from "./coinpaprika.svg"
import styled from 'styled-components';

import PubBannerMainPage from "../Banners/PubBannerMainPage";
import InfoBannerMainPage from "../Banners/InfoBannerMainPage";


export default function ExchangeHeader(props) {

        return (
            <header>
                <PubBannerMainPage/>
                <InfoBannerMainPage/>
             
                  <div>market banner</div> 
                
                
            </header>
        );
}
