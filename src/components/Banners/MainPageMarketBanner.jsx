import React, { useState, useEffect, useContext } from 'react';

import styled from 'styled-components';
import { GlobalClasses } from "../../themes/GlobalClasses";
import { BannerOptionDiv, BannerContentDiv } from "../../themes/GlobalStyled";
import { ThemeContext } from "../ThemeToggler/ThemeContext";
import { useTheme } from '../ThemeToggler/useTheme';
import { lightTheme, darkTheme } from '../../themes/Theme';
import ThemeToggler from '../ThemeToggler/ThemeToggler';

import { Time } from "../../modules/Utilities";
import { DataProvider } from "../../modules/DataProvider";
import { useClose } from "./useClose";

import { Format } from "../../modules/Utilities";


/**
 * Style
 */
const Aside = styled.aside`
@media (max-width: 1150px) {
    height: 3rem;
  }
  @media (max-width: 830px) {
    height: 4rem;
  }
`;
const BannerContent = styled(BannerContentDiv)`
    height: 2rem;
    padding: 0;
`;
const BannerOption = styled(BannerOptionDiv)`
    height: 2rem;
`;
const Ul = styled.ul`
margin-top: 0.3rem;
`;
const Li = styled.li`
list-style: none;
font-size: 0.7rem;
`;


/************************************
 * 
 * display general data of the market
 * 
 * Theme toggler Dark/Light mode
 * 
 * ******************************** */
export default function MarketBannerMainPage(props) {
    const { theme, toggleTheme } = useContext(ThemeContext);
  //  const { updateTime, refreshUpdateTime } = useContext(UpdateTimeContext);

    //const [theme, toggleTheme] = useTheme();
    //const [showBanner, closeBanner] = useClose();
    const [globalInfos, setGlobalInfos] = useState({
        paprikaInfos: {},
        geckoInfos: {}
    });
    const [loading, setLoading] = useState(true);

  /**
   * style and classes
   */
   const colorStyle = theme == 'light' ? { backgroundColor: `${lightTheme.container}`,
   color: `${lightTheme.content}` } :{ backgroundColor: `${darkTheme.container}`,
   color: `${darkTheme.content}` }
   
    useEffect(() => {
        fetchGlobalInfos();
    });


    const fetchGlobalInfos = () => {

        let respPaprikaInfos = DataProvider.getGlobalInfosFromPaprika();
        let respGeckoInfos = DataProvider.getGlobalInfosFromGecko();

        Promise.all([respPaprikaInfos, respGeckoInfos]).then((responses) => {
            //setLoading(false);
            console.log(responses[0].data, responses[1].data);
            setGlobalInfos({
                paprikaInfos: responses[0].data,
                geckoInfos: responses[1].data.data
            })
        });
        setLoading(false);
        
        props.refreshUpdateTime(Time.fromTimestamp(globalInfos.paprikaInfos.last_updated));
    }

    const divUlClass = "d-flex flex-row justify-content-between";
    const divLiClass = "mx-1 justify-content-center";
    const content="text-primary";
    const Separator = <i class="fas fa-circle text-muted"></i>;

    const loader = !loading ? "" : <span>Fecthing data ... </span>


    const newUpdateTime = props.lastUpdateTime ? props.lastUpdateTime : Time.fromTimestamp(globalInfos.paprikaInfos.last_updated);

    return (
        <>
            <Aside className={GlobalClasses.divBanner} style={colorStyle}>
                <BannerContent>

                    {loading ? loader :

                        <Ul className={divUlClass}>
                            <Li key="MB1" className={divLiClass}>
                                <span>Cryptocurrencies :</span><span className={content}>{" " + 
                                globalInfos.paprikaInfos.cryptocurrencies_number}</span>
                            </Li>
                            <Li key="MB2">{Separator}</Li>
                            <Li key="MB3" className={divLiClass}>
                                <span>Markets :</span><span className={content}>{" " + 
                                globalInfos.geckoInfos.markets}</span>
                            </Li>
                            <Li key="MB4">{Separator}</Li>
                            <Li key="MB5" className={divLiClass}>
                                <span>Market Cap :</span><span className={content}>{" " + 
                                Format.toCurrency(globalInfos.paprikaInfos.market_cap_usd, 'USD')}</span>
                            </Li>
                            <Li key="MB6">{Separator}</Li>
                            <Li key="MB7" className={divLiClass}>
                                <span>Market Cap %(24h):</span><span className={content}>{" " + 
                                Format.toCurrency(globalInfos.geckoInfos.market_cap_change_percentage_24h_usd, 'USD')}</span>
                            </Li>
                            <Li key="MB8">{Separator}</Li>
                            <Li key="MB9" className={divLiClass}>
                                <span>24h Vol. :</span><span className={content}>{" " + 
                                Format.toCurrency(globalInfos.paprikaInfos.volume_24h_usd, 'USD')}</span>
                            </Li>
                            <Li key="MB10">{Separator}</Li>
                            <Li key="MB11" className={divLiClass}>
                                <span>BTC % dom :</span><span className={content}>{" " + 
                                globalInfos.paprikaInfos.bitcoin_dominance_percentage + "%"}</span>
                            </Li>
                            <Li key="MB12">{Separator}</Li>
                            <Li key="MB13" className={divLiClass}>
                                <span>Last update :</span><span className={content}>{" " +  
                                newUpdateTime}</span>
                            </Li>
                        </Ul>
                    }
                </BannerContent>
                <BannerOption >
                    <ThemeToggler theme={theme} toggleTheme={toggleTheme} />
                </BannerOption>
            </Aside>

        </>
    );
}