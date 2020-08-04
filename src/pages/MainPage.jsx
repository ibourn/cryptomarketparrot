import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import MainPageHeader from "../components/Headers/MainPageHeader"
import MainPageNavBar from "../components/NavBars/MainPageNavBar"
import RankingsPage from "./mainpages/RankingsPage";
import HorzPubBanner from "../components/Banners/HorizontalPubBanner";
import VertPubBanner from "../components/Banners/VerticalPubBanner";

/************************************
 * 
 * MainPage
 * 
 * ******************************** */

export default function MainPage(props) {
    return (
        <div className="globalContainer container-fluid">


            <MainPageHeader />
            <MainPageNavBar />
            <div className="row no-gutters">
                <div className="colMainPage col-10 ">
                <HorzPubBanner/>
                    <div>
                <BrowserRouter>

                            <Switch>

                                <Route exact strict path="/" component={RankingsPage} />


                            </Switch>

                        </BrowserRouter>
                    </div>
                </div>
                <div className="col-2">
                <VertPubBanner/>
                </div>

            </div>
        </div>
    );

}