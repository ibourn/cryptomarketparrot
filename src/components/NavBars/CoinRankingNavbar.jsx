import React, { useState, useEffect, useContext } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { LoginContext } from "../AuthRoute/LoginContext";
import { ThemeContext } from "../ThemeToggler/ThemeContext";

import styled from 'styled-components';




const CoinRankingNavBar = () => {
    const [isDownCrypto, setIsDownCrypto] = useState(false);
    const [isDownExchange, setIsDownExchanges] = useState(false);
    const [isDownWatchlist, setIsDownWatchlist] = useState(false);
 
    const toggleDropDownCrypto = () => {
        setIsDownCrypto(oldValue => !oldValue);
    }
    const toggleDropDownExchange = () => {
        setIsDownExchanges(oldValue => !oldValue);
   }  
      const toggleDropDownWatchlist = () => {
        setIsDownWatchlist(oldValue => !oldValue);
   }


   // const targetClass = isOpen ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
//    const triggerClass = isOpen ? 'navbar-toggler navbar-toggler-right collapsed' : 'navbar-toggler navbar-toggler-right';

    const navClass = "navbar navbar-expand-lg navbar-light sticky-top";
    const ulClass = "navbar-nav mr-auto";
    const liClass = "nav-item mr-3";
    const linkClass = "navbar-link";

    const btnLoginClass = "btn btn-sm btn-light";
    const btnSignUpClass = "btn btn-sm btn-primary";

    const liDropdown = "nav-item dropdown active";
    const triggerMenu = "nav-link dropdown-toggle";
    const menuCryptoClass = "dropdown-menu" + (isDownCrypto ? " show active" : "");
    const menuExchangeClass = "dropdown-menu" + (isDownExchange ? " show" : "");
    const menuWatchlistClass = "dropdown-menu" + (isDownWatchlist ? " show" : "");
    const menuItemClass = "dropdown-item";
   return (
       <div className="d-flex justify-content-between">
    <ul class="nav nav-tabs">
    <li class={liDropdown}>
      <a class={triggerMenu} onClick={toggleDropDownCrypto} onBlur={toggleDropDownCrypto} data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
      <div class={menuCryptoClass}>
        <NavLink to="/" className={menuItemClass}>Top100</NavLink>
        <NavLink to="/" className={menuItemClass}>Deritatives</NavLink>       
        <NavLink to="/" className={menuItemClass}>Defi</NavLink>  
               </div>
    </li>
    <li class={liDropdown}>
      <a class={triggerMenu} onClick={toggleDropDownExchange} onBlur={toggleDropDownExchange} data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
      <div class={menuExchangeClass}>
      <NavLink to="/" className={menuItemClass}>Spot Exchanges</NavLink>  
      <NavLink to="/" className={menuItemClass}>Derivative Exchanges</NavLink>        </div>
    </li>
    <li class={liDropdown}>
      <a class={triggerMenu}  onClick={toggleDropDownWatchlist} onBlur={toggleDropDownWatchlist} data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
      <div class={menuWatchlistClass}>
      <NavLink to="/" className={menuItemClass}>Action</NavLink>  
      <NavLink to="/" className={menuItemClass}>Action</NavLink>  
      <NavLink to="/" className={menuItemClass}>Action</NavLink>  
      </div>
    </li>
  </ul>
  <div className="d-flex justify-content-end">
  <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
  <i class="fas fa-filter"></i>Fliters
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item" href="#">Action</a>
    <a class="dropdown-item" href="#">Another action</a>
    <a class="dropdown-item" href="#">Something else here</a>
  </div>
</div>
<div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    
    devises
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item" href="#">Action</a>
    <a class="dropdown-item" href="#">Another action</a>
    <a class="dropdown-item" href="#">Something else here</a>
  </div>
</div>
<button>
    next100
</button>
</div>

  </div>
    );
}


export default withRouter(CoinRankingNavBar);