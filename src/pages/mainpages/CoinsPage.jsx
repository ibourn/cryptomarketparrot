import React, { useState, useContext, useEffect } from 'react';
import { Route, Switch, withRouter, useParams } from "react-router-dom";

import { DataProvider } from "../../modules/DataProvider";
import { DataContext } from "../../components/NavBars/DataContext";


import CoinPageHeader from '../../components/Headers/CoinPageHeader';
import CoinPageNavBar from '../../components/NavBars/CoinPageNavBar';
import CoinAbout from '../../components/CoinPageContent/CoinAbout';
import CoinChart from '../../components/CoinPageContent/CoinChart';
import CoinMarkets from '../../components/CoinPageContent/CoinMarkets';
import CoinMedias from '../../components/CoinPageContent/CoinMedias';
import Loader from "../../components/Loader/Loader";

/************************************
 * 
 * CoinsPage
 * 
 * ******************************** */

const CoinsPage = () => {
    const { id } = useParams()
    const [coinInfo, setCoinInfo] = useState([]);
    const [coinTwitter, setCoinTwitter] = useState([]);
    const [coinEvents, setCoinEvents] = useState([]);
    const [coinMarkets, setCoinMarkets] = useState([]);
    const [loading, setLoading] = useState(true);
    const { coinsInfos } = useContext(DataContext);

    const id_tview = id.toUpperCase() + "USD";

    const id_paprika = coinsInfos.list.get(id).paprika_id;
    const id_gecko = coinsInfos.list.get(id).gecko_id;


    useEffect(() => {
        if(loading){
        fetchCoinData();
       }
    });

    function fetchCoinData() {

        const testData = (coinInfo !== undefined) ? [] : coinInfo;
        if (testData.length === 0) {

            let respInfos = DataProvider.getCoinInfoGecko(id_gecko);
            let respTwitter = DataProvider.getCoinTwitterPaprika(id_paprika);
            let respEvents = DataProvider.getCoinEventsPaprika(id_paprika);
            let respMarkets = DataProvider.getCoinMarketsPaprika(id_paprika);

            Promise.all([respInfos, respTwitter, respEvents, respMarkets]).then((responses) => {
                setCoinInfo(responses[0].data);
                setCoinTwitter(responses[1].data);
                setCoinEvents(responses[2].data);
                setCoinMarkets(responses[3].data);
            });
            setLoading(false);
        }
    }

    return (
        <>
            {coinInfo === undefined ? <div className="container">

                <Loader />
            </div> : coinInfo.length === 0 ? <div className="container">

                <Loader />
            </div> :
                    <div className="container">
                        <CoinPageHeader coinInfo={coinInfo} coin={coinsInfos.list.get(id)} />
                        <CoinPageNavBar coin={id} />


                        <Switch>
                            <Route exact path={`/coin/${id}/about`}>
                                <CoinAbout coinInfo={coinInfo} coinEvents={coinEvents} ident={coinsInfos.list.get(id)} />
                            </Route>
                            <Route exact path={`/coin/${id}/chart`}>
                                <CoinChart coin={id_tview} />
                            </Route>
                            <Route exact path={`/coin/${id}/medias`}>
                                <CoinMedias coinTwitter={coinTwitter} coinsInfos={coinsInfos} coin={id} />
                            </Route>
                            <Route exact path={`(/coin/${id})(/markets)`}>
                                <CoinMarkets coinMarkets={coinMarkets} />
                            </Route>

                        </Switch>
                    </div>
            }
        </>
    );

}

export default withRouter(CoinsPage);