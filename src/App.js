import React, { useState } from 'react';

import { ThemeProvider } from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/js/all';
import { useTheme } from './components/ThemeToggler/useTheme';
import ThemeToggler from './components/ThemeToggler/ThemeToggler';
import { lightTheme, darkTheme } from './themes/Theme';
import { GlobalStyle } from './themes/Global';


import './App.css';

function App() {
  /*
  * set the global style and provide the toggle function to switch the theme state
  */
  const [theme, toggleTheme] = useTheme();
  const globalThemeToProvide = theme === 'light' ? lightTheme : darkTheme;


  

  return (
    <ThemeProvider theme={globalThemeToProvide}>
        <GlobalStyle />


        <ThemeToggler theme={theme} toggleTheme={toggleTheme} />

     
    </ThemeProvider>
  );
}


export default App;
