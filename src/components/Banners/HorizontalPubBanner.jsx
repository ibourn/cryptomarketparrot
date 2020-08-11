import React from 'react';

import styled from 'styled-components';
import { GlobalClasses } from "../../themes/GlobalClasses";
import { BannerOptionDiv, BannerContentDiv } from "../../themes/GlobalStyled";

import { useClose } from "./useClose";
import BannerCloser from "./BannerCloser";
import livewebinar from "../../assets/Webpnet-livewebinar.png";
import IoTacademy from "../../assets/Webpnet-IoTacademy.png";

/************************************
 * 
 * Pub banner => closable with useClose and BannerCloser
 *
 * display horizontal pub in the header of main pages
 * 
 * ******************************** */
export default function PubBannerMainPage(props) {
    const [showBanner, closeBanner] = useClose();

    return (
        <>
            {showBanner ?
                <aside className={GlobalClasses.divBanner} >
                    <BannerContentDiv className="d-flex justify-content-between">
                        <img src={livewebinar} height="100" alt="livewebinar" />
                        <img src={IoTacademy} height="100" alt="IoTacademy" />
                        <img src={livewebinar} height="100" alt="livewebinar" />
                    </BannerContentDiv>
                    <BannerOptionDiv >
                        <BannerCloser closePub={closeBanner} />
                    </BannerOptionDiv >
                </aside>
                : null
            }
        </>
    );
}

