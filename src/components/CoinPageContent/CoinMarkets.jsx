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

<table>
    <thead>
    <tr>
        <th>
Exchange
        </th>
        <th>
Pair
        </th>
        <th>
Price
        </th>
        <th>
Confidence
        </th>
        <th>
Volume (24h)
        </th>
    </tr>
    </thead>
    <tbody>
{

props.coinMarkets.map( (data) => {
return (<tr>
<td>
{data.exchange_name}
</td>
<td>
{data.pair}  
</td>
<td>
{data.quotes["USD"].price}
</td>
<td>
{data.trust_score}
</td>
<td>
{data.quotes["USD"].volume_24h}
</td>



</tr>)



})

}
    
        
    </tbody>
</table>

</div>


)

}