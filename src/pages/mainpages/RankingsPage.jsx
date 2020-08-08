import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { DataContext } from '../../components/NavBars/DataContext';

import RankingCoins from "./../../components/Rankings/RankingCoins";
import CoinRankingNavbar from "../../components/NavBars/CoinRankingNavbar";

import { Format, Compare, Filter } from "../../modules/Utilities";
import { DataProvider } from "../../modules/DataProvider";
import axios from 'axios';



/************************************
 * 
 * RankingCoinsPage
 * 
 * ******************************** */

const COIN_COUNT = 50;//100;
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
  const [priceSetData, setPriceSetData] = useState([]);

  const [filter, setFilter] = useState({
    devise: "USD",
    minCap: 0,
    maxCap: 999999999999,
    minSup: 0,
    maxSup: 999999999999,
    minVarD: -100,
   maxVarD: 10000,
    minVarAth: -100,
     maxVarAth: 10000, 
     minPrice: 0,
      maxPrice: 999999999999
  })

  const { coinsInfos, setCoinsInfos } = useContext(DataContext);

  const [DataSet, setDataSet] = useState({
    coinsData: [],
    coinsFiltered : [],
    snapshot: [],
    priceSetData: []
  })

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


        ///ATTENTION LIMITER APPEL API => test state == []

      /*  const dictionary =[]
        
       // if(coinsInfos.list==0){

        const coinLISTE = await DataProvider.getCoinList().then((datas)=>{
          console.log(datas,"dats2");
          for (const [key,val] of datas) {
          dictionary.push(val.name.toLowerCase() + " " + val.symbol.toLowerCase());
          console.log(val.name.toLowerCase() + " " + val.symbol.toLowerCase(), "dats");  
        }
          
          console.log(dictionary, "dictionary");

          //props.loadCoinsInfos(dictionary,datas);

          setCoinsInfos(()=>{
            const infos = {
              dictionary: dictionary,
            list: datas
            }
            return infos;
          })

          console.log(coinsInfos,"COINSINFOS");
          return datas;
        }


        );


        setCoinsList(coinLISTE);
     // }
     */
    
const response = await  DataProvider.getCoinsDataAllCur();

        response.data.sort(Compare.byKey('rank', 'asc'));
       
       const dataFiltered = Filter.byRange(response.data, filter);

        const newCoinsData = dataFiltered.slice(0, COIN_COUNT);
//        const newCoinsData = response.data.slice(0, COIN_COUNT);

          //otbenir les donnees OHCL pour les mini graph
          //100 coins / page => 6 apple possible => 1/10sec
          //afin de ne pas bloquer si autre suivant => 2/min => timer 30sec
console.log(coinsInfos.list, "AVANTBUG");
console.log(newCoinsData, "AVANTBUG");
          const priceSetPromise = newCoinsData.map(async coin => {

            /*const coinResponse = await DataProvider.getCoinsPriceSetD7(coin.id);
            console.log(coinResponse.data);
            const priceSet = coinResponse.data.map((quote, index) => {
              return {
                x: index,
                y: quote.price
              }
            });*/
            
            if ((coinsInfos.list.get(coin.symbol.toLowerCase())).gecko_id != undefined){
            const coinResponse = await DataProvider.getCoinsPriceSetGecko(coinsInfos.list.get(coin.symbol.toLowerCase()).gecko_id);
            //DataProvider.testgek+=1;
           // console.log(DataProvider.testgek, "appel gek");
            return coinResponse;
            }
          });
          const priceSetData = await Promise.all(priceSetPromise);
      console.log(priceSetData);
         // setPriceSetData(priceSetData);
        // setCoinsData(newCoinsData);
       
        setDataSet({
          coinsData: response.data,
          coinsFiltered: dataFiltered,
          snapshot: newCoinsData,
          priceSetData: priceSetData
        })
      }

//TRIER DATA PAS APPEL API
const handleClickSort = async (key, order) => {
  const response = DataSet.coinsFiltered;
  //const response = await  DataProvider.getCoinsData();

  switch(key) {
    case 'rank':
    case 'name':
    case 'circulating_supply':
      response.sort(Compare.byKey(key, order));
      break;
    default:
      response.sort(Compare.quotesByKey(filter.devise, key, order));
      break;
  }  
        const newCoinsData = response.slice(0, COIN_COUNT);
    

      /*  const priceSetPromise = newCoinsData.map(async coin => {

         */ /*const coinResponse = await DataProvider.getCoinsPriceSetD7(coin.id);
          console.log(coinResponse.data);
          const priceSet = coinResponse.data.map((quote, index) => {
            return {
              x: index,
              y: quote.price
            }
          });*/
      /*    if (coinsList[coin.symbol.toLowerCase()].gecko_id != undefined){
          const coinResponse = await DataProvider.getCoinsPriceSetGecko(coinsList[coin.symbol.toLowerCase()].gecko_id);
         
          return coinResponse;
          }
        });
        const priceSetData = await Promise.all(priceSetPromise);
    console.log(priceSetData);
        setPriceSetData(priceSetData);*/


        setCoinsData(newCoinsData);
        setDataSet((oldSet) => {
          const newSet = {
          coinsData: oldSet.coinsData,
          coinsFiltered: oldSet.coinsFiltered,
          snapshot: newCoinsData,
          priceSetData: oldSet.priceSetData
          }
          return newSet;
        })
}



const toggleDevise = (newdevise) => {
    setFilter((oldFilter) => {
      const newFilter = {
        devise: newdevise,
    minCap: oldFilter.minCap,
    maxCap: oldFilter.maxCap,
    minVarh1: oldFilter.minVarh1,
    maxVarh1: oldFilter.maxVarh1
      }
      
      return newFilter;
    })
    alert("changedevise en "+newdevise);
   /* const dataFiltered = Filter.byRange(DataSet.coinsData, filter);

        const newCoinsData = dataFiltered.slice(0, COIN_COUNT);
        setDataSet((oldSet) => {
          const newSet = {
          coinsData: oldSet.coinsData,
          coinsFiltered: dataFiltered,
          snapshot: newCoinsData,
          priceSetData: oldSet.priceSetData
          }
          return newSet;
        })*/
}

const changeFilter = (minCap, maxCap, minSup, maxSup, minVarD, maxVarD, minVarAth, maxVarAth, minPrice, maxPrice) => {
  setFilter((oldFilter) => {
    const newFilter = {
      devise: oldFilter.devise,
      minCap: oldFilter.minCap === minCap ? oldFilter.minCap : minCap,
      maxCap: oldFilter.maxCap === maxCap ? oldFilter.maxCap : maxCap,
      minSup: oldFilter.minSup === minSup ? oldFilter.minSup : minSup,
      maxSup: oldFilter.maxSup === maxSup ? oldFilter.maxSup : maxSup,
      minVarD: oldFilter.minVarD === minVarD ? oldFilter.minVarD : minVarD,
     maxVarD: oldFilter.maxVarD === maxVarD ? oldFilter.maxVarD : maxVarD,
      minVarAth: oldFilter.minVarAth === minVarAth ? oldFilter.minVarAth : minVarAth,
       maxVarAth: oldFilter.maxVarAth === maxVarAth ? oldFilter.maxVarAth : maxVarAth, 
       minPrice: oldFilter.minPrice === minPrice ? oldFilter.minPrice : minPrice,
        maxPrice: oldFilter.maxPrice === maxPrice ? oldFilter.maxPrice : maxPrice
    }
    return newFilter;
  })
  alert("changedevise en "+minCap);

  const dataFiltered = Filter.byRange(DataSet.coinsData, filter);
  const newCoinsData = dataFiltered.slice(0, COIN_COUNT);
        setDataSet((oldSet) => {
          const newSet = {
          coinsData: oldSet.coinsData,
          coinsFiltered: dataFiltered,
          snapshot: newCoinsData,
          priceSetData: oldSet.priceSetData
          }
          return newSet;
        });
  }


//                    <Route exact strict path="/" component={RankingCoins} />


{ console.log(coinsList,"\n\n\nREADY")};
    return (
     
        <div className="tableContainer container">

    <h1>{`Top 100 cryptocurrencies by market capitalisation (in ${filter.devise})`}</h1>
            <CoinRankingNavbar toggleDevise={toggleDevise} changeFilter={changeFilter} devise={filter.devise}/>
            <BrowserRouter>

                <Switch>

                    <Route exact strict path="/">
                      <RankingCoins coinsData={DataSet.snapshot} coinsList={coinsInfos.list} priceSetData={DataSet.priceSetData}
                          devise={filter.devise} handleClickSort={handleClickSort}/>
                    </Route> 


                </Switch>

            </BrowserRouter>
        </div>




    );

}