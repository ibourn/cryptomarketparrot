import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import RankingCoins from "./../../components/Rankings/RankingCoins";
import CoinRankingNavbar from "../../components/NavBars/CoinRankingNavbar";

import { Format, Compare } from "../../modules/Utilities";
import { DataProvider } from "../../modules/DataProvider";
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

//https://api.coinpaprika.com/v1/tickers/{coin_id}/historical
//https://api.coinpaprika.com/v1/tickers/btc-bitcoin/historical?start=2020-08-01&interval=6h

// const formatPrice = price => parseFloat(Number(price).toFixed(4));

// function compareByKey(key, order = 'asc') {
//   return function compare(a, b) {
//       let comparison = a[key] == b[key] ? 0 : a[key] > b[key] ? 1 : -1;
//       return (
//         (order === 'desc') ? (comparison * -1) : comparison
//       );
//     };
//   }

//PAS SURE RECEPTION TIMING POUR SUITE
//const p = async () => {return await DataProvider.getCoinList();};




export default function RankingsPage(props) {
  const [coinsData, setCoinsData] = useState([]);
  const [coinsList, setCoinsList] = useState([]);


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

        //EQUIVALENT og compnentwillunmount => clear the interval
        return () => clearInterval(interval);*/
      });



      const componentDidMount = async () => {
        //const response = await axios.get(coinsTickers);
        const coinsList = await DataProvider.getCoinList();

    
const response = await  DataProvider.getCoinsData();

        response.data.sort(Compare.byKey('rank', 'asc'));
       
       
        const newCoinsData = response.data.slice(0, COIN_COUNT);

          //otbenir les donnees OHCL pour les mini graph
          //100 coins / page => 6 apple possible => 1/10sec
          //afin de ne pas bloquer si autre suivant => 2/min => timer 30sec


       
          setCoinsList(coinsList);
    
        setCoinsData(newCoinsData);
       
      }


const handleClickSort = async (key, order) => {
  const response = await  DataProvider.getCoinsData();

  switch(key) {
    case 'rank':
    case 'name':
    case 'circulating_supply':
      response.data.sort(Compare.byKey(key, order));
      break;
    default:
      response.data.sort(Compare.quotesByKey(key, order));
      break;
  }  
        const newCoinsData = response.data.slice(0, COIN_COUNT);
    
        setCoinsData(newCoinsData);
}






//                    <Route exact strict path="/" component={RankingCoins} />


{ console.log(coinsList,"\n\n\nREADY")};
    return (
     
        <div className="tableContainer container">

            <h1>top100coins</h1>
            <CoinRankingNavbar />
            <BrowserRouter>

                <Switch>

                    <Route exact strict path="/">
                    <RankingCoins coinsData={coinsData} coinsList={coinsList} handleClickSort={handleClickSort}/>
                        </Route> 


                </Switch>

            </BrowserRouter>
        </div>




    );

}