import React, { Component } from 'react';

import { GlobalClasses } from "../../themes/GlobalClasses";
import { BannerOptionDiv, BannerContentDiv } from "../../themes/GlobalStyled";
import styled from 'styled-components';

import { useClose } from "./useClose";
import BannerCloser from "./BannerCloser";

/**
 * Style
 */
const BannerContent = styled(BannerContentDiv)`
    height: 1.5rem;
    padding: 0;
    overflow: hidden;
    `;
const BannerOption = styled(BannerOptionDiv)`
    height: 1.5rem;
`;
const SpanInfo = styled.span`
    font-size: 0.85rem;
    color: white;
`;

/************************************
 * 
 * Infos banner => closable with useClose and BannerClose
 * 
 * @TODO : use it to display api call problems and message in case of 429
 * 
 * ******************************** */
export default function InfoBannerMainPage(props) {
    const [showBanner, closeBanner] = useClose();


    return (
        <>
            {showBanner ?
                <aside className={GlobalClasses.divBanner + " bg-primary"} >
                    <BannerContent>
                        <SpanInfo>
                            ☂️Catch this rare interview with the "Father of the Crypto Revolution," J. Christopher Giancarlo, who cautions against rushing into creating a digital dollar! Read it here.
                        </SpanInfo>
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