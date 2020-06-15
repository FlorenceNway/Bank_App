import React from "react";
import { NavLink } from "react-router-dom";
import "./Style/nav.scss";

const linksBeforeLogin = () => {

  return <li>
          <NavLink to="/" exact activeClassName={"active"}>
            <span>LOGIN</span> 
          </NavLink> / 
          <NavLink to="/signUp" exact activeClassName={"active"}>
            <span> SIGN UP</span>
          </NavLink>
        </li>
}

export default linksBeforeLogin;
