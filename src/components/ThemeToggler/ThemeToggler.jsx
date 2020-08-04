import React, { useContext } from 'react'
import { func, string } from 'prop-types';
import styled from 'styled-components';

import { ThemeContext } from "./ThemeContext";

/************************************
 * 
 * The theme toggler button
 * 
 * use ThemeContext to get the context anywhere in the tree
 * and useTheme to switch via a theme state
 * 
 * ******************************** */

 /*
 * style of the button : animation to switch from moon to sun icon
 */
const ThemeTogglerContainer = styled.button`
  background: ${({ theme }) => theme.body};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  margin: 0 auto;
  padding: 0.2rem 0 0 0.2rem;
  width: 1.3rem;
  height: 1.3rem;
  font-size: 0.9rem;
  border: none;

  .fa-moon{
       transform: ${({ lightTheme }) => lightTheme ? 'translateX(0)' : 'translateX(1.3rem)'}; 
  }
   .fa-sun {
      color: white;
      transform: ${({ lightTheme }) => lightTheme ? 'translateX(1.3rem)' : 'translateX(-1rem)'};
    }
  
`;

/* 
 * Return the styled component as a button and passing the theme params
 */
const ThemeToggler = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  //const ThemeToggler = ({ theme, toggleTheme }) => {
  const isLight = theme === 'light';
  return (
    <ThemeTogglerContainer lightTheme={isLight} onClick={toggleTheme} >
      <i class="fas fa-moon"></i>
      <i class="far fa-sun"></i>     
    </ThemeTogglerContainer>
  );
};

/*
 * Check the types received as props
 */
ThemeToggler.propTypes = {
  theme: string.isRequired,
  toggleTheme: func.isRequired,
}

export default ThemeToggler;