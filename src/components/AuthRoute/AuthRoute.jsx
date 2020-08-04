import React, { useContext } from "react";
import { Redirect, Route } from 'react-router-dom';
import { LoginContext } from "./LoginContext";


const AuthRoute = ({ component: Component, ...rest }) => {
  
  const { isAuth } = useContext(LoginContext);

  const result = isAuth ? <Component  /> : <Redirect to="/signup" />;

  
  return (<Route {...rest} render={ () =>  result } />);
};

export default AuthRoute;
