import React, { useState, useContext } from 'react';
//import { UserContext } from "../UserContext/UserContext";
import CoinRow from "../../components/Rows/CoinRow";
import styled from 'styled-components';


const Table = styled.table`
    font-size: 0.7rem;
    `;
const Th = styled.th`
    width: 5vw;
    :hover{
      text-decoration: underline;
      cursor: pointer;
    }
    `;
    const ThG = styled.th`
    width: 130px;
    }
    `;
export default function RankingCoins(props) {
 const [orderRank, setOrderRank] = useState('asc');
 const [orderName, setOrderName] = useState('asc');
 const [orderPrice, setOrderPrice] = useState('asc');
 const [orderMarketCap, setOrderMarketCap] = useState('asc');
 const [orderChangeh1, setOrderChangeh1] = useState('asc');
 const [orderChangeh24, setOrderChangeh24] = useState('asc');
 const [orderChanged7, setOrderChanged7] = useState('asc');
 const [orderChanged30, setOrderChanged30] = useState('asc');
 const [orderChangeAth, setOrderChangeAth] = useState('asc');
 const [orderVolumeh24, setOrderVolumeh24] = useState('asc');
 const [orderSupply, setOrderSupply] = useState('asc');





const handleClickRank = () => {
  props.handleClickSort('rank', orderRank);
  const newOrder = orderRank === 'asc' ? 'desc' : 'asc';
  setOrderRank(newOrder);
}
const handleClickName = () => {
  props.handleClickSort('name', orderName);
  const newOrder = orderName === 'asc' ? 'desc' : 'asc';
  setOrderName(newOrder);
}
const handleClickPrice = () => {
  props.handleClickSort('price', orderPrice);
  const newOrder = orderPrice === 'asc' ? 'desc' : 'asc';
  setOrderPrice(newOrder);
}
const handleClickMarketCap = () => {
  props.handleClickSort('market_cap', orderMarketCap);
  const newOrder = orderMarketCap === 'asc' ? 'desc' : 'asc';
  setOrderMarketCap(newOrder);
}
const handleClickSupply = () => {
  props.handleClickSort('circulating_supply', orderSupply);
  const newOrder = orderSupply === 'asc' ? 'desc' : 'asc';
  setOrderSupply(newOrder);
}
const handleClickChangeh1 = () => {
  props.handleClickSort('percent_change_1h', orderChangeh1);
  const newOrder = orderChangeh1 === 'asc' ? 'desc' : 'asc';
  setOrderChangeh1(newOrder);
}
const handleClickChangeh24 = () => {
  props.handleClickSort('percent_change_24h', orderChangeh24);
  const newOrder = orderChangeh24 === 'asc' ? 'desc' : 'asc';
  setOrderChangeh24(newOrder);
}
const handleClickChanged7 = () => {
  props.handleClickSort('percent_change_7d', orderChanged7);
  const newOrder = orderChanged7 === 'asc' ? 'desc' : 'asc';
  setOrderChanged7(newOrder);
}
const handleClickChanged30 = () => {
  props.handleClickSort('percent_change_30d', orderChanged30);
  const newOrder = orderChanged30 === 'asc' ? 'desc' : 'asc';
  setOrderChanged30(newOrder);
}
const handleClickChangeAth = () => {
  props.handleClickSort('percent_from_price_ath', orderChangeAth);
  const newOrder = orderChangeAth === 'asc' ? 'desc' : 'asc';
  setOrderChangeAth(newOrder);
}
const handleClickVolumeh24 = () => {
  props.handleClickSort('circulating_supply', orderVolumeh24);
  const newOrder = orderVolumeh24 === 'asc' ? 'desc' : 'asc';
  setOrderVolumeh24(newOrder);
}


  
  //const { isAuth } = useContext(UserContext);
const thClass="";//"position-absolute sticky-top";


//<Table className="table table-primary table-bordered"></Table>
  return (
    <Table >
      <thead className="" >
        <tr className="">
          <Th className={thClass} onClick={handleClickRank}>Rank</Th>
          <Th className={thClass} onClick={handleClickName}>Name/ticker</Th>
          <Th className={thClass} onClick={handleClickPrice}>Price</Th>
          <Th className={thClass} onClick={handleClickChangeh1}>%(1h)</Th>
          <Th className={thClass} onClick={handleClickChangeh24}>%(24h)</Th>         
          <Th className={thClass} onClick={handleClickChanged7}>%(7d)</Th> 
          <ThG  > <span style={{minWidth: 150}}>graph</span>
            </ThG>          
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
              svg={ (props.coinsList[symbol.toLowerCase()]) ?
                props.coinsList[symbol.toLowerCase()].svg
                : "generic.svg"
              }
              name={name}
              price={quotes['USD'].price}
              percent_change_1h={quotes["USD"].percent_change_1h}
              percent_change_24h={quotes["USD"].percent_change_24h}
              percent_change_7d={quotes["USD"].percent_change_7d}
              
              percent_change_30d={quotes["USD"].percent_change_30d} 
  
              percent_from_price_ath={quotes["USD"].percent_from_price_ath}
              volume_24h={quotes["USD"].volume_24h}
              market_cap={quotes["USD"].market_cap}            
              circulating_supply={circulating_supply} 
              priceSet={props.priceSetData[index]}
 
            />
          )
        }
      </tbody>
    </Table>
  )

}