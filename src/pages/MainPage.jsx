import React, {useState, useContext} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { DataContext } from "../components/NavBars/DataContext";
import MainPageHeader from "../components/Headers/MainPageHeader"
import MainPageNavBar from "../components/NavBars/MainPageNavBar"
import RankingsPage from "./mainpages/RankingsPage";
import CoinsPage from "./mainpages/CoinsPage";

import HorzPubBanner from "../components/Banners/HorizontalPubBanner";
import VertPubBanner from "../components/Banners/VerticalPubBanner";

/************************************
 * 
 * MainPage
 * 
 * ******************************** */

export default function MainPage(props) {
    const [isOpened, setIsOpened] = useState(true);

  //  const { coinsInfos, setCoinsInfos } = useContext(DataContext);
   /* const [coinsInfos, setCoinsInfos] = useState({
        dictionary: [],
        list:[]}
        );*/

   /* const loadCoinsInfos = (dico, list) => {
        setCoinsInfos({
            dictionary: dico, 
            coinsList: list
        });
        console.log(dico, "dico from main page");
    }*/

    /*
    * function passed to Pub compenent, thus the bannercloser can forward 
    * the change to set the corresonpding col class
    */
    const closePub = () => {
        setIsOpened(false);
    }
    const colMainClass = "colMainPage" + (isOpened ? " col-10" : " col-12");
    const colPubClass =  (isOpened ? " col-2" : " col-0");

    //                                <Route exact strict path="/" component={RankingsPage} />

   // console.log(coinsInfos.dictionary, "dico from main page avant render");
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

                                <Route exact strict path="/" 
                                component={RankingsPage}  />
                                
                                <Route exact  path="/coin/:id" >
                                <CoinsPage  />
                                </Route>

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