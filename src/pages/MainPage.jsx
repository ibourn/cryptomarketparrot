import React, {useState, useContext, useEffect} from 'react';
import { BrowserRouter, Switch, Route, useHistory, useParams } from 'react-router-dom';
import { DataContext } from "../components/NavBars/DataContext";
import { DataProvider } from "../modules/DataProvider";

import styled from 'styled-components';

import MainPageHeader from "../components/Headers/MainPageHeader"
import MainPageNavBar from "../components/NavBars/MainPageNavBar"
import RankingsPage from "./mainpages/RankingsPage";
import CoinsPage from "./mainpages/CoinsPage";
import Loader from "../components/Loader/Loader";

import HorzPubBanner from "../components/Banners/HorizontalPubBanner";
import VertPubBanner from "../components/Banners/VerticalPubBanner";

import { useClose } from "../components/Banners/useClose";


 const DivVertPub = styled.div`
//  @media (max-width: 1000px) {
//     transform: translateX(100px);
}
 `;


/************************************
 * 
 * MainPage
 * 
 * ******************************** */
export default function MainPage(props) {
   // const [isOpened, setIsOpened] = useState(true);
    const { id, type } = useParams();

    const { coinsInfos, setCoinsInfos } = useContext(DataContext);
     const [showBanner, closeBanner] = useClose(true);

  //  const { coinsInfos, setCoinsInfos } = useContext(DataContext);
   /* const [coinsInfos, setCoinsInfos] = useState({
        dictionary: [],
        list:[]}
        );*/

   /* const loadCoinsInfos = (dico, list) => {
        setCoinsInfos({
            dictionary: dico, 
            coinsList: list
        });
        console.log(dico, "dico from main page");



    }*/

    console.log("HEHO JE SUIS APPELE MAINAPAGE");


let a=false;

    useEffect( () => {
        if(coinsInfos.list.length == 0){
         componentDidMount();
        }
        let intervalloading = null;

      //  if(!isOpened){
      //      (a =true);
        //}
     
    })



    const essai = coinsInfos.list.length == 0 ?<div className="container">

    <Loader/>
    </div> : "";
    const componentDidMount = async () => {
        //const response = await axios.get(coinsTickers);


        ///ATTENTION LIMITER APPEL API => test state == []

        const dictionary =[];

        await DataProvider.getCoinList().then((datas)=>{
          for (const [key,val] of datas) {
          dictionary.push(val.name.toLowerCase() + " " + val.symbol.toLowerCase());
        }
          
          //props.loadCoinsInfos(dictionary,datas);

          setCoinsInfos(()=>{
            const infos = {
              dictionary: dictionary,
            list: datas
            }
            return infos;
          });

        });
    }

    /*
    * function passed to Pub compenent, thus the bannercloser can forward 
    * the change to set the corresonpding col class
    */
    const closePub = () => {
   //     setIsOpened(false);
    }
    const colMainClass = "colMainPage" + (showBanner ? " col-10" : " col-12");
    const colPubClass =  (showBanner ? " col-2" : " col-0");


    //                                <Route exact strict path="/" component={RankingsPage} />

   // console.log(coinsInfos.dictionary, "dico from main page avant render");
    return (
        <BrowserRouter>
        <div className="globalContainer container-fluid">


            <MainPageHeader />
            <MainPageNavBar />
            <div className="row no-gutters">
                <div className={colMainClass}>
                <HorzPubBanner />
                    <div>
                        {essai == "" ? 

                            <Switch>

                                <Route exact strict path="/" >
                                <RankingsPage pubIsOpen={showBanner}/> 
                                </Route>
                                
                                <Route   path="/coin/:id/:type" >
                                <CoinsPage coin={id}  />
                                </Route>
                                <Route   path="/coin/:id/chart" >
                                <CoinsPage coin={id}  />
                                </Route>
                            </Switch>

                        : essai }
                    </div>
                </div>
                <DivVertPub className={colPubClass}>
                <VertPubBanner closeBanner={closeBanner} showBanner={showBanner}/>
                </DivVertPub>

            </div>
        </div>
        </BrowserRouter>

    );

}