import { createGlobalStyle } from 'styled-components';

/************************************
 * 
 * reset of default style and setting of the global style of the App
 * 
 * ******************************** */

export const GlobalStyle = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.25s linear;

    min-heigth: 100vh;
  }`;