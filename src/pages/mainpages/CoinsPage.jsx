import React, {useState, useContext, useEffect } from 'react';
import { BrowserRouter, Route, Switch, NavLink, withRouter, useHistory, useParams } from "react-router-dom";

import { DataProvider } from "../../modules/DataProvider";
import { DataContext } from "../../components/NavBars/DataContext";


import CoinPageHeader from '../../components/Headers/CoinPageHeader';
import CoinPageNavBar from '../../components/NavBars/CoinPageNavBar';
import CoinAbout from '../../components/CoinPageContent/CoinAbout';
import CoinChart from '../../components/CoinPageContent/CoinChart';
import CoinMarkets from '../../components/CoinPageContent/CoinMarkets';
import CoinMedias from '../../components/CoinPageContent/CoinMedias';
/************************************
 * 
 * CoinsPage
 * 
 * ******************************** */

export default function CoinsPage(props) {
    const history = useHistory();
    const { id, type} = useParams()
    const [u,v] = useState();
    const [coinInfo,setCoinInfo] = useState([]);
    const [coinTwitter,setCoinTwitter] = useState([]);
    const [coinEvents,setCoinEvents] = useState([]);
    const [coinMarkets,setCoinMarkets] = useState([]);
    const { coinsInfos, setCoinsInfos } = useContext(DataContext);

//TODO
    //LOAD coinsInfos ds mainpage to make it available 
    const id_paprika = "btc-bitcoin";//coinsInfos.list ? coinsInfos.list.get(id).id_paprika : "";
    const id_gecko = "bitcoin";//coinsInfos.list ? coinsInfos.list.get(id).id_gecko : "";
console.log(coinsInfos, "DECOINPAGE");
    alert("id et type de coinpage " + id + " " +type);

///APIcalls
useEffect(() => {
    if (coinInfo == [] && id_paprika){
        let resp = DataProvider.getCoinInfoGecko(id_gecko);
        let infos = resp.data.map((val) => {return val;});
        setCoinInfo(infos);
    }
    if (coinTwitter == [] && id_paprika){
        let resp = DataProvider.getCoinTwitterPaprika(id_paprika);
        let infos = resp.data.map((val) => {return val;});
        setCoinTwitter(infos);
    }
    if (coinEvents == [] && id_paprika){
        let resp = DataProvider.getCoinEventsPaprika(id_paprika);
        let infos = resp.data.map((val) => {return val;});
        setCoinEvents(infos);
    }
    if (coinMarkets == [] && id_paprika){
        let resp = DataProvider.getCoinMarketsPaprika(id_paprika);
        let infos = resp.data.map((val) => {return val;});
        setCoinMarkets(infos);
    }
    
 
})
    



    return (<>
        <div className="container">
<CoinPageHeader/> 
<CoinPageNavBar/>
 
  
      {
         type === 'about' ? <CoinAbout /> :
         type === 'chart' ? <CoinChart /> :
         type === 'medias' ? <CoinMedias /> :
         type === 'markets' ? <CoinMarkets /> : null
      }

{/* <BrowserRouter>
<Switch>
              <Route  exact path="(/coin/:id)(/about)">
               <CoinAbout />
               </Route>
               <Route  exact path={`/coin/${id}/chart`}>
               <CoinChart />
               </Route>
               <Route exact path={`/coin/${id}/medias`}>
               <CoinMedias />
               </Route>
               <Route exact path={`(/coin/${id})(/markets)`}>
               <CoinMarkets />
               </Route>

            </Switch>
            </BrowserRouter> */}
</div>
   </>
    );

}