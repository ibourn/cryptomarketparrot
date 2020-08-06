import React, { useContext } from 'react';
//import { UserContext } from "../UserContext/UserContext";
import CoinRow from "../../components/Rows/CoinRow";
import styled from 'styled-components';


const Table = styled.table`
    font-size: 0.6rem;
    `;
const Th = styled.th`
    width: 1vw;
    `;
export default function RankingCoins(props) {













  
  //const { isAuth } = useContext(UserContext);
const thClass="";//"position-absolute sticky-top";


console.log(props.coinsList,"\n\n\n\n\n\n\nICICICCICI\n\n\ICICICIICI");




  return (
    <Table className="table table-primary table-bordered">
      
      <thead className="" >
        <tr className="">
          <Th className={thClass}>Rank</Th>
          <Th className={thClass}>Name/ticker</Th>
          <Th className={thClass}>Price</Th>
          <Th className={thClass}>%(1h)</Th>
          <Th className={thClass}>%(24h)</Th>         
          <Th className={thClass}>%(7d)</Th> 
          <Th className={thClass}>evolution graph</Th>          
          <Th className={thClass}>%(30d)</Th>
          <Th className={thClass}>% from ATh</Th> 
          <Th className={thClass}>Volume</Th>
          <Th className={thClass}>Market Cap</Th>  
          <Th className={thClass}>Circulating Supply</Th>
                
 
        </tr>
      </thead>
      
      <tbody>
    
      {
          props.coinsData.map(({rank, symbol, name, circulating_supply, quotes }) =>
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
                 
 
            />
          )
        }
      </tbody>
    </Table>
  )

}