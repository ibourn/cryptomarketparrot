import React, { useState, useContext } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { ThemeContext } from "../ThemeToggler/ThemeContext";
import { lightTheme, darkTheme } from '../../themes/Theme';

import styled from 'styled-components';


/**
 * Styles
 */
const LiTab = styled.li`
font-size: 0.8rem;
font-weight: bold;
height: 1.5rem;
line-height: 0.2rem;
`;
const LiWatchlist = styled(LiTab)`
min-width: 8vw;
`;
const LiMarkets = styled(LiTab)`
min-width: 8vw;
`;
const LiCrypto = styled(LiTab)`
min-width: 12vw;
`;


const Nav = styled.nav`
ul{
  background-color: ${props => (props.theme === 'light' ? lightTheme.body : darkTheme.body)};
  div{
    font-size: 0.7rem;
   background-color: ${props => (props.theme === 'light' ? lightTheme.body : darkTheme.body)};
  }
}
.filter{
  * {
    padding:0;
  margin:0;
  }
  background-color: ${props => (props.theme === 'light' ? lightTheme.body : darkTheme.body)};
  div{
    font-size: 0.7rem;
   background-color: ${props => (props.theme === 'light' ? lightTheme.body : darkTheme.body)};
  }
  label{
    color: ${props => (props.theme === 'light' ? lightTheme.text : darkTheme.text)};
    padding-top: 0.5rem;
  }
  input{
    margin-bottom: 0.5rem;
  }
  .container{
    width: 600px;
     margin-left: -70%;
  }
  #btn-filter{
    width: 3.5vw;
    margin-top: 0.9rem;
    margin-left: 5%;
  }
  a{
    color: ${props => (props.theme === 'light' ? lightTheme.text : darkTheme.text)};
  }
}

`;

const Btn = styled.button`
 font-size: 0.7rem;
 height: 1.5rem;
 background-color: ${props => (props.theme === 'light' ? lightTheme.body : darkTheme.body)};

`;
const BtnCur = styled(Btn)`
min-width: 6vw;
color: ${props => (props.theme === 'light' ? lightTheme.text : darkTheme.text)};
`;
const BtnFilter = styled(Btn)`
min-width: 8vw;
color: ${props => (props.theme === 'light' ? lightTheme.text : darkTheme.text)};
`;
const BtnPage = styled(Btn)`
min-width: 5.5vw;

`;


/**
 * 
 * CoinRanking navbar
 * 
 * @todo modify a to btn in menu 
 */
const CoinRankingNavBar = (props) => {

  /**
   * States
   */
  const { theme } = useContext(ThemeContext);

  const [isDownCrypto, setIsDownCrypto] = useState(false);
  const [isDownExchange, setIsDownExchanges] = useState(false);
  const [isDownWatchlist, setIsDownWatchlist] = useState(false);
  const [isDownDevise, setIsDownDevise] = useState(false);
  const [isDownFilter, setIsDownFilter] = useState(false);



/**
   * style of the dropdown filter
   */


  /**
   * Style classNames
   * 
   * @todo BUG button market and watchlist => dropdown not opening
   */
  const liDropdown = "nav-item dropdown";
  const triggerMenu = "nav-link dropdown-toggle";
  const menuCryptoClass = "dropdown-menu" + (isDownCrypto ? " show" : "");
  const menuExchangeClass = "dropdown-menu" + (isDownExchange ? " show" : "");
  const menuWatchlistClass = "dropdown-menu" + (isDownWatchlist ? " show" : "");
  const menuItemClass = "dropdown-item";

  const menuDeviseClass = "dropdown-menu" + (isDownDevise ? " show" : "");
  const triggerBtnMenu = "btn btn-sm btn-outline-light dropdown-toggle"
  const itemUSDClass = "dropdown-item" + (props.devise === "USD" ? " active" : "");
  const itemBTCClass = "dropdown-item" + (props.devise === "BTC" ? " active" : "");

  const menuFilterClass = "dropdown-menu" + (isDownFilter ? " show" : "");
  const triggerFilterMenu = "btn btn-sm btn-outline-light dropdown-toggle";

  const btnPagePrvClass = "btn btn-sm btn-outline-light text-primary" +
  (props.page.current === 0 ? " disabled" : "");
  const btnPageNxtClass = "btn btn-sm btn-outline-light text-primary" +
  (props.page.current === props.page.last - 1 ? " disabled" : "");
/*to remove the original dropdown box*/
  const filterBckgrndColor =  {backgroundColor: `transparent`} ;

  const pageStyle = (theme === 'light' ?
   {backgroundColor: lightTheme.body, borderColor : lightTheme.border} : 
   {backgroundColor: darkTheme.body , borderColor : darkTheme.border});

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
    <Nav className="d-flex justify-content-between" theme={theme}>

      <ul className="nav nav-tabs">
        <LiCrypto className={liDropdown}>
          <a className={triggerMenu} onClick={toggleDropDownCrypto}
            onBlur={toggleDropDownCrypto} data-toggle="dropdown" href="#" role="button" aria-haspopup="true"
            aria-expanded="false">Cryptocurrencies</a>
          <div className={menuCryptoClass}>
            <NavLink to="/" className={menuItemClass}>Top50</NavLink>
            <NavLink to="/" className={menuItemClass}>Deritatives</NavLink>
            <NavLink to="/" className={menuItemClass}>Defi</NavLink>
          </div>
        </LiCrypto>
        <LiMarkets class={liDropdown}>
          <a class={triggerMenu} onClick={toggleDropDownExchange}
            onBlur={toggleDropDownExchange} data-toggle="dropdown" href="#" role="button" aria-haspopup="true"
            aria-expanded="false">Markets</a>
          <div class={menuExchangeClass}>
            coming soon...
      </div>
        </LiMarkets>
        <LiWatchlist class={liDropdown}>
          <a class={triggerMenu} onClick={toggleDropDownWatchlist}
            onBlur={toggleDropDownWatchlist} data-toggle="dropdown" href="#" role="button" aria-haspopup="true"
            aria-expanded="false">Watchlist</a>
          <div class={menuWatchlistClass}>
            coming soon...
      </div>
        </LiWatchlist>
      </ul>

      <div className="d-flex justify-content-end filter" style={pageStyle}>

        <div class="dropdown filter">
          <BtnFilter class={triggerFilterMenu} theme={theme}
          style={pageStyle} onClick={toggleDropDownFilter}
             type="button" id="dropdownFilterButton" data-toggle="dropdown" aria-haspopup="true"
            aria-expanded="false">
            <i class="fas fa-filter"></i>Filters
           </BtnFilter>
          <div class={menuFilterClass}  theme={theme} style={filterBckgrndColor} aria-labelledby="dropdownFilterButton">
            <div className="container row d-flex justify-content-around" >
              <div className="col-2">
                <label for="minCapInput">Min Cap:</label>
                <input id="minCapInput" type="number" placeholder={0}
                  min={0} max={999999999999} name="minCapInput" />
                <label for="maxCapInput">Max Cap:</label>
                <input id="maxCapInput" type="number" placeholder={999999999999}
                  min={0} max={999999999999} name="maxCapInput" />
              </div>
              <div className="col-2">
                <label for="minSupInput">Min Supply:</label>
                <input id="minSupInput" type="number" placeholder={0}
                  min={0} max={999999999999} name="minSupInput" />
                <label for="maxSupInput">Max Supply:</label>
                <input id="maxSupInput" type="number" placeholder={999999999999}
                  min={0} max={999999999999} name="maxSupInput" />
              </div>
              <div className="col-2">
                <label for="minVarDayInput">Min Var(h24):</label>
                <input id="minVarDayInput" type="number" placeholder={-100}
                  min={-100} max={1000000} name="minVarDayInput" />
                <label for="maxVarDayInput">Max Var(h24):</label>
                <input id="maxVarDayInput" type="number" placeholder={10000}
                  min={-100} max={1000000} name="maxVarDayInput" />
              </div>
              <div className="col-2">
                <label for="minVarAthInput">Min Var(ath):</label>
                <input id="minVarAthInput" type="number" placeholder={-100}
                  min={-100} max={1000000} name="minVarAthInput" />
                <label for="maxVarAthInput">Max Var(ath):</label>
                <input id="maxVarAthInput" type="number" placeholder={10000}
                  min={-100} max={1000000} name="maxVarAthInput" />
              </div>
              <div className="col-2">
                <label for="minPriceInput">Min price:</label>
                <input id="minPriceInput" type="number" placeholder={0}
                  min={0} max={999999999999} name="minPriceInput" />
                <label for="maxPriceInput">Max price:</label>
                <input id="maxPriceInput" type="number" placeholder={999999999999}
                  min={0} max={999999999999} name="maxPriceInput" />
              </div>
              <div className="col-1">
                <button class="btn btn-secondary" id="btn-filter" onClick={changeFilter}
                  type="button" >Filter</button>
              </div>
            </div>
          </div>
        </div>

        <div class="dropdown">
          <BtnCur class={triggerBtnMenu} theme={theme} style={pageStyle}
          onClick={toggleDropDownDevise} type="button" id="dropdownCurButton" data-toggle="dropdown" aria-haspopup="true"
            aria-expanded="false">
            devises
         </BtnCur>
          <div className={menuDeviseClass} aria-labelledby="dropdownCurButton">
            <a className={itemUSDClass} theme={theme} onClick={toggleDeviseUSD} href="">USD</a>
            <a className={itemBTCClass} theme={theme} onClick={toggleDeviseBTC} href="">BTC</a>
          </div>
        </div>

        <BtnPage className={btnPagePrvClass} style={pageStyle}
        onClick={handleClickPagePrv}>
          prev100
      </BtnPage>
        <BtnPage className={btnPageNxtClass} style={pageStyle}
         onClick={handleClickPageNxt}>
          next100
        </BtnPage>
      </div>

    </Nav>
  );
}


export default withRouter(CoinRankingNavBar);