


import React from 'react';
import { NavLink, withRouter } from "react-router-dom";
import { useHistory, useParams } from "react-router-dom";


/************************************
 * 
 * CoinsPage
 * 
 * ******************************** */

const CoinsPage = (props) => {
    const history = useHistory();
    const { id, type } = useParams();

    const itemClass = "nav-item";
    const linkclassName = "navbar-link";


///APIcalls
return(
<div  className="row">
<ul class="nav nav-tabs">
  <li className={itemClass}>
  <NavLink to={`/coin/${props.coin}/chart`} className={linkclassName}>Chart</NavLink>        
  </li>
  <li className={itemClass}>
  <NavLink to={`/coin/${props.coin}/markets`} className={linkclassName}>Markets</NavLink>        
  </li>
  <li className={itemClass}>
            <NavLink to={`/coin/${props.coin}/about`} className={linkclassName}>About</NavLink>        

  </li>
  <li className={itemClass}>
            <NavLink to={`/coin/${props.coin}/medias`} className={linkclassName}>Medias</NavLink>        
  </li>
</ul>
 </div>


)

}
export default withRouter(CoinsPage);