import React, { useState, useEffect } from 'react';

import styled from 'styled-components';
import { GlobalClasses } from "../../themes/GlobalClasses";
import { Time } from "../../modules/Utilities";
import { DataProvider } from "../../modules/DataProvider";
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
    const [globalInfos,setGlobalInfos] = useState({
        geckoInfos: {},
        paprikaInfos: {}
    });

    const [loading, setLoading] = useState(true);
    const divUlClass = "d-flex flex-row justify-content-between";
    const divLiClass = " justify-content-center";

    const Separator = <i class="fas fa-circle text-muted"></i>;

    useEffect(() => {
console.log("useffect lance");
 /*       let respInfos = DataProvider.getGlobalInfos();
        setGlobalInfos(() => {
            console.log("loading passe a false");
            setLoading(true);
            return respInfos.data});*/
        fetchGlobalInfos();
    });
    

    const fetchGlobalInfos = () => {
     //   if(globalInfos != undefined){
          //  if(x.length == 0){
                console.log("useeffect qd sis mount ds mainpage banner"); 
                let respPaprikaInfos = DataProvider.getGlobalInfosFromPaprika();
                let respGeckoInfos = DataProvider.getGlobalInfosFromGecko();

Promise.all([respPaprikaInfos, respGeckoInfos]).then((responses) =>{
    setLoading(false);
    setGlobalInfos({
        paprikaInfos: responses[0].data,
        geckoInfos: responses[1].data
    })

               
       //     }

      //  }
    });
}

const loader = !loading ?  "" : <span>Fecthing data ... </span>
//console.log(globalInfos.active_cryptocurrencies);
    return (
        <>
          <div className={GlobalClasses.divBanner}>
                <BannerContent>
        {/* { globalInfos == undefined ?
        <span>Fecthing data ... </span>
         : globalInfos.length == 0 ?
        <span>Fecthing data ... </span>
         :  */}
        { loading  ? loader :
           
                    <ul className={divUlClass}>
                        <Li key="MB1" className={divLiClass}>
                            <span>Cryptocurrencies :</span><span>{globalInfos.paprikaInfos.cryptocurrencies_number}</span>
                        </Li>
                        <Li key="MB2">{Separator}</Li>
                        <Li key="MB3" className={divLiClass}>
                            <span>Markets :</span><span>{globalInfos.paprikaInfos.cryptocurrencies_number}</span>
                        </Li>
                        <Li key="MB4">{Separator}</Li>
                        <Li key="MB5" className={divLiClass}>
                            <span>Market Cap :</span><span>{globalInfos.paprikaInfos.market_cap_usd}</span>
                        </Li>
                        <Li key="MB6">{Separator}</Li>
                        <Li key="MB7" className={divLiClass}>
                            <span>Market Cap %(24h):</span><span>{globalInfos.geckoInfos.market_cap_change_percentage_24h_usd}</span>
                        </Li>
                        <Li key="MB8">{Separator}</Li>
                        <Li key="MB9" className={divLiClass}>
                            <span>24h Vol. :</span><span>{globalInfos.paprikaInfos.volume_24h_usd}</span>
                        </Li>
                        <Li key="MB10">{Separator}</Li>
                        <Li key="MB11" className={divLiClass}>
                            <span>BTC dom :</span><span>{globalInfos.paprikaInfos.bitcoin_dominance_percentage}</span>
                        </Li>
                        <Li key="MB11">{Separator}</Li>
                        <Li key="MB12" className={divLiClass}>
                            <span>Last update :</span><span>{Time.fromTimestamp(globalInfos.paprikaInfos.last_updated)}</span>
                        </Li>
                    </ul>
}
                </BannerContent>
                <BannerOption >
                    <ThemeToggler theme={theme} toggleTheme={toggleTheme} />
                </BannerOption>
            </div>

        </>
    );
}