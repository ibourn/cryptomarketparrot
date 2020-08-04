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

    border: 1px solid black;
  }

  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.25s linear;

    min-heigth: 100vh;
  }
  
 
  .globalContainer{
    padding: 0;
    margin: 0;

    min-heigth: 100vh;
    //background: red;
    
  }
  

  .colMainPage{
    min-height: 100vh;


  }
  .colPub{
    min-height: 100vh;
  }

  .rowPub{
    max-height: 20vh;
  }
 
  `;