import React, { useState, useEffect, useContext, useLayoutEffect } from 'react';
import { DataContext } from '../../components/NavBars/DataContext';
import styled from 'styled-components';

import RankingCoins from "./../../components/RankingList/RankingCoins";
import CoinRankingNavbar from "../../components/NavBars/CoinRankingNavbar";

import { Compare, Filter, Copy, Time } from "../../modules/Utilities";
import { DataProvider } from "../../modules/DataProvider";


/*fix the number of coins per page : 50 due to api request limit*/
const COIN_COUNT = 50;//100;

const Title = styled.h1`
 font-size: 1.5rem;
 text-align: center;
 height: 4rem;
 margin-top: 1.5rem;
 margin-bottom: 1.5rem;
 @media (max-width: 900px) {
  height: 5rem;
}
`;

/************************************
 * 
 * RankingCoinsPage
 * 
 * main api calls here
 * 
 * @todo manage last page for button Next
 * 
 * ******************************** */
export default function RankingsPage(props) {
  const { coinsInfos } = useContext(DataContext);

  const [page, setPage] = useState({
    current: 0,
    last: 100
  });

  const [sorting, setSorting] = useState({
    key: 'rank',
    order: 'asc'
  })

  const [filter, setFilter] = useState({
    devise: "USD",
    minCap: 0,
    maxCap: +1e19,
    minSup: 0,
    maxSup: +1e19,
    minVarD: -100,
    maxVarD: +1e19,
    minVarAth: -100,
    maxVarAth: +1e19,
    minPrice: 0,
    maxPrice: +1e19
  })

  const [DataSet, setDataSet] = useState({
    coinsData: [],                    //data of all coins and vs_currencies
    coinsFiltered: [],                //data filtered by user
    snapshot: [],                     //sample to display
    snapshotChange: [],               //indication of change in sample since last update
    priceSetData: []                  //7days prices {symbol, [[time, price]]}
  })

  const [needRefresh, setNeedRefresh] = useState({
    needed: false,
    filterDidChanged: false
  })

  //asynchrone
  useEffect(function () {
    if (DataSet.coinsData.length === 0) {
      // component did mount
      fetchAllData();
    } else {
      //component did update
    }
    /*Timer to update prices each 35 sec (2*50req/minute max => give time if 429 before)*/
    let interval = null;
    interval = setInterval(() => {
      fetchAllData();
    }, 35000);

    //component will unmount // dependencies array empty => effect call only once when did mount
    //react warning with ...}, []) => })
    return () => clearInterval(interval);
  });

  /**
   * PERSO MEMO : 
   * useEffect : setState => render => state updated useEffect play
   * useLayoutEffect: play BEFORE render with the next value of state
   */

  //synchrone (changes must be rendered!)
  useLayoutEffect(() => {
    if (needRefresh.needed) {
      refreshData(needRefresh.filterDidChanged);
    }
  });

  /**
   * Fetch all data (intialize the data)
   */
  const fetchAllData = async () => {

    /*Fetch prices and data of all coins*/
    const response = await DataProvider.getCoinsDataAllCur();
    /*Sort the result by rank*/
    const sortedResponse = sortDataSet(response.data, sorting.key, sorting.order);// response.data.sort(Compare.byKey(sorting.key, sorting.order));
    /*Filter the result following user settings*/
    const dataFiltered = Filter.byRange(sortedResponse, filter);
    /*Get the snapshot to display*/
    const newCoinsData = dataFiltered.slice((page.current * COIN_COUNT), ((page.current * COIN_COUNT) + COIN_COUNT));
    /*Get 7days series of price for the snapshot*/
    const newPriceSet = await fetchPriceSet(newCoinsData);
    /*Check changes in price since last snapshot*/
    const snapChange = getChangeInSnapshot(newCoinsData);


    setDataSet({
      coinsData: Copy.nested(sortedResponse),
      coinsFiltered: Copy.nested(dataFiltered),
      snapshot: Copy.nested(newCoinsData),
      snapshotChange: Copy.deep(snapChange),
      priceSetData: newPriceSet //Copy.nested(newPriceSet)
    });

    props.refreshUpdateTime(Time.fromTimestamp(Date.now() / 1000));
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
   * @todo set a timer to update price after more than 1 hour (actual update for current hour)
   * 
   * @param {Object} newCoinsData 
   */
  const fetchPriceSet = async (newCoinsData) => {
    const priceSetCopy = Copy.nested(DataSet.priceSetData);

    /*pass in the snapshot to ident the coins to fetch and create a promise array*/
    const priceSetPromise = newCoinsData.map(async coin => {

      const symbol = coin.symbol.toLowerCase();
      const coinResponse = {
        symb: "symbol",
        set: [[0, 0]]
      }
      const geckoId = (coinsInfos.list.get(symbol)).gecko_id;
      /*the desired coin data exist by gecko and paprika so continue*/
      if (geckoId !== undefined) {
        if (priceSetCopy[symbol] === undefined) {
          priceSetCopy[symbol] = {};
        }

        /*there's no record yet in priceSetData so fetch*/
        if (priceSetCopy[symbol][filter.devise] === undefined) {
          const coinResponse = await DataProvider.getCoinsPriceSetGecko(geckoId, filter.devise);
          return {
            symb: symbol,
            set: coinResponse.prices
          }
        } else {
          /*update the record with the last price*/
          const updatedSet = priceSetCopy[symbol][filter.devise];
          updatedSet[updatedSet.length - 1][1] = coin.quotes[filter.devise].price
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
      return priceSetCopy[coinSet.symb][filter.devise] = coinSet.set;
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
    if (DataSet.snapshot.length !== 0) {

      for (let i = 0; i < newCoinsData.length; i++) {
        const newName = newCoinsData[i].name;
        const newPrice = newCoinsData[i].quotes[filter.devise].price;
        let change = 'unchanged';

        for (let j = 0; j < DataSet.snapshot.length; j++) {
          if (newName === DataSet.snapshot[j].name) {

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
   * Helpers to refresh data after filtering, sorting...
   * @param {boolean} isFilterChanged 
   * @param {boolean} isSortingChanged 
   */
  const refreshData = async (isFilterChanged) => {

    const dataFiltered = isFilterChanged ? Filter.byRange(DataSet.coinsData, filter) :
      DataSet.coinsFiltered;

    const newCoinsData = dataFiltered.slice((page.current * COIN_COUNT), ((page.current * COIN_COUNT) + COIN_COUNT));
    const snapChange = getChangeInSnapshot(newCoinsData);
    const newPriceSet = await fetchPriceSet(newCoinsData);

    /*update data states*/
    setDataSet((oldSet) => {
      const newSet = {
        coinsData: oldSet.coinsData,
        coinsFiltered: dataFiltered,
        snapshot: newCoinsData,
        snapshotChange: snapChange,
        priceSetData: newPriceSet
      }
      return newSet;
    });

    setNeedRefresh({
      needed: false,
      filterDidChanged: false
    });
  }


  /**
   * sorting function
   * @param {Object} setToSort 
   * @param {string} key 
   * @param {string} order 
   */
  const sortDataSet = (setToSort, key, order) => {
    const newSet = setToSort;

    switch (key) {
      case 'rank':
      case 'name':
      case 'circulating_supply':
        newSet.sort(Compare.byKey(key, order));
        break;
      default:
        newSet.sort(Compare.quotesByKey(filter.devise, key, order));
        break;
    }
    return newSet;

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
    setSorting({
      key: key,
      order: order
    })
    /*reset the page count*/
    setPage((oldPage) => {
      const newPage = {
        current: 0,
        last: oldPage.last
      }
      return newPage;
    });

    const sortedData = sortDataSet(DataSet.coinsFiltered, key, order);
    /*get the snapshot to display*/
    const newCoinsData = sortedData.slice(0, COIN_COUNT);
    const snapChange = getChangeInSnapshot(newCoinsData);
    const newPriceSet = await fetchPriceSet(newCoinsData);

    /*update the data states*/
    setDataSet((oldSet) => {
      const newSet = {
        coinsData: oldSet.coinsData,
        coinsFiltered: sortedData,
        snapshot: newCoinsData,
        snapshotChange: snapChange,
        priceSetData: newPriceSet
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
  const changeFilter = async (minCap, maxCap, minSup, maxSup, minVarD, maxVarD, minVarAth, maxVarAth, minPrice, maxPrice) => {
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

    setNeedRefresh({
      needed: true,
      filterDidChanged: true
    })
  }


  /**
 * Manage vs_currency modification
 * 
 * @param {string} newdevise 
 */
  const toggleDevise = async (newdevise) => {
    setFilter((oldFilter) => {
      const newFilter = Copy.deep(oldFilter);
      newFilter.devise = newdevise;
      return newFilter;
    })

    refreshData(false);
  }


  /**
   * Manage page modification 
   * 
   * @param {number} directionNext 
   */
  const handleClickPage = async (directionNext) => {
    setPage(oldPage => {
      const newCurrent = {
        current: (oldPage.current + directionNext),
        last: oldPage.last
      };
      return newCurrent;
    });
    // refreshData(false, false);
    setNeedRefresh({
      needed: true,
      filterDidChanged: false
    })
  }

  return (
    <div className="tableContainer container-fluid py-4">

      <Title>{`Top ${COIN_COUNT} Cryptocurrencies by Market Capitalisation (in ${filter.devise})`}</Title>
      <CoinRankingNavbar toggleDevise={toggleDevise} changeFilter={changeFilter} handleClickPage={handleClickPage}
        devise={filter.devise} page={page} />

      <RankingCoins coinsData={DataSet.snapshot} coinsList={coinsInfos.list} priceSetData={DataSet.priceSetData}
        devise={filter.devise} snapshotChange={DataSet.snapshotChange}
        handleClickSort={handleClickSort} pubIsOpen={props.pubIsOpen}/>

    </div>
  );

}