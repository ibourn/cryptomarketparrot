import React, {useState} from 'react';
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
    const [isOpened, setIsOpened] = useState(true);

    /*
    * function passed to Pub compenent, thus the bannercloser can forward 
    * the change to set the corresonpding col class
    */
    const closePub = () => {
        setIsOpened(false);
    }
    const colMainClass = "colMainPage" + (isOpened ? " col-10" : " col-12");
    const colPubClass =  (isOpened ? " col-2" : " col-0");

    return (
        <div className="globalContainer container-fluid">


            <MainPageHeader />
            <MainPageNavBar />
            <div className="row no-gutters">
                <div className={colMainClass}>
                <HorzPubBanner/>
                    <div>
                <BrowserRouter>

                            <Switch>

                                <Route exact strict path="/" component={RankingsPage} />


                            </Switch>

                        </BrowserRouter>
                    </div>
                </div>
                <div className={colPubClass}>
                <VertPubBanner closePub={closePub}/>
                </div>

            </div>
        </div>
    );

}