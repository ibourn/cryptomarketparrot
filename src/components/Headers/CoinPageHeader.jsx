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
    <>
<div className="row">    
<div className="col-4">name</div><div className="col-4">price</div>
<div className="col-4">supply</div>
</div>
 <div className="row">
 <div className="col-4">liens</div><div className="col-8">details</div>
</div>

</>
)

}
