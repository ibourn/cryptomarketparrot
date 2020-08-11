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
import ThemeToggler from './components/ThemeToggler/ThemeToggler';
import { lightTheme, darkTheme } from './themes/Theme';
import { GlobalStyle } from './themes/GlobalStyled';

import CoinsPage from "./pages/mainpages/CoinsPage";
import MainPage from './pages/MainPage';
import NotFoundPage from './pages/NotFoundPage';
import HeadlinesPage from './pages/HeadlinesPage';
import InterestPage from './pages/InterestPage';
import SignUpPage from './pages/SignUpPage';
import BlockchainExplorerPage from './pages/BlockchainExplorerPage';


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
  const [coinsInfos, setCoinsInfos] = useState({
    dictionary: [],
    list: []
  });

  console.log("HEHO JE SUIS APPELE APP");

  const handleResize = () => {
    console.log(viewportWidth);
  const viewportWidth = document.documentElement.clientWidth;
  if(viewportWidth<=1000){
  //closePub();
  }
  }
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }} >

    <ThemeProvider theme={globalThemeToProvide}>
      <LoginContext.Provider value={{ isAuth, setIsAuth }} >
      <DataContext.Provider value={{coinsInfos, setCoinsInfos}} >
      <GlobalStyle />
      <BrowserRouter>

          <div className="globalContainer container-fluid" onResize={handleResize} >
            <Switch>
              
              <Route exact strict path="/" component={MainPage} />
              <Route  path="/coin/:id/:type" component={MainPage} />

              <Route exact path="/headlines" component={HeadlinesPage} />
              <Route exact path="/interest" component={InterestPage} />
              <Route exact path="/signup" component={SignUpPage} />
              <Route exact path="/blockchainexplorer" component={BlockchainExplorerPage} />
  

              <Route path="*" component={NotFoundPage} />
            </Switch>

            <footer>Footer</footer>
          </div>
        
      </BrowserRouter>
     </DataContext.Provider>
      </LoginContext.Provider>
      
    </ThemeProvider>
    </ThemeContext.Provider>

  );
}


export default App;
