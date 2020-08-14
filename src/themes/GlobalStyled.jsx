import styled, { createGlobalStyle } from 'styled-components';

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

    //for dev
    border: 1px solid tansparent;
  }

  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.25s linear;

    min-heigth: 100vh;
    min-width: 750px;

    // global variables :
    --navbar--main-height : 4rem;
    --bgColor: ${({ theme }) => theme.body};
    --txtColor:  ${({ theme }) => theme.text};
    --containerColor:  ${({ theme }) => theme.container};
  }

  .globalContainer{
    padding: 0;
    margin: 0;

    min-heigth: 100vh;
  }
  .colMainPage{
    min-height: 100vh;
  }
  .colPub{
    min-height: 100vh;
  }
  `;

  /**
   * wrappers for banner elements layout
   */
  export const BannerContentDiv = styled.div`
    min-width: 90%;
  `;

 export  const BannerOptionDiv = styled.div`
    padding-right: 1rem;
  `;
  