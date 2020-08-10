import React from 'react';
import { Link } from "react-router-dom";


/************************************
 * 
 * CoinMedias page
 * 
 * @ integrate cointelegraph widget
 * 
 * ******************************** */
export default function CoinMedias(props) {


    return (
        <section className="row">

            <ul> From Twitter :
{
                    props.coinTwitter.map(res => {
                        return (
                            <li key={res.status_id}>
                                <Link to={res.status_link}>{res.status}
                                </Link>
                            </li>
                        )
                    })

                }
            </ul>
        </section>


    )

}