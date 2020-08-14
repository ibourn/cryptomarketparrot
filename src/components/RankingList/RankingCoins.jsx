import React, { useState, useContext } from 'react';
import { withRouter } from "react-router-dom";

import { ThemeContext } from "../ThemeToggler/ThemeContext";
import { DataContext } from "../NavBars/DataContext";
import CoinRow from "../RankingRow/CoinRow";
import styled from 'styled-components';
import { lightTheme, darkTheme } from '../../themes/Theme';


/**
 * style componenent
 */
const Table = styled.table`
font-size: 0.7rem;
@media (min-width: 1200px) {
  font-size: 1rem;
}
@media (min-width: 1100px) {
  font-size: ${props => (props.pubIsOpen ? '0.8rem' : '0.7rem')};
}
`;
const Tr = styled.tr`
`;
const Thead = styled.thead`
line-height: 2rem;
@media (max-width: 1100px) {
  line-height: 1rem; } 
`;
const Th = styled.th`
position: sticky;
top: var(--navbar--main-height);
height: 3rem;
opacity: 1;

border-style: solid none solid none;
border-width: 1px;

:hover{
  text-decoration: underline;
  cursor: pointer;
}
`;
/**
 * set width of th following viewport et vertical pub
 */
const ThRank = styled(Th)`
 text-align: left;
 min-width: 3vw;
max-width: 5vw;
`;
const ThName = styled(Th)`
text-align: left;
padding-left: 0.2rem
min-width: 6vw;
max-width: 9vw;
@media (max-width: 1100px) {
  text-align: center;
  width: ${props => (props.pubIsOpen ? '6vw' : '5vw')};  
} 
`;
const ThChart = styled(Th)`
text-align: center;
z-index: 15;
min-width: ${props => (props.pubIsOpen ? '10vw' : '15vw')};
max-width: 15vw;
@media (max-width: 1100px) {
  min-width: ${props => (props.pubIsOpen ? '8vw' : '14vw')};
max-width: 10vw;
}
`;
const ThData = styled(Th)`
text-align: right;    
`;
const ThPercent = styled(ThData)`
min-width: 3.5vw;
@media (max-width: 1100px) {
  min-width: ${props => (props.pubIsOpen ? '3vw' : '7vw')};
  } 
`;
const ThNum = styled(ThData)`
min-width: ${props => (props.pubIsOpen ? '6.5vw' : '8vw')};
@media (max-width: 1100px) {
min-width: ${props => (props.pubIsOpen ? '6.5vw' : '8vw')};
}  
`;
const ThPrice = styled(ThNum)`
min-width: ${props => (props.pubIsOpen ? '6.5vw' : '8vw')};
@media (max-width: 1100px) {
  min-width: ${props => (props.pubIsOpen ? '6.5vw' : '8vw')};
  max-width: 8vw;
   `;
const ThMarket = styled(ThNum)`
min-width: 8vw;
   `;
const ThSupply = styled(ThNum)`
min-width: 9vw;
@media (max-width: 1100px) {
  min-width: ${props => (props.pubIsOpen ? '6vw' : '6.5vw')};
  }   
   `;


/**
 * Component loading the table
 * @param {*} props 
 */
const RankingCoins = (props) => {
  const { theme } = useContext(ThemeContext);

  const { coinsInfos } = useContext(DataContext);
  const [sortSettings, setSortSettings] = useState({
    key: 'rank',
    order: 'asc'
  });


  /**
   * style and classes // color in class and dimensions in styledcomponent
   */
  const colorStyle = theme === 'light' ? {
    backgroundColor: `${lightTheme.container}`,
    color: `${lightTheme.content}`
  } : {
    backgroundColor: `${darkTheme.container}`,
      color: `${darkTheme.content}`
    }
    const thStyle = theme === 'light' ? {
      backgroundColor: `${lightTheme.container}`,
      color: `${lightTheme.content}`, borderColor: `${lightTheme.border}`
    } : {
      backgroundColor: `${darkTheme.container}`,
        color: `${darkTheme.content}`, borderColor: `${darkTheme.border}`
      }


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
    if (sortSettings.key === key) {
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

  const thClass = "";//"position-absolute sticky-top";


  //<Table className="table table-primary table-bordered"></Table>
  return (
    <Table className="container-fluid" style={colorStyle}>
      <Thead>
        <Tr >
          <ThRank className={thClass} style={thStyle} pubIsOpen={props.pubIsOpen} onClick={handleClickRank}>Rank</ThRank>
          <ThName className={thClass} style={thStyle} pubIsOpen={props.pubIsOpen} onClick={handleClickName}>Name</ThName>
          <ThPrice className={thClass} style={thStyle} pubIsOpen={props.pubIsOpen} onClick={handleClickPrice}>Price</ThPrice>
          <ThPercent className={thClass} style={thStyle} pubIsOpen={props.pubIsOpen} onClick={handleClickChangeh1}>%(1h)</ThPercent>
          <ThPercent className={thClass} style={thStyle} pubIsOpen={props.pubIsOpen} onClick={handleClickChangeh24}>%(24h)</ThPercent>
          <ThPercent className={thClass} style={thStyle} pubIsOpen={props.pubIsOpen} onClick={handleClickChanged7}>%(7d)</ThPercent>
          {!props.priceSetData ? null :
            <ThChart style={thStyle} pubIsOpen={props.pubIsOpen}>Price (7d)
            </ThChart>
          }
          <ThPercent className={thClass} style={thStyle} pubIsOpen={props.pubIsOpen} onClick={handleClickChanged30}>%(30d)</ThPercent>
          <ThPercent className={thClass} style={thStyle} pubIsOpen={props.pubIsOpen} onClick={handleClickChangeAth}>%(Ath)</ThPercent>
          <ThNum className={thClass} style={thStyle} pubIsOpen={props.pubIsOpen} onClick={handleClickVolumeh24}>Volume</ThNum>
          <ThMarket className={thClass} style={thStyle} pubIsOpen={props.pubIsOpen} onClick={handleClickMarketCap}>Market Cap</ThMarket>
          <ThSupply className={thClass} style={thStyle} pubIsOpen={props.pubIsOpen} onClick={handleClickSupply}>Circulating Supply</ThSupply>


        </Tr>
      </Thead>

      <tbody>

        {
          props.coinsData.map(({ rank, symbol, name, circulating_supply, quotes }, index) =>
            <CoinRow
              key={symbol}
              rank={rank}
              symbol={symbol}
              svg={(coinsInfos.list.get(symbol.toLowerCase())) ?
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