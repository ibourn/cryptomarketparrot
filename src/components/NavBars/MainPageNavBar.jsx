import React, { useState, useContext } from "react";
import { NavLink, withRouter, useHistory } from "react-router-dom";
import { LoginContext } from "../AuthRoute/LoginContext";
import { DataContext } from "../NavBars/DataContext";
import { ThemeContext } from "../ThemeToggler/ThemeContext";
import ParrotBlack from "../../assets/parrot-colored-bird-mk-woodcut.svg";
import ParrotGray from "../../assets/Parrot-Remix-Grayscale-Request-2014110544.svg";

import styled from 'styled-components';
import Logo from "../../assets/Webpnet-livewebinar.png";


/**
 * Style
 */
const Nav = styled.nav`
  padding: 0;
  height: 4rem;
    `;

const DivContainer = styled.div`
    min-height: 35px;/* 100vh;*/
    min-width: 100%;    
  `;

const ButtonLogIn = styled.button`
    :hover {
      font-weight: bold;
    }
  `;

const ButtonLogOut = styled.button`
 
:hover {
    font-weight: bold;
  }
`;

const SpanToggler = styled.span`
  
`;

/**
 * 
 * MainPage navbar
 * 
 * @TODO work on dropdowns (opening/closing)
 */
const MainPageNavBar = (props) => {
    /**
     * States and hooks
     */
    const history = useHistory();

    const { theme, toggleTheme } = useContext(ThemeContext);
    const { coinsInfos, setCoinsInfos } = useContext(DataContext);
    const { isAuth, setIsAuth } = useContext(LoginContext);

    const [optionsList, setOptionsList] = useState();
    const [isDownSearch, setIsDownSearch] = useState(false);
    const [isOpen, setOpen] = useState(true);

    /**
     * Style classNames
     */
    const targetClass = isOpen ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
    const triggerClass = isOpen ? 'navbar-toggler navbar-toggler-right collapsed' : 'navbar-toggler navbar-toggler-right';

    const navClass = "navbar navbar-expand-lg navbar-light sticky-top";
    const ulClass = "navbar-nav mr-auto";
    const liClass = "nav-item mr-3";
    const linkClass = "navbar-link";

    const btnLoginClass = "btn btn-sm btn-light";
    const btnSignUpClass = "btn btn-sm btn-primary";

    const searchDropdown = "nav-item dropdown active ";
    const searchTriggerMenu = "nav-link dropdown-toggle  mr-sm-2";
    const searchMenu = "dropdown-menu" + (isDownSearch ? " show active" : "");
    const menuItemClass = "dropdown-item";

    /* trick to force text color of navlink*/
    const textLinkColor = theme === 'light' ? 'black' : 'white';
    const linkStyle = {
        color: `${textLinkColor}`
    }
    const activeLink = {
        color: `${textLinkColor}`
    };
    const parrotLogo = theme === 'light' ? ParrotBlack : ParrotGray;

    /**
     * Set the login state
     */
    const loginUser = () => {
        setIsAuth(true);
    };

    const logoutUser = () => {
        setIsAuth(false);
    };

    /**
     * manage input text from user in search bar and compare to the dictionnary
     * to make propositions
     */
    const handleKeyUp = () => {
        let list;
        if (!isDownSearch) {
            setIsDownSearch(true);
        }
        let input, filter, value;
        let counter = 0;
        let maxCounter = 10;
        let sample = [];
        input = document.getElementById("searchInput");
        filter = input.value.toUpperCase();

        for (let i = 0; i < coinsInfos.dictionary.length; i++) {
            let val = coinsInfos.dictionary[i];
            if (val.toUpperCase().indexOf(filter) > -1) {
                sample.push(val);
                counter += 1;
                list += <option value={val} onClick={handleClickOption} />
            }
            if (counter === maxCounter) {
                break;
            }

        };
        setOptionsList(sample);
    }

    const toggleSearchDropDown = () => {
        setIsDownSearch(false);
    }

    //REMOVE
    const handleClickOption = () => {
        console.log(document.getElementById("searchInput").value, "input");

        // console.log(document.getElementById("coinSuggest").value, "input");
        var sel = document.getElementById('searchInput');
        var opt = sel.options[sel.selectedIndex];
        console.log(opt.value, "essai");
    }
    /**
     * manage the selection of the user
     */
    const HandleOnInput = () => {
        var val = document.getElementById("searchInput").value;
        var opts = document.getElementById('coinSuggest').childNodes;
        for (var i = 0; i < opts.length; i++) {
            if (opts[i].value === val) {
                // An item was selected 
                const target = opts[i].value
                const res = target.split(" ");
                history.push(`/coin/${res[res.length - 1]}/chart`);
                break;
            }
        }

    }


    return (
        <Nav className={navClass} role="navigation" aria-label="main navigation">

            <DivContainer className="container">
                <NavLink to="/" exact className="navbar-brand" style={linkStyle}
                    activeStyle={activeLink} >

                    <img src={parrotLogo} width="45px" height="45px"
                        class="d-inline-block align-top" alt="" />
                      CryptoMarketParrot
                </NavLink>

                <button className={`${triggerClass}`} onClick={() => setOpen(!isOpen)}
                    type="button" data-toggle="collapse" data-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                    <SpanToggler className="navbar-toggler-icon"></SpanToggler>
                </button>

                <div className={`${targetClass}`} id="navbarContent">
                    <ul className={ulClass}>
                        <li className={liClass}>
                            <NavLink to="/" exact className={linkClass} style={linkStyle}
                                activeStyle={activeLink} >
                                Cryptocurrencies
                            </NavLink>
                        </li>
                        <li className={liClass}>
                            <NavLink
                                to="/about" exact
                                className={linkClass} style={linkStyle} activeStyle={activeLink}>
                                Exchange
                           </NavLink>
                        </li>
                        <li className={liClass}>
                            <NavLink to="/profile" exact
                                className={linkClass} style={linkStyle} activeStyle={activeLink} >
                                Products
                           </NavLink>
                        </li>
                        <li className={liClass}>
                            <NavLink to="/signup" exact
                                className={linkClass} style={linkStyle} activeStyle={activeLink} >
                                Tools
                            </NavLink>
                        </li>
                        <li className={liClass}>
                            <NavLink to="/signup" exact
                                className={linkClass} style={linkStyle} activeStyle={activeLink} >
                                Learn
                            </NavLink>
                        </li>
                    </ul>

                    {/* <div className="navbar"> */}
                    <div className="navbar-item">

                        <div className="buttons d-flex flex-row">

                            <div className={searchDropdown}>
                                <input className={searchTriggerMenu} type="search" list="coinSuggest"
                                    placeholder="Search for names.." aria-label="Search"
                                    id="searchInput" onInput={HandleOnInput} onKeyUp={handleKeyUp}
                                    onBlur={toggleSearchDropDown} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" title="Type in a name" />
                                <datalist id="coinSuggest">
                                    {
                                        optionsList ?
                                            optionsList.map((val) => {
                                                return <option key={val} value={val} onClick={handleClickOption} />
                                            })
                                            : null
                                    }
                                </datalist>
                            </div>

                            {!isAuth ? (
                                <ButtonLogIn className={btnLoginClass} onClick={loginUser}>
                                    Log in
                                </ButtonLogIn>
                            ) : (
                                    <ButtonLogOut className={btnLoginClass} onClick={logoutUser}>
                                        Log out
                                    </ButtonLogOut>
                                )}
                            <button className={btnSignUpClass} onClick={loginUser}>
                                Sign Up
                           </button>
                        </div>
                        {/* </div> */}
                    </div>
                </div>
            </DivContainer>
        </Nav>
    );
}


export default withRouter(MainPageNavBar);