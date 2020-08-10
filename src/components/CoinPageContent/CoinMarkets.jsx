import React from 'react';
import { useHistory, useParams, Link, NavLink } from "react-router-dom";


/************************************
 * 
 * CoinMarkets page
 * 
 * ******************************** */
export default function CoinMarkets(props) {


    return (
        <div className="row">

            <table>
                <thead>
                    <tr>
                        <th>
                            Exchange
                       </th>
                        <th>
                            Pair
                       </th>
                        <th>
                            Price
                       </th>
                        <th>
                            Confidence
                       </th>
                        <th>
                            Volume (24h)
                       </th>
                        <th>
                            Category
                      </th>
                    </tr>
                </thead>
                <tbody>
                    {

                        props.coinMarkets.map((data) => {
                            return (<tr>
                                <td>
                                    <Link to={data.market_url}>
                                        {data.exchange_name}
                                    </Link>
                                </td>
                                <td>
                                    {data.pair}
                                </td>
                                <td>
                                    {data.quotes["USD"].price}
                                </td>
                                <td>
                                    {data.trust_score}
                                </td>
                                <td>
                                    {data.quotes["USD"].volume_24h}
                                </td>

                                <td>
                                    {data.category}
                                </td>

                            </tr>)

                        })

                    }
                </tbody>
            </table>

        </div>


    )

}