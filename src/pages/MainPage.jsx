import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import MainPageHeader from "../components/Headers/MainPageHeader.jsx"
import RankingsPage from "./mainpages/RankingsPage.jsx";

/************************************
 * 
 * MainPage
 * 
 * ******************************** */

export default function MainPage(props) {
    return (
        <div className="globalContainer container-fluid">


            <MainPageHeader />
            <nav>navbar</nav>
            <div className="row no-gutters">
                <div className="colMainPage col-10 ">main column
                <div className="rowPub">pub horizontal</div>
                    <div>tableau
                <BrowserRouter>

                            <Switch>

                                <Route exact strict path="/" component={RankingsPage} />


                            </Switch>

                        </BrowserRouter>
                    </div>
                </div>
                <div className="colPub col-2">pub vertical</div>



            </div>
        </div>
    );

}