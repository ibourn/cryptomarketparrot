import React, { useContext } from 'react';
//import { UserContext } from "../UserContext/UserContext";
import CoinRow from "../../components/Rows/CoinRow";
import styled from 'styled-components';


const Table = styled.table`
    font-size: 1rem;
    `;

export default function RankingCoins(props) {













  
  //const { isAuth } = useContext(UserContext);
const thClass="";//"position-absolute sticky-top";
  return (
    <table className="table table-primary table-bordered">
      
      <thead className="" >
        <tr className="">
          <th className={thClass}>Rank</th>
          <th className={thClass}>Name</th>
          <th className={thClass}>Market Price</th>
          <th className={thClass}>Price</th>
          <th className={thClass}>Volume (24h)</th>
          <th className={thClass}>Circulating Supply</th>
          <th className={thClass}>Change (24h)</th>
          <th className={thClass}>Price Graph (7d)</th>
        </tr>
        
      </thead>
      
      <tbody>
    
      {
          props.coinsData.map(({ id, name, symbol, rank }) =>
            <CoinRow
              key={id}
              id={id}
              name={name}
             
              symbol={symbol}
              rank={rank}
             
            />
          )
        }
      </tbody>
    </table>
  )

}