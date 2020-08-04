import React, { useState, useContext } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { LoginContext } from "../AuthRoute/LoginContext";
import { ThemeContext } from "../ThemeToggler/ThemeContext";
import ParrotBlack from "../../assets/parrot-colored-bird-mk-woodcut.svg";
import ParrotGray from "../../assets/Parrot-Remix-Grayscale-Request-2014110544.svg";

import styled from 'styled-components';
import Logo from "../../assets/Webpnet-livewebinar.png";

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




const MainPageNavBar = () => {


    const { isAuth, setIsAuth } = useContext(LoginContext);

    const [isOpen, setOpen] = useState(true);

    const loginUser = () => {
        setIsAuth(true);
    };

    const logoutUser = () => {
        setIsAuth(false);
    };

    const targetClass = isOpen ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
    const triggerClass = isOpen ? 'navbar-toggler navbar-toggler-right collapsed' : 'navbar-toggler navbar-toggler-right';

    const navClass = "navbar navbar-expand-lg navbar-light sticky-top";
    const ulClass = "navbar-nav mr-auto";
    const liClass = "nav-item mr-3";
    const linkClass = "navbar-link";

    const btnLoginClass = "btn btn-sm btn-light";
    const btnSignUpClass = "btn btn-sm btn-primary";

    /* trick to force text color of navlink*/
    const { theme, toggleTheme } = useContext(ThemeContext);
const textLinkColor = theme === 'light' ? 'black' : 'white';
const linkStyle = {
   color: `${textLinkColor}`

}
const activeLink = {
    color: `${textLinkColor}`
};
const parrotLogo = theme === 'light' ? ParrotBlack : ParrotGray;
    return (
        <Nav className={navClass} role="navigation" aria-label="main navigation">
            <DivContainer className="container">
            <NavLink to="/" exact className="navbar-brand" style={linkStyle} activeStyle={activeLink} >

             <img src={parrotLogo} width="45px" height="45px" class="d-inline-block align-top" alt=""/>
             CryptoMarketParrot
              </NavLink>


                <button className={`${triggerClass}`} onClick={() => setOpen(!isOpen)} type="button" data-toggle="collapse" data-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                    <SpanToggler className="navbar-toggler-icon"></SpanToggler>
                </button>

                <div className={`${targetClass}`} id="navbarContent">

                    <ul className={ulClass}>
                        <li className={liClass}>
                            <NavLink to="/" exact className={linkClass} style={linkStyle} activeStyle={activeLink} >
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
                            <div>
                        <form class="form-inline">
    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
    <button class="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button>
  </form></div>
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