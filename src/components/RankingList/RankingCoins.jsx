import React, { useState, useContext } from 'react';
import {  withRouter } from "react-router-dom";

import { ThemeContext } from "../ThemeToggler/ThemeContext";
import { DataContext } from "../NavBars/DataContext";
import CoinRow from "../RankingRow/CoinRow";
import styled from 'styled-components';
import { lightTheme, darkTheme } from '../../themes/Theme';


const Table = styled.table`
    font-size: 0.7rem;

    `;
const Th = styled.th`
    width: 5vw;
    position: sticky;
    top: var(--mainnav-height);
    background-color: red;
    opacity: 1;
    :hover{
      text-decoration: underline;
      cursor: pointer;
    }
    `;
    const ThG = styled.th`
    width: 130px;
    }
    `;
const RankingCoins = (props) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const { coinsInfos, setCoinsInfos } = useContext(DataContext);
 const [sortSettings, setSortSettings] = useState({
   key: 'rank',
   order: 'asc'
 });


 const themeColor = theme === 'light' ? 'black' : 'white';
 const thStyle = theme === 'light' ? {backgroundColor: `${lightTheme.body}`} : {backgroundColor: `${darkTheme.body}`}


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
    <Table >
      <thead className="" >
        <tr className="">
          <Th className={thClass} style={thStyle} onClick={handleClickRank}>Rank</Th>
          <Th className={thClass} style={thStyle} onClick={handleClickName}>Name/ticker</Th>
          <Th className={thClass} onClick={handleClickPrice}>Price</Th>
          <Th className={thClass} onClick={handleClickChangeh1}>%(1h)</Th>
          <Th className={thClass} onClick={handleClickChangeh24}>%(24h)</Th>         
          <Th className={thClass} onClick={handleClickChanged7}>%(7d)</Th> 
           { !props.priceSetData ? null:
          <ThG  > <span style={{minWidth: 150}}>graph</span>
            </ThG>     
}     
          <Th className={thClass} onClick={handleClickChanged30}>%(30d)</Th>
          <Th className={thClass} onClick={handleClickChangeAth}>% from ATh</Th> 
          <Th className={thClass} onClick={handleClickVolumeh24}>Volume</Th>
          <Th className={thClass} onClick={handleClickMarketCap}>Market Cap</Th>  
          <Th className={thClass} onClick={handleClickSupply}>Circulating Supply</Th>
                
 
        </tr>
      </thead>
      
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