import React, { Component } from 'react';

import styled from 'styled-components';

import { useClose } from "./useClose.jsx";
import BannerCloser from "./BannerCloser.jsx";

/************************************
 * 
 * Infos banner => closable with useClose and BannerClose
 * 
 * ******************************** */

export default function InfoBannerMainPage(props) {
    const [showBanner, closeBanner] = useClose();

    let divClass = "information banner d-flex justify-content-center";

    return (
        <>
            {showBanner ?
                <div className={divClass} >
                ☂️Catch this rare interview with the "Father of the Crypto Revolution," J. Christopher Giancarlo, who cautions against rushing into creating a digital dollar! Read it here.
                    <BannerCloser closePub={closeBanner} />
                </div>
                : null
            }
        </>
    );
}