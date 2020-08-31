import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { LoginContext } from "./components/AuthRoute/LoginContext";
import { DataContext } from "./components/NavBars/DataContext";
import './App.css';
import { ThemeContext } from "./components/ThemeToggler/ThemeContext";

import { ThemeProvider } from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/js/all';
import { useTheme } from './components/ThemeToggler/useTheme';
import { lightTheme, darkTheme } from './themes/Theme';
import { GlobalStyle } from './themes/GlobalStyled';

import MainPage from './pages/MainPage';
import NotFoundPage from './pages/otherpages/NotFoundPage';
import ComingSoonPage from './pages/otherpages/ComingSoonPage';
import MainFooter from './components/Footers/MainFooter';


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
  const [coinsInfos, setCoinsInfos] = useState({
    dictionary: [],
    list: []
  });
  


  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }} >

    <ThemeProvider theme={globalThemeToProvide}>
      <LoginContext.Provider value={{ isAuth, setIsAuth }} >
      <DataContext.Provider value={{coinsInfos, setCoinsInfos}} >
      <GlobalStyle />
      <BrowserRouter>

          <div className="globalContainer container-fluid" >
            <Switch>
              
              <Route exact strict path="(/|/cryptomarketparrot)(/|)" component={MainPage} />
              <Route  exact path="/coin/:id/:type" component={MainPage}  />

              <Route path="/about" component={MainPage} />

              <Route path="/(exchange||products||tools||signup)" 
              component={ComingSoonPage}/>

              <Route path="*" component={NotFoundPage} />
            </Switch>

            <MainFooter></MainFooter>
          </div>
        
      </BrowserRouter>
     </DataContext.Provider>
      </LoginContext.Provider>
      
    </ThemeProvider>
    </ThemeContext.Provider>

  );
}


export default App;
