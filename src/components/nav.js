import React from "react";
import Logo from "../images/CH.svg";
import { NavLink } from "react-router-dom";
import "./Style/nav.scss";
import LinksBeforeLogin from "./LinksBeforeLogIn";
import LinksAfterLogIn from './LinksAfterLogIn';

const Nav = () => {

  return (
    <div className="Login LoginNav">
      <ul className="login_nav nav">
        <li>
          <img src={Logo} alt="logo"></img>
        </li>
        {localStorage.userEmail ? <LinksAfterLogIn/> : <LinksBeforeLogin/>}
      </ul>
    </div>
  );
};

export default Nav;
