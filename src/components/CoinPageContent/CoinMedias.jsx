import React, { useEffect } from 'react';
import { useHistory, useParams, Link } from "react-router-dom";


/************************************
 * 
 * CoinsPage
 * 
 * ******************************** */

export default function CoinsPage(props) {
    

///APIcalls
return(
<div className="row"> 

<ul> From Twitter :
{
props.coinTwitter.map(res => {
   return (
  
   <li key={res.status_id}><Link to={res.status_link}>{res.status}</Link></li>
   
   )
})

} 
</ul>

<script src="https://cointelegraph.com/news-widget" data-ct-widget-limit="5"
 data-ct-widget-theme="light" data-ct-widget-size="small" 
 data-ct-widget-priceindex="true" data-ct-widget-images="true" 
 data-ct-widget-currency="USD" 
 data-ct-widget-category={`altcoin,bitcoin,${props.coinsInfos.list.get(props.coin).name}`} data-ct-widget-language="en">LE WIDGET</script>


MEDIAS</div>


)

}