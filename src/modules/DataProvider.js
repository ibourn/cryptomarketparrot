import React from 'react';
import axios from 'axios';
import { Time } from './Utilities';

 /**
  * 
  * QTITY PARAMs
  * 
  * */
const DISPLAY_COINS_PER_PAGE = 50;//100;
const REQUESTED_COINS_PER_PAGE = 250;
const REQUESTED_PAGE = 30;

 /**
  * 
  * URLS COINPAPRIKA // limits : 600req/min
  * 
  * used for more requests
  * 
  * */
const PAPRIKA_BASEURL = 'https://api.coinpaprika.com/v1';
const PAPRIKA_ENDPOINT_COINS = '/coins'; //liste coin
const PAPRIKA_ENDPOINT_TICKERS = '/tickers'; //quotes.usd => all coin now
//+ coin_id => specifique
const PAPRIKA_OPTION_OHLCV = '/ohlcv';
const PAPRIKA_OPTION_HISTO = '/historical'; //need start
const PAPRIKA_PARAM_START = 'start='; //2020-08-01
const PAPRIKA_PARAM_INTERVAL = 'interval=';
const PAPRIKA_PARAM_QUOTE = 'quote=';
const paprikaIntervals = ['5m', '15m', '30m', '1h', '6h', '12h', '24h', '7d', '30d', '365d'];
const paprikaQuotes = ['USD', 'BTC'];

/**
  * 
  * URLS COINGECKO // limits : 100req/min
  * 
  * used for fewer requests
  * 
  * */
// https://api.coingecko.com/api/v3/coins/list
 const GECKO_BASEURL = 'https://api.coingecko.com/api/v3';
 const GECKO_ENDPOINT_COINS = '/coins';
 const GECKO_OPTION_LIST = '/list';
 const GECKO_OPTION_MARKET_CHART = '/market_chart';
 const GECKO_PARAM_VSCUR = 'vs_currency=';
 const GECKO_PARAM_START = 'days=';
 //https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7

//const GECKO_URL_BASE_CURRENCY = 'https://api.coingecko.com/api/v3/simple/supported_vs_currencies';
/*[
  "btc",
  "eth",
  "ltc",*/
// list coins https://api.coingecko.com/api/v3/coins/list
/*[
  {
    "id": "01coin",
    "symbol": "zoc",
    "name": "01coin"
  },]*/

//const coinsUrl = 'https://api.coinpaprika.com/v1/coins';
//const tickerUrl = 'https://api.coinpaprika.com/v1/tickers/';

//const coinsTickers = "https://api.coinpaprika.com/v1/tickers";//{coin_id}

//https://api.coinpaprika.com/v1/tickers/{coin_id}/historical
//https://api.coinpaprika.com/v1/tickers/btc-bitcoin/historical?start=2020-08-01&interval=6h

 function buildUrl(base, endpoint) {
  return base + endpoint;
}
function buildCoinsListPaprikaUrl(){
  return PAPRIKA_BASEURL + PAPRIKA_ENDPOINT_COINS;
}
function buildTickersListPaprikaUrl(){
  return PAPRIKA_BASEURL + PAPRIKA_ENDPOINT_TICKERS;
}
function buildPricesSetPaprikaUrl(coinId, days){
  let url ="";
  if(days > 0){
  url = PAPRIKA_BASEURL + PAPRIKA_ENDPOINT_TICKERS + "/" + coinId + 
  PAPRIKA_OPTION_HISTO + "?" +
  PAPRIKA_PARAM_START + Time.getPastDateByDay(days) + "&" +
  PAPRIKA_PARAM_INTERVAL + "12h";
} /*else {
  url = BASE_URL + COIN_ENDPOINT + coinId + OPTION_TODAY;
}*/
  return url;
}
function buildCoinsListGeckoUrl(){
  return GECKO_BASEURL + GECKO_ENDPOINT_COINS + GECKO_OPTION_LIST;
}
function buildPricesSetGeckoUrl(coinId, days){
  let url ="";
  if(days > 0){
  url = GECKO_BASEURL + GECKO_ENDPOINT_COINS + "/" + coinId + 
  GECKO_OPTION_MARKET_CHART + "?" +
  GECKO_PARAM_VSCUR + "usd" + "&" +
  GECKO_PARAM_START + "7";
}
return url;
}


//export default async function DataProvider() {

 export var DataProvider =  {

    /**
     * Create a map : id => {identity infos}, where id is lowercapped symbol
     * to have :
     * id for coinpaprika and coingecko and url of the icon
     * 
     * TODO : rank shouldn't be there as it can change during display
     * 
     * 
     */
    getCoinList : async () => {
            let coinList = new Map();
            /* GET ID AND INFOS FROM COINAPRIKA */
            const responseP =  await axios.get(buildCoinsListPaprikaUrl());

            

            responseP.data.forEach((coin) => {
                let key = coin.symbol.toLowerCase();
               // coinList[key] = {
                coinList.set(key, {
                    paprika_id: coin.id,
                    gecko_id: "",
                    name: coin.name,
                    symbol: coin.symbol,
                    rank: coin.rank,
                    is_new: coin.is_new,
                    is_active: coin.is_active,
                    type: coin.type,
                    svg: key + ".svg"
                });
             });
            /* GET ID AND INFOS FROM COINGEKO */
            const responseC = await axios.get(buildCoinsListGeckoUrl());

            DataProvider.testgek+=1;
            console.log(DataProvider.testgek, "appel gek");
            

            /* SET COINGECKO ID IN THE MAP */
            responseC.data.forEach((coin) => {
                console.log(coin);
                if (coinList.get(coin.symbol)) {
                  const newset = coinList.get(coin.symbol);
                  newset.gecko_id = coin.id;
                  coinList.set(coin.symbol,newset);}
                  console.log(coin);
                  console.log(coinList[coin.symbol]);
            });
            return coinList;
    },
   
    /**
     * 
     * Get the coins data (for top N display)
     * 
     */
    getCoinsData : async () => {
      return await axios.get(buildTickersListPaprikaUrl());
    },
      
   /**
     * 
     * Get the coin prices for 7 last days to draw te mini graph
     * 
     */
    getCoinsPriceSetD7 : async (id) => {
      return await axios.get(buildPricesSetPaprikaUrl(id, 7));
    },
    getCoinsPriceSetGecko : async (id) => {
      console.log(id, buildPricesSetGeckoUrl(id, 7));
      return await axios.get(buildPricesSetGeckoUrl(id, 7));
    }

  }

 