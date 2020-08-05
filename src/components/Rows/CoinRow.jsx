import React from 'react';

/************************************
 * 
 * Coins row in ranking
 * 
 * ******************************** */

export default function CoinRow(props) {
    return (
        <>
        <tr>
        <td>{props.id}</td> 
            <td>{props.name}</td> 
            <td>{props.symbol}</td>  
            <td>{props.rank}</td> 
        </tr>
        {/* // <Route path="/coin/:id" component={CoinPage} /> */}
    </>
    );

}