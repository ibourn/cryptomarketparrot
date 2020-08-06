import axios from 'axios';

 /**
  * 
  * QTITY PARAMs
  * 
  * */
const DISPLAY_COINS_PER_PAGE = 100;
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
function buildCoinsListGeckoUrl(){
  return GECKO_BASEURL + GECKO_ENDPOINT_COINS + GECKO_OPTION_LIST;
}


//export default async function DataProvider() {

 export var DataProvider = {
    /**
     * Create a map : id => {identity infos}, where id is lowercapped symbol
     * to have :
     * id for coinpaprika and coingecko and url of the icon
     * 
     * TODO : rank shouldn't be there as it can change during display
     * 
     */
    getCoinList : async () => {
            let coinList = new Map();
            /* GET ID AND INFOS FROM COINAPRIKA */
            const responseP =  await axios.get(buildCoinsListPaprikaUrl());
            responseP.data.forEach((coin) => {
                let key = coin.symbol.toLowerCase();
                coinList[key] = {
                    paprika_id: coin.id,
                    gecko_id: "",
                    name: coin.name,
                    symbol: coin.symbol,
                    rank: coin.rank,
                    is_new: coin.is_new,
                    is_active: coin.is_active,
                    type: coin.type,
                    svg: key + ".svg"
                }
             });
            /* GET ID AND INFOS FROM COINGEKO */
            const responseC = await axios.get(buildCoinsListGeckoUrl());
            /* SET COINGECKO ID IN THE MAP */
            responseC.data.forEach((coin) => {
                console.log(coin);
                if (coinList[coin.symbol]) {
                  coinList[coin.symbol].gecko_id = coin.id;}
            });
            return coinList;
    },
   
    /**
     * 
     * Get the coins data (for top N display)
     * 
     */
    getCoinsData : async () => {return await axios.get("https://api.coinpaprika.com/v1/tickers");}
      
    }
 
