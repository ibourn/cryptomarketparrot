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
import Loader from "../../components/Loader/Loader";

/************************************
 * 
 * CoinsPage
 * 
 * ******************************** */

const CoinsPage = (props) => {
    const history = useHistory();
    const { id, type} = useParams()
    const [u,v] = useState();
    const [coinInfo,setCoinInfo] = useState([]);
    const [coinTwitter,setCoinTwitter] = useState([]);
    const [coinEvents,setCoinEvents] = useState([]);
    const [coinMarkets,setCoinMarkets] = useState([]);
    const { coinsInfos, setCoinsInfos } = useContext(DataContext);


    console.log("HEHO JE SUIS APPELE coinpage");
//TODO
    //LOAD coinsInfos ds mainpage to make it available 
    //const id_paprika = "btc-bitcoin";//coinsInfos.list ? coinsInfos.list.get(id).id_paprika : "";
    //const id_gecko = "bitcoin";//coinsInfos.list ? coinsInfos.list.get(id).id_gecko : "";


    //TODO load file with tickers from exchange (https://github.com/pouet2/tvlists 
    //https://gist.github.com/cryppadotta)
    //=> associate list to coinsInfos
    //check if symbol exist fot TV (to try USD USDT... then BTC ETH)
    console.log(id, type, "PATH3");
   //const id_tview = props.coin.toUpperCase() + "USD";
     const id_tview = id.toUpperCase() + "USD";

    console.log(coinsInfos, "DECOINPAGE");
   // alert("id et type de coinpage " + id + " " +type);

    console.log(coinsInfos.list);
    console.log(id);
    console.log(coinsInfos.list.get(id).paprika_id);
    const id_paprika = coinsInfos.list.get(id).paprika_id;
        const id_gecko = coinsInfos.list.get(id).gecko_id;
        console.log(coinInfo, "AU DEBUT");

///APIcalls
useEffect(() => {
   // console.log(coinInfo, "DS USEEFFECT", "res de test : " + (coinInfo ==  []));
   /* if (coinInfo == [] && id_paprika){
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
    }*/
console.log("useeffectcoinspage");
testHorsEffect(id_tview);
    
//});
},[id_tview]);
    
function testHorsEffect(id_tview) {
    if(coinInfo != undefined){
    if(coinInfo.length == 0){
        console.log("useeffect qd sis mount"); 
    
        let respInfos = DataProvider.getCoinInfoGecko(id_gecko);
        /*.then((response) => {
            if(response.status == 200) {
                return response.data;
                console.log(response.data);
            } else {
                console.log("unavailable");
                return "unavailable";
                console.log("unavailable");
            }
        });*/
        let respTwitter = DataProvider.getCoinTwitterPaprika(id_paprika);
        let respEvents= DataProvider.getCoinEventsPaprika(id_paprika);
        let respMarkets = DataProvider.getCoinMarketsPaprika(id_paprika);


        Promise.all([respInfos,respTwitter,respEvents,respMarkets]).then((responses) => {
            setCoinInfo(responses[0].data);
            setCoinTwitter(responses[1].data);
            setCoinEvents(responses[2].data);
            setCoinMarkets(responses[3].data);
            console.log(responses[1].data, "DEPROMISEALL");
        }

        )

    }
    }


}

console.log("FROM coinpagE", coinInfo);
    return (<>
     <BrowserRouter>
     { coinInfo == undefined  ? <div className="container">

<Loader/>
</div> : coinInfo.length == 0 ? <div className="container">

<Loader/>
</div> : 
        <div className="container">
<CoinPageHeader coinInfo={coinInfo} coin={coinsInfos.list.get(id)}/> 
<CoinPageNavBar coin={id}/>
 

  
      {/* {
         type === 'about' ? <CoinAbout coinInfo={coinInfo} coinEvents={coinEvents}/> :
         type === 'chart' ? <CoinChart coin={id_tview} /> :
         type === 'medias' ? <CoinMedias coinTwitter={coinTwitter}/> :
         type === 'markets' ? <CoinMarkets coinMarkets={coinMarkets}/> : null
      } */}


<Switch>
              <Route  exact path={`/coin/${id}/about`}>
               <CoinAbout coinInfo={coinInfo} coinEvents={coinEvents} ident={coinsInfos.list.get(id)}/>
               </Route>
               <Route  exact path={`/coin/${id}/chart`}>
               <CoinChart coin={id_tview}/>
               </Route>
               <Route exact path={`/coin/${id}/medias`}>
               <CoinMedias coinTwitter={coinTwitter} coinsInfos={coinsInfos} coin={id}/>
               </Route>
               <Route exact path={`(/coin/${id})(/markets)`}>
               <CoinMarkets coinMarkets={coinMarkets} />
               </Route>

            </Switch>
</div>
}
</BrowserRouter>
   </>
    );

}

export default withRouter(CoinsPage);