import React, { Component } from 'react';

import styled from 'styled-components';
import { GlobalClasses } from "../../themes/GlobalClasses";
import { BannerOptionDiv, BannerContentDiv } from "../../themes/GlobalStyled";
import { useClose } from "./useClose";
import BannerCloser from "./BannerCloser";

import { useTheme } from '../ThemeToggler/useTheme';
import ThemeToggler from '../ThemeToggler/ThemeToggler';

/************************************
 * 
 * display general data of the market
 * 
 * Theme toggler Dark/Light mode
 * 
 * ******************************** */
const BannerContent = styled(BannerContentDiv)`
    height: 2rem;
`;
const BannerOption = styled(BannerOptionDiv)`
    height: 2rem;
`;
const Li = styled.li`
list-style: none;
`;



export default function MarketBannerMainPage(props) {
    const [theme, toggleTheme] = useTheme();
    const [showBanner, closeBanner] = useClose();

    const divUlClass = "d-flex flex-row justify-content-between";
    const divLiClass = " justify-content-center";

    const Separator = <i class="fas fa-circle text-muted"></i>;


    return (
        <>
            <div className={GlobalClasses.divBanner}>
                <BannerContent>
                    <ul className={divUlClass}>
                        <Li className={divLiClass}>
                            <span>Cryptocurrencies :</span><span>val</span>
                        </Li>
                        <Li>{Separator}</Li>
                        <Li className={divLiClass}>
                            <span>Markets :</span><span>val</span>
                        </Li>
                        <Li>{Separator}</Li>
                        <Li className={divLiClass}>
                            <span>Market Cap :</span><span>val</span>
                        </Li>
                        <Li>{Separator}</Li>
                        <Li className={divLiClass}>
                            <span>24h Vol. :</span><span>val</span>
                        </Li>
                        <Li>{Separator}</Li>
                        <Li className={divLiClass}>
                            <span>BTC dom :</span><span>val</span>
                        </Li>
                    </ul>
                </BannerContent>
                <BannerOption >
                    <ThemeToggler theme={theme} toggleTheme={toggleTheme} />
                </BannerOption>
            </div>
        </>
    );
}