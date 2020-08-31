import React, { useState, useContext, useEffect } from 'react';
import { Switch, Route, useParams } from 'react-router-dom';
import { DataContext } from "../components/NavBars/DataContext";
import { DataProvider } from "../modules/DataProvider";

import MainPageHeader from "../components/Headers/MainPageHeader"
import MainPageNavBar from "../components/NavBars/MainPageNavBar"
import RankingsPage from "./mainpages/RankingsPage";
import CoinsPage from "./mainpages/CoinsPage";
import About from './About';
import Loader from "../components/Loader/Loader";

import HorzPubBanner from "../components/Banners/HorizontalPubBanner";
import VertPubBanner from "../components/Banners/VerticalPubBanner";

import { useClose } from "../components/Banners/useClose";



/************************************
 * 
 * MainPage
 * 
 * ******************************** */
export default function MainPage(props) {
    // const [isOpened, setIsOpened] = useState(true);
    const { id } = useParams();

    const { coinsInfos, setCoinsInfos } = useContext(DataContext);
    const [showBanner, closeBanner] = useClose(true);
    const [lastUpdateTime, setLastUpdateTime] = useState();

    /*class used to resize the content if vetical pub banner is closed*/
    const colMainClass = "colMainPage" + (showBanner ? " col-10" : " col-12");
    const colPubClass = (showBanner ? " col-2" : " col-0");
    /*waiting while fetching data*/
    const loading = coinsInfos.list.length === 0 ?
        <div className="container"> <Loader /> </div> : "";


    useEffect(() => {
        if (coinsInfos.list.length === 0) {
            fetchCoinsList();
        }
    })

    /*Called from MainPageInfoBanner and RankingCoins */
    const refreshUpdateTime = (newUpdateTime) => {
        setLastUpdateTime(newUpdateTime)
    };


    const fetchCoinsList = async () => {
        const dictionary = [];

        await DataProvider.getCoinList().then((datas) => {
            for (const val of datas.values()) {
                dictionary.push(val.name.toLowerCase() + " " + val.symbol.toLowerCase());
            }

            setCoinsInfos(() => {
                const infos = {
                    dictionary: dictionary,
                    list: datas
                }
                return infos;
            });

        });
    }


    return (
        <div className="globalContainer container-fluid">

            <MainPageHeader lastUpdateTime={lastUpdateTime} refreshUpdateTime={refreshUpdateTime} />
            <MainPageNavBar />
            <div className="row no-gutters">
                <div className={colMainClass}>
                    <HorzPubBanner />
                    <div>
                        {loading === "" ?

                            <Switch>

                                <Route exact strict path="(/|/cryptomarketparrot)(/|)" >
                                    <RankingsPage pubIsOpen={showBanner} lastUpdateTime={lastUpdateTime} refreshUpdateTime={refreshUpdateTime} />
                                </Route>

                                <Route path="/coin/:id/:type" >
                                    <CoinsPage coin={id} />
                                </Route>
                                <Route path="/coin/:id/chart" >
                                    <CoinsPage coin={id} />
                                </Route>
                                <Route path="/about" component={About} />
                            </Switch>

                            : loading}
                    </div>
                </div>
                <div className={colPubClass}>
                    <VertPubBanner closeBanner={closeBanner} showBanner={showBanner} />
                </div>

            </div>
        </div>

    );

}