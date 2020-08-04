import React, { useState } from 'react';

import styled from 'styled-components';

import {useClose} from "./useClose.jsx";
import BannerCloser from "./BannerCloser.jsx";
import livewebinar from "../../assets/Webpnet-livewebinar.png";
import IoTacademy from "../../assets/Webpnet-IoTacademy.png";

/************************************
 * 
 * Pub banner => closable with useClose and BannerClose 
 *
 * display horizontal pub in the header of main pages
 * 
 * ******************************** */

const PubImg = styled.img`
    
`;

export default function PubBannerMainPage(props) {
    const [showBanner, closeBanner] = useClose();

   let divClass = "rowPub d-flex flex-row justify-content-around";

        return (
           <>
           { showBanner ?
                <div className={divClass} >
                    <PubImg src={livewebinar} alt="livewebinar"/>
                    <PubImg src={IoTacademy} alt="IoTacademy"/>
                    <PubImg src={livewebinar} alt="livewebinar"/>

                    <BannerCloser closePub={closeBanner}/>
                </div>
                : null
                }
            </>
        );
}

