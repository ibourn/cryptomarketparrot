import React from 'react';
import { useHistory, useParams } from "react-router-dom";


/************************************
 * 
 * CoinsPage
 * 
 * ******************************** */

export default function CoinsPage(props) {
    

///APIcalls
return(
<div className="row">   
{
props.coinTwitter.map(res => {
   return <div className="row">{res.status}</div>
})

} 
MEDIAS</div>


)

}