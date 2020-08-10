import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter, Switch, Route, useHistory, useParams, useLocation } from 'react-router-dom';
import { DataContext } from '../../components/NavBars/DataContext';

import RankingCoins from "./../../components/Rankings/RankingCoins";
import CoinRankingNavbar from "../../components/NavBars/CoinRankingNavbar";
import CoinsPage from './CoinsPage';

import { Format, Compare, Filter, Copy } from "../../modules/Utilities";
import { DataProvider } from "../../modules/DataProvider";


const COIN_COUNT = 50;//100;


/************************************
 * 
 * RankingCoinsPage
 * 
 * main api calls here
 * 
 * ******************************** */
export default function RankingsPage(props) {
  const [coinsData, setCoinsData] = useState([]);
  const [coinsList, setCoinsList] = useState([]);
  const [priceSetData, setPriceSetData] = useState([]);
  const [page, setPage] = useState({
    current: 0,
    last: 0
  });

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
    coinsData: [],                    //data of all coins and vs_currencies
    coinsFiltered: [],                //data filtered by user
    snapshot: [],                     //sample to display
    snapshotChange: [],               //indication of change in sample since last update
    priceSetData: []                  //7days prices {symbol, [[time, price]]}
  })

  useEffect(function () {
    if (coinsData.length === 0) {
      // component did mount
      componentDidMount();


    } else {
      //component did update
    }
    //Timer for AutoRefresh, TODO cleaner elseif
    let interval = null;
    // if (true) {
    interval = setInterval(() => {
      componentDidMount();
    }, 30000);
    // }/* else if (!isAutoRefresh) {
    clearInterval(interval);
    //  }*/

    //EQUIVALENT og compnentwillunmount => clear the interval
    return () => clearInterval(interval);
  });



  const componentDidMount = async () => {


    const response = await DataProvider.getCoinsDataAllCur();

    response.data.sort(Compare.byKey('rank', 'asc'));

    const dataFiltered = Filter.byRange(response.data, filter);
    const newCoinsData = dataFiltered.slice((page.current * COIN_COUNT), ((page.current * COIN_COUNT) + COIN_COUNT));

    //otbenir les donnees OHCL pour les mini graph
    //100 coins / page => 6 apple possible => 1/10sec
    //afin de ne pas bloquer si autre suivant => 2/min => timer 30sec
   /* const priceSetCopy = { ...priceSetData };

    const priceSetPromise = newCoinsData.map(async coin => {
      const coinResponse = {
        symb: "symbol",
        set: [[0, 0]]
      }
      //paprika => n request limit 10/sec, 600/min
      /*    const coinResponse = await DataProvider.getCoinsPriceSetD7(coin.id);
        */
      // GECKKO => n request limit 100/min
  /*   if ((coinsInfos.list.get(coin.symbol.toLowerCase())).gecko_id != undefined) {

        //const coinResponse = await DataProvider.getCoinsPriceSetGecko(coinsInfos.list.get(coin.symbol.toLowerCase()).gecko_id);



        if (priceSetCopy[coin.symbol.toLowerCase()] == undefined) {
          const coinResponse = await DataProvider.getCoinsPriceSetGecko(coinsInfos.list.get(coin.symbol.toLowerCase()).gecko_id);

          return {
            symb: coin.symbol.toLowerCase(),
            set: coinResponse.prices
          }
        }
      }
      return coinResponse;

    });

    const priceSetResponse = await Promise.all(priceSetPromise);

    priceSetResponse.map((coinSet) => {
      priceSetCopy[coinSet.symb] = coinSet.set;

    })*/

    const newPriceSet = await fetchPriceSet(newCoinsData);

    const snapChange = getChangeInSnapshot(newCoinsData);

    setDataSet({
      coinsData: Copy.nested(response.data),
      coinsFiltered: Copy.nested(dataFiltered),
      snapshot: Copy.nested(newCoinsData),
      snapshotChange: Copy.deep(snapChange),
      //priceSetData: priceSetData
      priceSetData: newPriceSet //Copy.nested(newPriceSet)
    })

  }

/**
 * Fetch prices series for 7 days to draw mini charts
 * 
 * -get the snapshot to display and pass in to ident the coins data to fetch
 * -if gecko and parpika have this coin data then
 * -check if a set already exist for the coin
 * -if not then fetch the price serie and add it to the data stored
 * 
 * using gecko api because of the request limit/min
 * gecko : 100/min
 * paprika : 600/min but 10/sec
 * 
 * @param {Object} newCoinsData 
 */
  const fetchPriceSet = async (newCoinsData) => {
    const priceSetCopy = Copy.nested(priceSetData);

/*pass in the snapshot to ident the coins to fetch and create a promise array*/
    const priceSetPromise = newCoinsData.map(async coin => {

      const symbol = coin.symbol.toLowerCase();
      const coinResponse = {
        symb: "symbol",
        set: [[0, 0]]
      }
      const geckoId = (coinsInfos.list.get(symbol)).gecko_id;
      /*the desired coin data exist by gecko and paprika so continue*/
      if (geckoId != undefined) {

      /*there's no record yet in priceSetData so fetch*/
        if (priceSetCopy[symbol] == undefined) {
          const coinResponse = await DataProvider.getCoinsPriceSetGecko(geckoId);
          return {
            symb: symbol,
            set: coinResponse.prices
          }
        } else {
          /*update the record with the last price*/
          const updatedSet = priceSetCopy[symbol];
          updatedSet[updatedSet.length-1] = coin.quotes[filter.devise].price
          return {
            symb: symbol,
            set: updatedSet
          }
        }
      }
      return coinResponse;
    });

    const priceSetResponse = await Promise.all(priceSetPromise);
/*transform the result to get a mapping object of coin => price set (update or create field)*/
    priceSetResponse.map((coinSet) => {
      priceSetCopy[coinSet.symb] = coinSet.set;
    })

    return priceSetCopy;
  }


  /**
   * Check prices change between old and new snapshot
   * 
   * -get in param the new snapshot
   * -pass in the old one to compare the name of coins registered
   * -check for change
   * 
   * @todo pas in coinData not in last snapshot to get all change
   * 
   * @param {Object} newCoinsData 
   */
  const getChangeInSnapshot = (newCoinsData) => {

    const snapChange = [];
    if (DataSet.snapshot.length != 0) {

      for (let i = 0; i < newCoinsData.length; i++) {
        const newName = newCoinsData[i].name;
        const newPrice = newCoinsData[i].quotes[filter.devise].price;
        let change = 'unchanged';

        for (let j = 0; j < DataSet.snapshot.length; j++) {
          if (newName == DataSet.snapshot[j].name) {

            if (DataSet.snapshot[j].quotes[filter.devise].price < newPrice) {
              change = 'up';
            } else if (DataSet.snapshot[j].quotes[filter.devise].price > newPrice) {
              change = 'down';
            }
          }
        }
        snapChange.push(change);
      }
    } else {
      for (let i = 0; i < newCoinsData.length; i++) {
        snapChange.push('unchanged');
      }
    }
    return snapChange

  }






/**
 * Manage column sorting
 * 
 * -sort data by key in the filtered dataset
 * -reset the page count to 0
 * -get a new snapshot to display and changes in price
 * -update data states
 * 
 * @param {string} key 
 * @param {string} order 
 */
  const handleClickSort = async (key, order) => {
    const response = DataSet.coinsFiltered;
   
    /*sort the data*/
    switch (key) {
      case 'rank':
      case 'name':
      case 'circulating_supply':
        response.sort(Compare.byKey(key, order));
        break;
      default:
        response.sort(Compare.quotesByKey(filter.devise, key, order));
        break;
    }
    /*reset the page count*/
    setPage((oldPage) => {
      const newPage = {
        current: 0,
        last: oldPage.last
      }
      return newPage;
    });
    /*get the snapshot to display*/
    const newCoinsData = response.slice(0, COIN_COUNT);
    const snapChange = getChangeInSnapshot(newCoinsData);
    /*update the data states*/
    setCoinsData(newCoinsData);
    setDataSet((oldSet) => {
      const newSet = {
        coinsData: oldSet.coinsData,
        coinsFiltered: oldSet.coinsFiltered,
        snapshot: newCoinsData,
        snapshotChange: snapChange,
        priceSetData: oldSet.priceSetData
      }
      return newSet;
    })
  }



  /**
   * Manage new filter settings from user
   * 
   * -set changes in the filter
   * -set the page count to 0 to get a new snapshot to display
   * -search for prices change in the snapshot
   * -update data states
   * 
   * @param {number} minCap 
   * @param {number} maxCap 
   * @param {number} minSup 
   * @param {number} maxSup 
   * @param {number} minVarD 
   * @param {number} maxVarD 
   * @param {number} minVarAth 
   * @param {number} maxVarAth 
   * @param {number} minPrice 
   * @param {number} maxPrice 
   */
  const changeFilter = (minCap, maxCap, minSup, maxSup, minVarD, maxVarD, minVarAth, maxVarAth, minPrice, maxPrice) => {
    /*update the filter settings*/
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
    /*reset the page count to 0*/
    setPage((oldPage) => {
      const newPage = {
        current: 0,
        last: oldPage.last
      }
      return newPage;
    });

    /*filter data and get new snapshot and changes*/
    const dataFiltered = Filter.byRange(DataSet.coinsData, filter);

    const newCoinsData = dataFiltered.slice(0, COIN_COUNT);

    const snapChange = getChangeInSnapshot(newCoinsData);

    /*update data states*/
    setDataSet((oldSet) => {
      const newSet = {
        coinsData: oldSet.coinsData,
        coinsFiltered: dataFiltered,
        snapshot: newCoinsData,
        snapshotChange: snapChange,
        priceSetData: oldSet.priceSetData
      }
      return newSet;
    });
  }


  /**
 * Manage vs_currency modification
 * 
 * @param {string} newdevise 
 */
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

}


  /**
   * Manage page modification and call for refresh
   * 
   * @param {number} directionNext 
   */
  const handleClickPage = (directionNext) => {
    setPage(oldPage => {
      const newCurrent = {
        current: (oldPage.current + directionNext),
        last: oldPage.last
      };
      return newCurrent;
    });
    componentDidMount();
  }

  //alert("pageavantaffichage : "+page.current);
  const { id, type } = useParams();
  /*
  const history = useHistory();
      const { id, type} = useParams();
  console.log(id, type, "DE RANKINGPAGE");
  console.log(history.path);
  let location = useLocation();
  console.log(location.pathname);
  
  const {path} = props.location;
  console.log(path);
  */
  const { match, location, history } = props;
  console.log("Rankingpahe", match, location, history);
  return (
    <BrowserRouter>
      <div className="tableContainer container">

        <h1>{`Top 100 cryptocurrencies by market capitalisation (in ${filter.devise})`}</h1>
        <CoinRankingNavbar toggleDevise={toggleDevise} changeFilter={changeFilter} handleClickPage={handleClickPage}
          devise={filter.devise} page={page} />


        <Switch>

          <Route exact strict path="/">
            <RankingCoins coinsData={DataSet.snapshot} coinsList={coinsInfos.list} priceSetData={DataSet.priceSetData}
              devise={filter.devise} snapshotChange={DataSet.snapshotChange}
              handleClickSort={handleClickSort} />
          </Route>
          <Route exact path="/coin/:id/:chart">
            <CoinsPage coin={id} />
          </Route>

        </Switch>

      </div>

    </BrowserRouter>


  );

}