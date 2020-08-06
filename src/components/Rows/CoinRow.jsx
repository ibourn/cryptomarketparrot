import React from 'react';
import styled from 'styled-components';


/************************************
 * 
 * Coins row in ranking
 * 
 * ******************************** */

const Td = styled.td`
    width: 2vw;
    `;

export default function CoinRow(props) {
    console.log(props);

    function getAvailableIcon() {
        try {
            var foo = require(`../../assets/coloredsvg/${props.svg}`);
            return foo;
        }
        catch (e) {
            if (e instanceof Error && e.code === "MODULE_NOT_FOUND"){
                return require('../../assets/coloredsvg/generic.svg');
             } else{
                throw e;}
        }
    }
    const icon = getAvailableIcon();
    
    return (
        <>
        <tr>
                        <Td>{props.rank}</Td> 
            <Td> 
                <span><img src={icon} alt={props.symbol} width={"15px"}/></span>
                <span>{props.name}</span>
            </Td>  
            <Td>{props.price}</Td> 
            <Td>{props.percent_change_1h}</Td> 
            <Td>{props.percent_change_24h}</Td> 
            <Td>{props.percent_change_7d}</Td> 
            <Td>?</Td> 
            <Td>{props.percent_change_30d}</Td> 

            <Td>{props.percent_from_price_ath}</Td> 
            <Td>{props.volume_24h}</Td>  
            <Td>{props.market_cap}</Td>          
            <Td>{props.circulating_supply}</Td> 
           
 
        </tr>
        {/* // <Route path="/coin/:id" component={CoinPage} /> */}
    </>
    );

}