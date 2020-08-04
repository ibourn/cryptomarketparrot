import React, { useState, useContext } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { LoginContext } from "../AuthRoute/LoginContext";
import { ThemeContext } from "../ThemeToggler/ThemeContext";

import styled from 'styled-components';




const CoinRankingNavBar = () => {

   // const targetClass = isOpen ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
//    const triggerClass = isOpen ? 'navbar-toggler navbar-toggler-right collapsed' : 'navbar-toggler navbar-toggler-right';

    const navClass = "navbar navbar-expand-lg navbar-light sticky-top";
    const ulClass = "navbar-nav mr-auto";
    const liClass = "nav-item mr-3";
    const linkClass = "navbar-link";

    const btnLoginClass = "btn btn-sm btn-light";
    const btnSignUpClass = "btn btn-sm btn-primary";

   return (
    <ul class="nav nav-tabs">
    <li class="nav-item">
      <a class="nav-link active" href="#">Active</a>
    </li>
    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
      <div class="dropdown-menu">
        <a class="dropdown-item" href="#">Action</a>
        <a class="dropdown-item" href="#">Another action</a>
        <a class="dropdown-item" href="#">Something else here</a>
        <div class="dropdown-divider"></div>
        <a class="dropdown-item" href="#">Separated link</a>
      </div>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#">Link</a>
    </li>
    <li class="nav-item">
      <a class="nav-link disabled" href="#">Disabled</a>
    </li>
  </ul>
    );
}


export default withRouter(CoinRankingNavBar);