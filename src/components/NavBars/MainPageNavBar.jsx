import React, { useState, useContext } from "react";
import { NavLink, withRouter, useHistory } from "react-router-dom";
import { LoginContext } from "../AuthRoute/LoginContext";
import { DataContext } from "../NavBars/DataContext";
import { ThemeContext } from "../ThemeToggler/ThemeContext";
import ParrotBlack from "../../assets/parrot-colored-bird-mk-woodcut.svg";
import ParrotGray from "../../assets/Parrot-Remix-Grayscale-Request-2014110544.svg";

import { lightTheme, darkTheme } from '../../themes/Theme';
import styled from 'styled-components';


/**
 * Style
 */
const Nav = styled.nav`
  padding: 0;
  height: var(--navbar--main-height);
  font-size: 0.9rem;

border-style: solid none;
border-width: 1px;
border-color: ${({ theme }) => theme.border};

  .navbar-brand, #navbarContent{
    font-weight: bold;
  }
  #brand{
      line-height: 3rem;
  }
  input, button{
      height: 1.5rem;
  }
 button{
     width: 3.7rem;
   font-size: 0.7rem;
}
input{
    width: 15vw;
}

    `;

const SpanBrand = styled.span`   
vertical-align: center;
  `;
const DivContainer = styled.div`
    min-height: 35px;
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
 * @todo work on dropdowns (opening/closing)
 */
const MainPageNavBar = (props) => {
    /**
     * States and hooks
     */
    const history = useHistory();

    const { theme } = useContext(ThemeContext);
    const { coinsInfos } = useContext(DataContext);
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

    const btnLoginClass = "btn btn-sm" + (theme === 'light' ? " btn-light" : " btn-dark");
    const btnSignUpClass = "btn btn-sm btn-primary";

    const searchDropdown = "nav-item dropdown active ";
    const searchTriggerMenu = "nav-link dropdown-toggle  mr-sm-2";

    /* trick to force text color of navlink*/
    const textLinkColor = theme === 'light' ? 'black' : 'white';
    const linkStyle = {
        color: `${textLinkColor}`
    }
    const activeLink = {
        color: `${textLinkColor}`
    };
    const parrotLogo = theme === 'light' ? ParrotBlack : ParrotGray;
    const imgStyle = theme === 'light' ? { backgroundColor: `${lightTheme.body}` } : { backgroundColor: `${darkTheme.body}` }

    const containerStyle = theme === 'light' ? { backgroundColor: `${lightTheme.body}` } : { backgroundColor: `${darkTheme.body}` }

    const searchStyle = theme === 'light' ? { backgroundColor: `${lightTheme.body}` } : { backgroundColor: `${darkTheme.body}`, color: `${darkTheme.text}` }
  
    /**
     * Set the login state
     */
    const loginUser = () => {
        setIsAuth(true);
    };

    const logoutUser = () => {
        setIsAuth(false);
    };

    const signUpUser = () => {
        history.push("/signup")
    };

    /**
     * manage input text from user in search bar and compare to the dictionnary
     * to make propositions
     */
    const handleKeyUp = () => {
        if (!isDownSearch) {
            setIsDownSearch(true);
        }
        let counter = 0;
        const maxCounter = 10;
        let sample = [];
        const input = document.getElementById("searchInput");
        const filter = input.value.toUpperCase();

        for (let i = 0; i < coinsInfos.dictionary.length; i++) {
            let val = coinsInfos.dictionary[i];
            if (val.toUpperCase().indexOf(filter) > -1) {
                sample.push(val);
                counter += 1;
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

    /**
     * detect the user choice
     */
    const HandleOnInput = () => {
        const val = document.getElementById("searchInput").value;
        const opts = document.getElementById('coinSuggest').childNodes;
        for (let i = 0; i < opts.length; i++) {
            if (opts[i].value === val) {
                // An item was selected 
                const target = opts[i].value
                const res = target.split(" ");
                document.getElementById("searchInput").value = "";
                history.push(`/coin/${res[res.length - 1]}/chart`);
                break;
            }
        }

    }

    //<i class="fas fa-search"></i>
    return (
        <Nav className={navClass} 
            role="navigation" aria-label="main navigation">

            <DivContainer className="container" style={containerStyle}>
                <NavLink to="/" exact className="navbar-brand" style={linkStyle}
                    activeStyle={activeLink} >

                    <img src={parrotLogo} width="45px" height="45px" style={imgStyle}
                        className="d-inline-block align-top" alt="" />
                    <SpanBrand id="brand">CryptoMarketParrot</SpanBrand>
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
                                to="/exchange" exact
                                className={linkClass} style={linkStyle} activeStyle={activeLink}>
                                Exchange
                           </NavLink>
                        </li>
                        <li className={liClass}>
                            <NavLink to="/products" exact
                                className={linkClass} style={linkStyle} activeStyle={activeLink} >
                                Products
                           </NavLink>
                        </li>
                        <li className={liClass}>
                            <NavLink to="/tools" exact
                                className={linkClass} style={linkStyle} activeStyle={activeLink} >
                                Tools
                            </NavLink>
                        </li>
                        <li className={liClass}>
                            <NavLink to="/about" exact
                                className={linkClass} style={linkStyle} activeStyle={activeLink} >
                                About
                            </NavLink>
                        </li>
                    </ul>

                    {/* <div className="navbar"> */}
                    <div className="navbar-item button-wrapper">

                        <div className="buttons d-flex flex-row">

                            <div className={searchDropdown}>
                                <input className={searchTriggerMenu} style={searchStyle} type="search" list="coinSuggest"
                                    placeholder="Search for names.." aria-label="Search"
                                    id="searchInput" onInput={HandleOnInput} onKeyUp={handleKeyUp}
                                    onBlur={toggleSearchDropDown} data-toggle="dropdown" aria-haspopup="true" title="Type in a name" />
                                <datalist id="coinSuggest">
                                    {
                                        optionsList ?
                                            optionsList.map((val) => {
                                                return <option key={val} value={val} />
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
                            <button className={btnSignUpClass} onClick={signUpUser}>
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