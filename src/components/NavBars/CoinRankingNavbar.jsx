import React, { useState, useEffect, useContext } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { LoginContext } from "../AuthRoute/LoginContext";
import { ThemeContext } from "../ThemeToggler/ThemeContext";

//import styled from 'styled-components';



/**
 * 
 * CoinRanking navbar
 */
const CoinRankingNavBar = (props) => {

  /**
   * States
   */
  const [isDownCrypto, setIsDownCrypto] = useState(false);
  const [isDownExchange, setIsDownExchanges] = useState(false);
  const [isDownWatchlist, setIsDownWatchlist] = useState(false);
  const [isDownDevise, setIsDownDevise] = useState(false);
  const [isDownFilter, setIsDownFilter] = useState(false);

  /**
   * Style classNames
   */
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
  const itemUSDClass = "dropdown-item" + (props.devise == "USD" ? " active" : "");
  const itemBTCClass = "dropdown-item" + (props.devise == "BTC" ? " active" : "");

  const menuFilterClass = "dropdown-menu" + (isDownFilter ? " show" : "");
  const triggerFilterMenu = "btn btn-secondary dropdown-toggle";

  const btnPagePrvClass = "btn btn-sm btn-light" + (props.page.current == 0 ? " disabled" : "");
  const btnPageNxtClass = "btn btn-sm btn-light" + (props.page.current == props.page.last - 1 ? " disabled" : "");

  /**
   * toggle functions
   */
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
  /**
   * get vs_currency to pass to parent
   */
  const toggleDeviseUSD = () => {
    props.toggleDevise("USD");
  }
  const toggleDeviseBTC = () => {
    props.toggleDevise("BTC");
  }

  /**
   * get filters to pass to parent
   */
  const changeFilter = () => {
    props.changeFilter(
      document.getElementById("minCapInput").value ? document.getElementById("minCapInput").value : 0,
      document.getElementById("maxCapInput").value ? document.getElementById("maxCapInput").value : 999999999999,
      document.getElementById("minSupInput").value ? document.getElementById("minSupInput").value : 0,
      document.getElementById("maxSupInput").value ? document.getElementById("maxSupInput").value : 999999999999,
      document.getElementById("minVarDayInput").value ? document.getElementById("minVarDayInput").value : -100,
      document.getElementById("maxVarDayInput").value ? document.getElementById("maxVarDayInput").value : 10000,
      document.getElementById("minVarAthInput").value ? document.getElementById("minVarAthInput").value : -100,
      document.getElementById("maxVarAthInput").value ? document.getElementById("maxVarAthInput").value : 10000,
      document.getElementById("minPriceInput").value ? document.getElementById("minPriceInput").value : 0,
      document.getElementById("maxPriceInput").value ? document.getElementById("maxPriceInput").value : 999999999999,
    );
  }

  /**
   * get page change to pass to parent
   */
  const handleClickPagePrv = () => {
    props.handleClickPage(-1);
  }
  const handleClickPageNxt = () => {
    props.handleClickPage(1);
  }


  return (
    <nav className="d-flex justify-content-between">

      <ul className="nav nav-tabs">
        <li className={liDropdown}>
          <a className={triggerMenu} onClick={toggleDropDownCrypto}
            onBlur={toggleDropDownCrypto} data-toggle="dropdown" href="#" role="button" aria-haspopup="true"
            aria-expanded="false">Cryptocurrencies</a>
          <div className={menuCryptoClass}>
            <NavLink to="/" className={menuItemClass}>Top100</NavLink>
            <NavLink to="/" className={menuItemClass}>Deritatives</NavLink>
            <NavLink to="/" className={menuItemClass}>Defi</NavLink>
          </div>
        </li>
        <li class={liDropdown}>
          <a class={triggerMenu} onClick={toggleDropDownExchange}
            onBlur={toggleDropDownExchange} data-toggle="dropdown" href="#" role="button" aria-haspopup="true"
            aria-expanded="false">Markets</a>
          <div class={menuExchangeClass}>
            coming soon...
      </div>
        </li>
        <li class={liDropdown}>
          <a class={triggerMenu} onClick={toggleDropDownWatchlist}
            onBlur={toggleDropDownWatchlist} data-toggle="dropdown" href="#" role="button" aria-haspopup="true"
            aria-expanded="false">Watchlist</a>
          <div class={menuWatchlistClass}>
            coming soon...
      </div>
        </li>
      </ul>

      <div className="d-flex justify-content-end">

        <div class="dropdown">
          <button class={triggerFilterMenu} onMouseOver={toggleDropDownFilter}
            onBlur={toggleDropDownFilter} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
            aria-expanded="false">
            <i class="fas fa-filter"></i>Filters
           </button>
          <div class={menuFilterClass} aria-labelledby="dropdownMenuButton">
            <div className="container-fluid row"
              style={{ width: 1000, marginLeft: -700, backgroundColor: 'white' }}>
              <div className="col-2">
                <label for="minCapInput">Min Cap :</label>
                <input id="minCapInput" type="number" placeholder={0}
                  min={0} max={999999999999} name="minCapInput" />
                <label for="maxCapInput">Max Cap :</label>
                <input id="maxCapInput" type="number" placeholder={999999999999}
                  min={0} max={999999999999} name="maxCapInput" />
              </div>
              <div className="col-2">
                <label for="minSupInput">Min Supply :</label>
                <input id="minSupInput" type="number" placeholder={0}
                  min={0} max={999999999999} name="minSupInput" />
                <label for="maxSupInput">Max Supply :</label>
                <input id="maxSupInput" type="number" placeholder={999999999999}
                  min={0} max={999999999999} name="maxSupInput" />
              </div>
              <div className="col-2">
                <label for="minVarDayInput">Min Var(h24) :</label>
                <input id="minVarDayInput" type="number" placeholder={-100}
                  min={-100} max={1000000} name="minVarDayInput" />
                <label for="maxVarDayInput">Max Var(h24) :</label>
                <input id="maxVarDayInput" type="number" placeholder={10000}
                  min={-100} max={1000000} name="maxVarDayInput" />
              </div>
              <div className="col-2">
                <label for="minVarAthInput">Min Var(ath) :</label>
                <input id="minVarAthInput" type="number" placeholder={-100}
                  min={-100} max={1000000} name="minVarAthInput" />
                <label for="maxVarAthInput">Max Var(ath) :</label>
                <input id="maxVarAthInput" type="number" placeholder={10000}
                  min={-100} max={1000000} name="maxVarAthInput" />
              </div>
              <div className="col-2">
                <label for="minPriceInput">Min price :</label>
                <input id="minPriceInput" type="number" placeholder={0}
                  min={0} max={999999999999} name="minPriceInput" />
                <label for="maxPriceInput">Max price :</label>
                <input id="maxPriceInput" type="number" placeholder={999999999999}
                  min={0} max={999999999999} name="maxPriceInput" />
              </div>
              <div className="col-2">
                <button class="btn btn-secondary" onClick={changeFilter}
                  type="button" >Filter</button>
              </div>
            </div>
          </div>
        </div>

        <div class="dropdown">
          <button class={triggerBtnMenu} onMouseOver={toggleDropDownDevise}
            onBlur={toggleDropDownDevise} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
            aria-expanded="false">
            devises
         </button>
          <div className={menuDeviseClass} aria-labelledby="dropdownMenuButton">
            <a className={itemUSDClass} onClick={toggleDeviseUSD} href="#">USD</a>
            <a className={itemBTCClass} onClick={toggleDeviseBTC} href="#">BTC</a>
          </div>
        </div>

        <button className={btnPagePrvClass} onClick={handleClickPagePrv}>
          prev100
      </button>
        <button className={btnPageNxtClass} onClick={handleClickPageNxt}>
          next100
        </button>
      </div>

    </nav>
  );
}


export default withRouter(CoinRankingNavBar);