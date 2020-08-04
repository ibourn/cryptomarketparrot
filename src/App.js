import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { LoginContext } from "./components/AuthRoute/LoginContext";
import './App.css';
import { ThemeContext } from "./components/ThemeToggler/ThemeContext";

import { ThemeProvider } from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/js/all';
import { useTheme } from './components/ThemeToggler/useTheme';
import ThemeToggler from './components/ThemeToggler/ThemeToggler';
import { lightTheme, darkTheme } from './themes/Theme';
import { GlobalStyle } from './themes/GlobalStyled';


import MainPage from './pages/MainPage';
import NotFoundPage from './pages/NotFoundPage';

// const containerStyle = {
//   width: 100vw
// };

function App() {
  /*
  * set the global style and provide the toggle function to switch the theme state
  */
  const [theme, toggleTheme] = useTheme();
  const globalThemeToProvide = theme === 'light' ? lightTheme : darkTheme;
  /*
  * set the user as not login
  */
  const [isAuth, setIsAuth] = useState(false);


  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }} >

    <ThemeProvider theme={globalThemeToProvide}>
      <LoginContext.Provider value={{ isAuth, setIsAuth }} >

      <GlobalStyle />
      <BrowserRouter>

          <div className="globalContainer container-fluid"  >
            <Switch>
              
              <Route exact strict path="/" component={MainPage} />

              {/* <Route exact path="/about" component={About} />

              <AuthRoute exact path="/profile" component={Profile} />

              <Route exact path="/signup" component={SignUp} />

              <Route exact path="(|/coin-exchange)/coin/:id" component={CoinPage} /> */}

              <Route path="*" component={NotFoundPage} />
            </Switch>

            <footer>Footer</footer>
          </div>
        
      </BrowserRouter>
      </LoginContext.Provider>
      
    </ThemeProvider>
    </ThemeContext.Provider>

  );
}


export default App;
