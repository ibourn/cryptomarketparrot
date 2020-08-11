import React, { useState, useContext } from 'react';
import {  withRouter } from "react-router-dom";

import { ThemeContext } from "../ThemeToggler/ThemeContext";
import { DataContext } from "../NavBars/DataContext";
import CoinRow from "../RankingRow/CoinRow";
import styled from 'styled-components';
import { lightTheme, darkTheme } from '../../themes/Theme';




       const DivVertPub = styled.div`
       //  @media (max-width: 1100px) {
       //     transform: translateX(100px);
       }
        `;
    /**
     * Component loading the table
     * @param {*} props 
     */
const RankingCoins = (props) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const { coinsInfos, setCoinsInfos } = useContext(DataContext);
 const [sortSettings, setSortSettings] = useState({
   key: 'rank',
   order: 'asc'
 });

 const Table = styled.table`
 font-size: 0.7rem;
 `;
const Thead = styled.thead`
line-height: 2rem;
`;
const Th = styled.th`
 position: sticky;
 top: var(--navbar--main-height);
 min-height: 3rem;
 opacity: 1;
 :hover{
   text-decoration: underline;
   cursor: pointer;
 }
 `;
 const ThRank = styled(Th)`
  max-width: ${props.pubIsOpen ? '2rem' : '4rem'};
  text-align: center;
 `;
 const ThName = styled(Th)`
 min-width: ${props.pubIsOpen ? '6rem' : '8rem'};
 text-align: left;
 padding-left: 0.2rem
 @media (max-width: 1100px) {
   min-width: 4rem; 
   } 
 `;

 const ThChart = styled(Th)`
 min-width: 130px;
 max-width: 250px;
 @media (max-width: 1100px) {
   min-width: 80px; 
 `;

 const ThData = styled(Th)`
 text-align: right;    
 `;
 const ThPercent = styled(ThData)`
 min-width: 5rem;
 @media (max-width: 1100px) {
   min-width: 2.5rem; 
   } 
 `;
 const ThNum = styled(ThData)`
min-width: 8rem; 
@media (max-width: 1100px) {
min-width: 5rem; 
}  
 `;
 const ThPrice = styled(ThNum)`
 min-width: 5.5rem;  

    `;
 const ThSupply = styled(ThNum)`
 min-width: 6.5rem; 
 @media (max-width: 1100px) {
   min-width: 4.5rem; 
   }   
    `;




/**
 * style and classes
 */
 const themeColor = theme === 'light' ? 'black' : 'white';
 const thColorStyle = theme === 'light' ? {backgroundColor: `${lightTheme.body}`} : {backgroundColor: `${darkTheme.body}`}


/**
 * sort click handlers
 */
const handleClickRank = () => {
  sortManager('rank');
}
const handleClickName = () => {
  sortManager('name');
}
const handleClickPrice = () => {
  sortManager('price');
}
const handleClickMarketCap = () => {
  sortManager('market_cap');
}
const handleClickSupply = () => {
  sortManager('circulating_supply');
}
const handleClickChangeh1 = () => {
  sortManager('percent_change_1h');
}
const handleClickChangeh24 = () => {
  sortManager('percent_change_24h');
}
const handleClickChanged7 = () => {
  sortManager('percent_change_7d');
}
const handleClickChanged30 = () => {
  sortManager('percent_change_30d');
}
const handleClickChangeAth = () => {
  sortManager('percent_from_price_ath');
}
const handleClickVolumeh24 = () => {
  sortManager('volume_24h');
}

/**
 * Manage the field and order to sort columns
 * 
 * @param {srting} key 
 */
const sortManager = (key) => {
  let newOrder;
  if (sortSettings.key == key) {
    newOrder = sortSettings.order === 'asc' ? 'desc' : 'asc';
  } else {
    newOrder = 'asc';
  }
  setSortSettings({
    key: key,
    order: newOrder
  });
  props.handleClickSort(key, newOrder);
}
  
const thClass="";//"position-absolute sticky-top";


//<Table className="table table-primary table-bordered"></Table>
  return (
    <Table  className="container-fluid">
      <Thead className="" >
        <tr className="">
          <ThRank className={thClass} style={thColorStyle} onClick={handleClickRank}>Rank</ThRank>
          <ThName className={thClass} style={thColorStyle} onClick={handleClickName}>Name</ThName>
          <ThPrice className={thClass} style={thColorStyle} onClick={handleClickPrice}>Price</ThPrice>
          <ThPercent className={thClass} style={thColorStyle} onClick={handleClickChangeh1}>%(1h)</ThPercent>
          <ThPercent className={thClass} style={thColorStyle} onClick={handleClickChangeh24}>%(24h)</ThPercent>         
          <ThPercent className={thClass} style={thColorStyle} onClick={handleClickChanged7}>%(7d)</ThPercent> 
           { !props.priceSetData ? null:
          <ThChart  style={thColorStyle}> <span></span>
            </ThChart>     
}     
          <ThPercent className={thClass} style={thColorStyle} onClick={handleClickChanged30}>%(30d)</ThPercent>
          <ThPercent className={thClass} style={thColorStyle} onClick={handleClickChangeAth}>%(Ath)</ThPercent> 
          <ThNum className={thClass} style={thColorStyle} onClick={handleClickVolumeh24}>Volume</ThNum>
          <ThNum className={thClass} style={thColorStyle} onClick={handleClickMarketCap}>Market Cap</ThNum>  
          <ThSupply className={thClass} style={thColorStyle} onClick={handleClickSupply}>Circulating Supply</ThSupply>
                
 
        </tr>
      </Thead>
      
      <tbody>
    
      {
          props.coinsData.map(({rank, symbol, name, circulating_supply, quotes }, index) =>
           <CoinRow
              key={symbol}
              rank={rank}
              symbol={symbol}
              svg={ (coinsInfos.list.get(symbol.toLowerCase())) ?
                coinsInfos.list.get(symbol.toLowerCase()).svg
                : "generic.svg"
              }
              name={name}
              price={quotes[props.devise].price}
              percent_change_1h={quotes[props.devise].percent_change_1h}
              percent_change_24h={quotes[props.devise].percent_change_24h}
              percent_change_7d={quotes[props.devise].percent_change_7d}
              
              percent_change_30d={quotes[props.devise].percent_change_30d} 
  
              percent_from_price_ath={quotes[props.devise].percent_from_price_ath}
              volume_24h={quotes[props.devise].volume_24h}
              market_cap={quotes[props.devise].market_cap}            
              circulating_supply={circulating_supply} 
              priceSet={props.priceSetData[symbol.toLowerCase()][props.devise]}
              snapshotChange={props.snapshotChange[index]}
 
            />
          )
        }
      </tbody>

    </Table>
  )

}


export default withRouter(RankingCoins);