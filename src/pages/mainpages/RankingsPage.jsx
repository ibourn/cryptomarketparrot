import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import RankingCoins from "./../../components/Rankings/RankingCoins";
import CoinRankingNavbar from "../../components/NavBars/CoinRankingNavbar";

/************************************
 * 
 * RankingCoinsPage
 * 
 * ******************************** */

export default function RankingsPage(props) {
    return (
        <div className="tableContainer container">

            <h1>top100coins</h1>
            <CoinRankingNavbar />
            <BrowserRouter>

                <Switch>

                    <Route exact strict path="/" component={RankingCoins} />


                </Switch>

            </BrowserRouter>
        </div>

    );

}