import React, { useContext } from 'react';
import { NavLink, withRouter } from "react-router-dom";

import { ThemeContext } from "../ThemeToggler/ThemeContext";
import { lightTheme, darkTheme } from '../../themes/Theme';

import styled from 'styled-components';

/**
 * style
 * 
 * @todo fix bug opacity or position of the sticky tab to implement it
 */
const Nav = styled.nav`
font-size: 0.9rem;
font-weight: bold;
backgroundColor: ${ theme  => theme.body};
  color: ${theme  => theme.text};
  `;
/************************************
 * 
 * CoinPage navbar
 * 
 * ******************************** */
const CoinPageNavBar = (props) => {
  const { theme } = useContext(ThemeContext);

  const itemClass = "nav-item";
  const linkclassName = "nav-link";

  const activeStyle = theme === 'light' ? { backgroundColor: `${lightTheme.container}`,
  color: `${lightTheme.content}` } :{ backgroundColor: `${darkTheme.container}`,
  color: `${darkTheme.content}` }

  return (
    <Nav className="row" >
      <ul className="nav nav-tabs" >
        <li className={itemClass}>
          <NavLink to={`/coin/${props.coin}/chart`} activeStyle={activeStyle} className={linkclassName}>
            Chart</NavLink>
        </li>
        <li className={itemClass}>
          <NavLink to={`/coin/${props.coin}/markets`} activeStyle={activeStyle} className={linkclassName}>
            Market Pairs</NavLink>
        </li>
        <li className={itemClass}>
          <NavLink to={`/coin/${props.coin}/about`} activeStyle={activeStyle} className={linkclassName}>
            About</NavLink>

        </li>
        <li className={itemClass}>
          <NavLink to={`/coin/${props.coin}/medias`} activeStyle={activeStyle} className={linkclassName}>
            Medias</NavLink>
        </li>
      </ul>
    </Nav>


  )

}
export default withRouter(CoinPageNavBar);