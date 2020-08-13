import React, { useContext } from 'react';
import { NavLink, withRouter } from "react-router-dom";

import { ThemeContext } from "../ThemeToggler/ThemeContext";
import { lightTheme, darkTheme } from '../../themes/Theme';

import styled from 'styled-components';

/**
 * style
 * 
 * @todo fix bug opacity of the sticky tab
 */
const Nav = styled.nav`
font-size: 0.9rem;
font-weight: bold;
// opacity: 1;
// position: sticky;
// top: var(--navbar--main-height);
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

  const colorStyle = theme === 'light' ? { backgroundColor: `${lightTheme.body}`,
  color: `${lightTheme.text}` } :{ backgroundColor: `${darkTheme.body}`,
  color: `${darkTheme.text}` }
  const activeStyle = theme === 'light' ? { backgroundColor: `${lightTheme.container}`,
  color: `${lightTheme.content}` } :{ backgroundColor: `${darkTheme.container}`,
  color: `${darkTheme.content}` }

  return (
    <Nav className="row" style={colorStyle}>
      <ul class="nav nav-tabs" >
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