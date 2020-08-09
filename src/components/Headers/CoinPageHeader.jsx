import React, { useContext } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { DataContext } from "../NavBars/DataContext";


/************************************
 * 
 * CoinsPage
 * 
 * ******************************** */

export default function CoinsPage(props) {
    
    const { coinsInfos, setCoinsInfos } = useContext(DataContext);

console.log(props.coinInfo);

///APIcalls
return(
    <>
<div className="row">  
<div className="col-3">
<p><img src={props.coinInfo.image.small} alt=""/></p>
<p><span>Market cap rank :</span><span>{props.coinInfo.market_data.market_cap_rank}</span></p>

<p><span>Category :</span><span>{props.coinInfo.categories.map((cat, index) => {
    if(index > 0 && cat != ""){
        return ", " + cat;
    } else {
        return cat
    }
})}</span></p>
</div>  
<div className="col-9">
<div className="row">
<div className="col-6">
<div className="row">
<span>{props.coinInfo.name}<span></span>{props.coinInfo.symbol}</span>
</div>
<div className="row">
<p><span>High (24h)</span><span>{props.coinInfo.market_data.high_24h.usd}</span></p>
<p><span>Low (24h)></span><span>{props.coinInfo.market_data.low_24h.usd}</span></p>
<p><span>Change % (24h)</span><span>{props.coinInfo.market_data.price_change_percentage_24h}</span></p>
<p><span>Total volume :</span><span>{props.coinInfo.market_data.total_volume.usd}</span></p>

</div>
    </div> 
    <div className="col-6">
    <div className="row">
    <p><span>Total supply :</span><span>{props.coinInfo.market_data.total_supply}</span></p>
<p><span>Circulating supply</span><span>{props.coinInfo.market_data.circulating_supply}</span></p>


    </div> 
    <div className="row">
    <p><span>Block time(min) :</span><span>{props.coinInfo.block_time_in_minutes}</span></p>


<p><span>Hash Algorithm :</span><span>{props.coinInfo.hashing_algorithm}</span></p>

    </div>
    </div> 
    </div> 
    </div> 
</div> 

</>
)

}
