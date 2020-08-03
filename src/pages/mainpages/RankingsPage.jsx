import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import RankingCoinsPage from "./rankings/RankingCoinsPage.jsx";

/************************************
 * 
 * RankingCoinsPage
 * 
 * ******************************** */

export default function RankingsPage(props) {
    return (
        <div className="container">
            The MainPage
        
        <header>Header main page</header>
        <nav>navbar</nav>
        <div className="row">main container
            <div className="column">main
                <div>pub hori</div>
                <div>tableau
                <BrowserRouter>

            <Switch>
             <title>top100coins</title>
             <nav>navtable</nav>
              <Route exact strict path="/" component={RankingCoinsPage} />

              
            </Switch>
         
      </BrowserRouter>
                </div>
            </div>
            <div className="column">pub vertical</div>



        </div>
        </div>
    );

}