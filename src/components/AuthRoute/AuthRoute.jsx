import React, { useContext } from "react";
import { Redirect, Route } from 'react-router-dom';
import { LoginContext } from "./LoginContext";

/**
 * 
 * Component used to redirect if user didn't log in
 * 
 * @param {component} param0 : the child component to access
 */
const AuthRoute = ({ component: Component, ...rest }) => {

  const { isAuth } = useContext(LoginContext);

  const result = isAuth ? <Component /> : <Redirect to="/signup" />;


  return (<Route {...rest} render={() => result} />);
};

export default AuthRoute;
