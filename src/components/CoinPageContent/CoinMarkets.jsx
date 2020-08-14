import React, { useContext } from 'react';

import { Format } from '../../modules/Utilities';

import { ThemeContext } from "../ThemeToggler/ThemeContext";
import { lightTheme, darkTheme } from '../../themes/Theme';
import styled from 'styled-components';



const Table = styled.table`
 text-align: left;
 font-size: 0.9rem;
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
const TdName = styled.td`
font-weight: bold;
`

/************************************
 * 
 * CoinMarkets page
 * 
 * ******************************** */
export default function CoinMarkets(props) {
    const { theme } = useContext(ThemeContext);

    const colorStyle = theme === 'light' ? { backgroundColor: `${lightTheme.container}`,
    color: `${lightTheme.content}` } :{ backgroundColor: `${darkTheme.container}`,
    color: `${darkTheme.content}` }
    

    return (
        <section className="row">
            <Table className="table container p-0 m-0 table-light table-bordered"
            style={colorStyle}>
                <thead>
                    <tr>
                        <Th style={colorStyle}>
                            Exchange
                       </Th>
                        <Th style={colorStyle}>
                            Pair
                       </Th>
                        <Th style={colorStyle}>
                            Price
                       </Th>
                        <Th style={colorStyle}>
                            Confidence
                       </Th>
                        <Th style={colorStyle}>
                            Volume (24h)
                       </Th>
                        <Th style={colorStyle}>
                            Category
                      </Th>
                    </tr>
                </thead>
                <tbody>
                    {

                        props.coinMarkets.map((data, index) => {
                            return (<tr key={index}>
                                <TdName>
                                    <a href={data.market_url ? data.market_url : ""} 
                                    style={colorStyle}>
                                        {data.exchange_name}
                                    </a>
                                </TdName>
                                <td>
                                    {data.pair}
                                </td>
                                <td>
                                    {Format.toCurrencyNDigits(data.quotes["USD"].price,'USD',8)}
                                </td>
                                <td>
                                    {data.trust_score}
                                </td>
                                <td>
                                    {Format.toCurrencyNDigits(data.quotes["USD"].volume_24h,'USD',5)}
                                </td>

                                <td>
                                    {data.category}
                                </td>

                            </tr>)

                        })

                    }
                </tbody>
            </Table>

        </section>


    )

}