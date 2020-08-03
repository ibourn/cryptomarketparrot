import React, { useContext } from 'react';
//import { UserContext } from "../UserContext/UserContext";
import CoinRow from "../../components/Rows/CoinRow";
import styled from 'styled-components';


const Table = styled.table`
    font-size: 1rem;
    `;

export default function RankingCoins(props) {
  //const { isAuth } = useContext(UserContext);

  return (
    <Table className="table table-primary table-bordered">
      <thead>
        <tr>
          <th>Name</th>
          <th>Ticker</th>
          <th>Balance</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
      <CoinRow></CoinRow>
    
        
      </tbody>
    </Table>
  )

}