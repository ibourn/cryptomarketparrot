


import React from 'react';
import { NavLink, withRouter } from "react-router-dom";
import { useHistory, useParams } from "react-router-dom";


/************************************
 * 
 * CoinsPage
 * 
 * ******************************** */

export default function CoinsPage(props) {
    const history = useHistory();
    const { id, type } = useParams();

    const itemClass = "nav-item";
    const linkclassName = "navbar-link";


///APIcalls
return(
<div  className="row">
<ul class="nav nav-tabs">
  <li className={itemClass}>
  <NavLink to={`/coin/${id}/chart`} className={linkclassName}>Chart</NavLink>        
  </li>
  <li className={itemClass}>
  <NavLink to={`/coin/${id}/markets`} className={linkclassName}>Markets</NavLink>        
  </li>
  <li className={itemClass}>
            <NavLink to={`/coin/${id}/about`} className={linkclassName}>About</NavLink>        

  </li>
  <li className={itemClass}>
            <NavLink to={`/coin/${id}/medias`} className={linkclassName}>Medias</NavLink>        
  </li>
</ul>
 </div>


)

}