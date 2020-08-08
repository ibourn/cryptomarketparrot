import React, { useState, useEffect, useContext } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { LoginContext } from "../AuthRoute/LoginContext";
import { ThemeContext } from "../ThemeToggler/ThemeContext";

import styled from 'styled-components';




const CoinRankingNavBar = (props) => {
    const [isDownCrypto, setIsDownCrypto] = useState(false);
    const [isDownExchange, setIsDownExchanges] = useState(false);
    const [isDownWatchlist, setIsDownWatchlist] = useState(false);
    const [isDownDevise, setIsDownDevise] = useState(false);
    const [isDownFilter, setIsDownFilter] = useState(false);
    
    const toggleDropDownCrypto = () => {
        setIsDownCrypto(oldValue => !oldValue);
    }
    const toggleDropDownExchange = () => {
        setIsDownExchanges(oldValue => !oldValue);
   }  
      const toggleDropDownWatchlist = () => {
        setIsDownWatchlist(oldValue => !oldValue);
   }
   const toggleDropDownDevise = () => {
    setIsDownDevise(oldValue => !oldValue);
}


const toggleDropDownFilter = () => {
  setIsDownFilter(oldValue => !oldValue);
}


   // const targetclassName = isOpen ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
//    const triggerclassName = isOpen ? 'navbar-toggler navbar-toggler-right collapsed' : 'navbar-toggler navbar-toggler-right';

    const navclassName = "navbar navbar-expand-lg navbar-light sticky-top";
    const ulclassName = "navbar-nav mr-auto";
    const liclassName = "nav-item mr-3";
    const linkclassName = "navbar-link";

    const btnLoginclassName = "btn btn-sm btn-light";
    const btnSignUpclassName = "btn btn-sm btn-primary";

    const liDropdown = "nav-item dropdown active";
    const triggerMenu = "nav-link dropdown-toggle";
    const menuCryptoClass = "dropdown-menu" + (isDownCrypto ? " show active" : "");
    const menuExchangeClass = "dropdown-menu" + (isDownExchange ? " show" : "");
    const menuWatchlistClass = "dropdown-menu" + (isDownWatchlist ? " show" : "");
    const menuItemClass = "dropdown-item";
  
   const menuDeviseClass = "dropdown-menu" + (isDownDevise ? " show" : "");
   const triggerBtnMenu = "btn btn-secondary dropdown-toggle"
   let itemUSDClass = "dropdown-item";
   let itemBTCClass = "dropdown-item";

   //RECUPERER PROP DE FILTRE
   const toggleDeviseUSD = () => {
    props.toggleDevise("USD");
    itemUSDClass = itemUSDClass + " active";

   }
   const toggleDeviseBTC = () => {
     props.toggleDevise("BTC");
     itemBTCClass = itemBTCClass + " active";

   }

   const changeFilter = () => {
    props.changeFilter(
      document.getElementById("minCapInput").value,
      document.getElementById("maxCapInput").value,
    );
   }

   const menuFilterClass= "dropdown-menu" + (isDownFilter ? " show" : "");
   const triggerFilterMenu= "btn btn-secondary dropdown-toggle"; 
    return (
       <div className="d-flex justify-content-between">
    <ul className="nav nav-tabs">
    <li className={liDropdown}>
      <a className={triggerMenu} onClick={toggleDropDownCrypto} onBlur={toggleDropDownCrypto} data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Cryptocurrencies</a>
      <div className={menuCryptoClass}>
        <NavLink to="/" className={menuItemClass}>Top100</NavLink>
        <NavLink to="/" className={menuItemClass}>Deritatives</NavLink>       
        <NavLink to="/" className={menuItemClass}>Defi</NavLink>  
               </div>
    </li>
    <li class={liDropdown}>
      <a class={triggerMenu} onClick={toggleDropDownExchange} onBlur={toggleDropDownExchange} data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Markets</a>
      <div class={menuExchangeClass}>
      coming soon...
      </div>
    </li>
    <li class={liDropdown}>
      <a class={triggerMenu}  onClick={toggleDropDownWatchlist} onBlur={toggleDropDownWatchlist} data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Watchlist</a>
      <div class={menuWatchlistClass}>
      coming soon...
      </div>
    </li>
  </ul>
  <div className="d-flex justify-content-end">
  <div class="dropdown">
  <button class={triggerFilterMenu} onMouseOver={toggleDropDownFilter} onBlur={toggleDropDownFilter} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
  <i class="fas fa-filter"></i>Fliters
  </button>
  <div class={menuFilterClass} aria-labelledby="dropdownMenuButton">
  <label for="minCapInput">Last name:</label>
  <input id="minCapInput" type="number" placeholder={0} min={0} max={99999999999} name="minCapInput"/>
  <label for="maxCapInput">Last name:</label>
  <input id="maxCapInput" type="number" placeholder={99999999999}  min={0} max={99999999999} name="maxCapInput"/>
  <button class="btn btn-secondary"  onClick={changeFilter} type="button" >Filter</button>

  </div>
</div>
<div class="dropdown">
  <button class={triggerBtnMenu} onMouseOver={toggleDropDownDevise} onBlur={toggleDropDownDevise} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    
    devises
  </button>
  <div className={menuDeviseClass} aria-labelledby="dropdownMenuButton">
    <a className={itemUSDClass} onClick={toggleDeviseUSD} href="#">USD</a>
    <a className={itemBTCClass} onClick={toggleDeviseBTC}  href="#">BTC</a>
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