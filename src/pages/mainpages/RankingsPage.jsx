import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import RankingCoins from "./../../components/Rankings/RankingCoins";

/************************************
 * 
 * RankingCoinsPage
 * 
 * ******************************** */

export default function RankingsPage(props) {
    return (
        <div className="container">
            Ttableau
                <title>top100coins</title>
             <nav>navtable</nav>
                <BrowserRouter>

            <Switch>
           
              <Route exact strict path="/" component={RankingCoins} />

              
            </Switch>
         
      </BrowserRouter>
                </div>
            
    );

}