import React, { useEffect } from 'react';

import styled from 'styled-components';
import { GlobalClasses } from "../../themes/GlobalClasses";
//import { BannerOptionDiv, BannerContentDiv } from "../../themes/GlobalStyled";

import { useClose } from "./useClose";
import BannerCloser from "./BannerCloser";
import livewebinar from "../../assets/Webpnet-livewebinar.png";
import IoTacademy from "../../assets/Webpnet-IoTacademy.png";

/**
 * Style
 */
const BannerContent = styled.div`
    padding-top: 10rem;
    margin-left: -1rem;
    max-width: 90%;
    min-height: 80vh;
`;

const BannerOption = styled.div`
    padding-top: 10rem;
    margin-left: -1rem;
    min-height: 80vh;
`;

/************************************
 * 
 * Pub banner => closable with useClose and BannerClose 
 *
 * display horizontal pub in the header of main pages
 * 
 * ******************************** */
export default function PubBannerMainPage(props) {
    const [showBanner, closeBanner] = useClose();

    /*
    *  called if showBanner changes, lift up close state to main page
    */
    useEffect(() => {
        if(!showBanner) {
            props.closePub();
        }
       
    } );

    const divBannerClass = "d-flex flex-column justify-content-between  ";

    return (
        <>
            {showBanner ?
                <aside className={GlobalClasses.divBanner} >
                    <BannerContent className={divBannerClass}>
                        <img src={livewebinar} alt="livewebinar" />
                        <img src={IoTacademy} alt="IoTacademy" />
                        <img src={livewebinar} alt="livewebinar" />
                    </BannerContent>
                    <BannerOption >
                        <BannerCloser closePub={closeBanner} />
                    </BannerOption >
                </aside>
                : null
            }
        </>
    );
}

