import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import RankingCoins from "./../../components/Rankings/RankingCoins";
import CoinRankingNavbar from "../../components/NavBars/CoinRankingNavbar";

import axios from 'axios';



/************************************
 * 
 * RankingCoinsPage
 * 
 * ******************************** */

const COIN_COUNT = 100;
const coinsUrl = 'https://api.coinpaprika.com/v1/coins';
const tickerUrl = 'https://api.coinpaprika.com/v1/tickers/';

const coinsTickers = "https://api.coinpaprika.com/v1/tickers";//{coin_id}

const formatPrice = price => parseFloat(Number(price).toFixed(4));


export default function RankingsPage(props) {

    const [coinsData, setCoinsData] = useState([]);



    useEffect(function () {
        if (coinsData.length === 0) {
          // component did mount
          componentDidMount();
    
        } else {
          //component did update
        }
        /*Timer for AutoRefresh, TODO cleaner elseif
        let interval = null;
        if (isAutoRefresh) {
          interval = setInterval(() => {
              autoRefresh();
          }, 20000);
        } else if (!isAutoRefresh) {
          clearInterval(interval);
        }
        return () => clearInterval(interval);*/
      });


function compareByKey(key, order = 'asc') {
    return function compare(a, b) {
        let comparison = a[key] == b[key] ? 0 : a[key] > b[key] ? 1 : -1;
        return (
          (order === 'desc') ? (comparison * -1) : comparison
        );
      };
    }

      const componentDidMount = async () => {
        const response = await axios.get(coinsTickers);
    
        response.data.sort(compareByKey('rank', 'asc'));
       
       
        const coinsList = response.data.slice(0, COIN_COUNT);


     
    
        setCoinsData(coinsList);
      }









//                    <Route exact strict path="/" component={RankingCoins} />



    return (
        <div className="tableContainer container">

            <h1>top100coins</h1>
            <CoinRankingNavbar />
            <BrowserRouter>

                <Switch>

                    <Route exact strict path="/">
                    <RankingCoins coinsData={coinsData}/>
                        </Route> 


                </Switch>

            </BrowserRouter>
        </div>




    );

}