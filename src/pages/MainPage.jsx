import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import RankingsPage from "./mainpages/RankingsPage.jsx";

/************************************
 * 
 * MainPage
 * 
 * ******************************** */

export default function MainPage(props) {
    return (
        <div className="container">
            The MainPage
        
        <header>Header main page</header>
        <nav>navbar</nav>
        <div className="row">main container
            <div className="column">main column
                <div>pub horizontal</div>
                <div>tableau
                <BrowserRouter>

            <Switch>
             
              <Route exact strict path="/" component={RankingsPage} />

              
            </Switch>
         
      </BrowserRouter>
                </div>
            </div>
            <div className="column">pub vertical</div>



        </div>
        </div>
    );

}