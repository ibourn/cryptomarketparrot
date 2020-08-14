import axios from 'axios';
import { Time } from './Utilities';


/**
 * 
 * MODULE TO MANAGE URLS AND API CALLS
 * 
 */

 /**
  * 
  * QTITY PARAMs
  * 
  * */
// const DISPLAY_COINS_PER_PAGE = 50;//100;
// const REQUESTED_COINS_PER_PAGE = 250;
// const REQUESTED_PAGE = 30;

/**
 * STATUS
 */
// const HISTO_STATUS_GECKO = 200;
// const HISTO_STATUS_PAPRIKA = 200;
 /**
  * 
  * URLS COINPAPRIKA // limits : 600req/min OR 10/sec
  * 
  * used for more requests
  * 
  * */
const PAPRIKA_BASEURL = 'https://api.coinpaprika.com/v1';
const PAPRIKA_ENDPOINT_COINS = '/coins'; 
const PAPRIKA_ENDPOINT_TICKERS = '/tickers'; 
const PAPRIKA_ENDPOINT_GLOBAL = '/global';

// const PAPRIKA_OPTION_OHLCV = '/ohlcv';
const PAPRIKA_OPTION_HISTO = '/historical'; 
const PAPRIKA_OPTION_TWITTER = '/twitter'; 
const PAPRIKA_OPTION_EVENTS = '/events'; 
const PAPRIKA_OPTION_MARKETS = '/markets'; 
const PAPRIKA_PARAM_START = 'start='; 
const PAPRIKA_PARAM_INTERVAL = 'interval=';
const PAPRIKA_PARAM_QUOTE = 'quotes=';
//const paprikaIntervals = ['5m', '15m', '30m', '1h', '6h', '12h', '24h', '7d', '30d', '365d'];
//const paprikaQuotes = ['USD', 'BTC'];

/**
  * 
  * URLS COINGECKO // limits : 100req/min
  * 
  * used for fewer requests
  * 
  * */
 const GECKO_BASEURL = 'https://api.coingecko.com/api/v3';
 const GECKO_ENDPOINT_COINS = '/coins';
 const GECKO_ENDPOINT_GLOBAL = '/global';
 const GECKO_OPTION_LIST = '/list';
 const GECKO_OPTION_MARKET_CHART = '/market_chart';
 const GECKO_PARAM_VSCUR = 'vs_currency=';
 const GECKO_PARAM_START = 'days=';
//  const GECKO_PARAM_INFO = "localization=flase&tickers=false&market_data=false";


/**
 * 
 * URL BUILDERS
 * 
 */
function buildCoinsListPaprikaUrl(){
  return PAPRIKA_BASEURL + PAPRIKA_ENDPOINT_COINS;
}
function buildTickersListPaprikaUrl(){
  return PAPRIKA_BASEURL + PAPRIKA_ENDPOINT_TICKERS;
}
function buildTickersListAllCurPaprikaUrl(){
  return PAPRIKA_BASEURL + PAPRIKA_ENDPOINT_TICKERS + "?" +
  PAPRIKA_PARAM_QUOTE + "USD,BTC" ;
}
/**
 * 
 * @param {string} coinId 
 * @param {number} days 
 */
function buildPricesSetPaprikaUrl(coinId, days){
  let url ="";
  if(days > 0){
  url = PAPRIKA_BASEURL + PAPRIKA_ENDPOINT_TICKERS + "/" + coinId + 
  PAPRIKA_OPTION_HISTO + "?" +
  PAPRIKA_PARAM_START + Time.getPastDateByDayInverse(days) + "&" +
  PAPRIKA_PARAM_INTERVAL + "12h";
} /*else {
  url = BASE_URL + COIN_ENDPOINT + coinId + OPTION_TODAY;
}*/
  return url;
}
/**
 * 
 * @param {string} coinId 
 */
function buildCoinInfoPaprikaUrl(coinId){
  let url = PAPRIKA_BASEURL + PAPRIKA_ENDPOINT_COINS + "/" + coinId;
return url;
}
/**
 * 
 * @param {string} coinId 
 */
function buildCoinTwitterPaprikaUrl(coinId){
  
  let url = PAPRIKA_BASEURL + PAPRIKA_ENDPOINT_COINS + "/" + coinId + 
  PAPRIKA_OPTION_TWITTER;

return url;
}
/**
 * 
 * @param {string} coinId 
 */
function buildCoinEventsPaprikaUrl(coinId){
  
  let url = PAPRIKA_BASEURL + PAPRIKA_ENDPOINT_COINS + "/" + coinId + 
  PAPRIKA_OPTION_EVENTS;

return url;
}
/**
 * 
 * @param {string} coinId 
 */
function buildCoinMarketsPaprikaUrl(coinId){
  
  let url = PAPRIKA_BASEURL + PAPRIKA_ENDPOINT_COINS + "/" + coinId + 
  PAPRIKA_OPTION_MARKETS;

return url;
}
function buildCoinsListGeckoUrl(){
  return GECKO_BASEURL + GECKO_ENDPOINT_COINS + GECKO_OPTION_LIST;
}
function buildGlobalInfoGeckoUrl(){
  return GECKO_BASEURL +GECKO_ENDPOINT_GLOBAL;
}
function buildGlobalInfoPaprikaUrl(){
  return PAPRIKA_BASEURL +PAPRIKA_ENDPOINT_GLOBAL;
}
/**
 * 
 * @param {string} coinId 
 * @param {string} devise
 * @param {number} days 
 */
function buildPricesSetGeckoUrl(coinId, devise, days){
  let url ="";
  if(days > 0){
  url = GECKO_BASEURL + GECKO_ENDPOINT_COINS + "/" + coinId + 
  GECKO_OPTION_MARKET_CHART + "?" +
  GECKO_PARAM_VSCUR + devise.toLowerCase() + "&" +
  GECKO_PARAM_START + "7";
}
return url;
}
/**
 * 
 * @param {string} coinId 
 */
function buildCoinInfoGeckoUrl(coinId){
  
  let url = GECKO_BASEURL + GECKO_ENDPOINT_COINS + "/" + coinId;
return url;
}







/**
 * Module to manage api calls
 * 
 * @todo restructure it to manage 429... with timers to not call if we know the call will be rejected
 * handle errors 50.. and cors
 */
 export var DataProvider =  {

    /**
     * Create a map : id => {identity infos}, see DataContext
     * 
     */
    getCoinList : async () => {
            let coinList = new Map();
            /* GET ID AND INFOS FROM COINAPRIKA */
            const responseP =  await axios.get(buildCoinsListPaprikaUrl());

            responseP.data.forEach((coin) => {
                let key = coin.symbol.toLowerCase();
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

            /* SET COINGECKO ID IN THE MAP */
            responseC.data.forEach((coin) => {
                if (coinList.get(coin.symbol)) {
                  const newset = coinList.get(coin.symbol);
                  newset.gecko_id = coin.id;
                  coinList.set(coin.symbol,newset);}
            });
            return coinList;
    },

    /**
     * get global market info from coingecko
     */
    getGlobalInfosFromGecko : async () => {
        return await axios.get(buildGlobalInfoGeckoUrl());
      },
    /**
     * get global market info from coinpaprika
     */
      getGlobalInfosFromPaprika : async () => {
        return await axios.get(buildGlobalInfoPaprikaUrl());
      },
   
    /**
     * Get the coins data (for top N display) in usd
     */
    getCoinsData : async () => {
      return await axios.get(buildTickersListPaprikaUrl());
    },
    /**
     * Get the coins data (for top N display) in usd and btc
     */
    getCoinsDataAllCur : async () => {
      return await axios.get(buildTickersListAllCurPaprikaUrl());
    },
   /**
     * Get data of a coin from paprika
     */
    getCoinInfoPaprika : async (id) => {
      return await axios.get(buildCoinInfoPaprikaUrl(id));
    },
 /**
     * Get twitter data of a coin
     */
    getCoinTwitterPaprika : async (id) => {
      return await axios.get(buildCoinTwitterPaprikaUrl(id));
    },
 /**
     * Get events data of a coin
     */
    getCoinEventsPaprika : async (id) => {
      return await axios.get(buildCoinEventsPaprikaUrl(id));
    },
 /**
     * Get market data of a coin
     */
    getCoinMarketsPaprika : async (id) => {
      return await axios.get(buildCoinMarketsPaprikaUrl(id));
    },
 /**
     * Get data of a coin from gecko
     */
    getCoinInfoGecko : async (id) => {
      return await axios.get(buildCoinInfoGeckoUrl(id));
    },

    /**
     * Get the coin prices for 7 last days to draw the mini graph from paprika
     * 
     * https://api.coinpaprika.com/v1/tickers/btc-bitcoin/historical?start=2020-08-01&interval=1h
     */
    getCoinsPriceSetD7 : async (id) => {
      return await axios.get(buildPricesSetPaprikaUrl(id, 7));
    },
   /**
     * Get the coin prices for 7 last days to draw the mini graph from gecko
     * 
     * https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7
     */
    getCoinsPriceSetGecko : async (id, devise) => {
      const response = await axios.get(buildPricesSetGeckoUrl(id, devise, 7)).then(resp => {
        return resp.data;
      })
    .catch(err => {
        console.log('not available',err);
        return { prices: undefined};//{prices: [[0,0]]};
    })
      return response;
    }
/*
 if (coinResponse.status == 429) {
          return 'not available';
        } else {
          return coinResponse;
        }
        */
   /* getCoinInfoPriceSetTODO : async (id) => {
      return await axios.get(buildPricesSetPaprikaUrl(id, 7));
    },*/

    
  }

 