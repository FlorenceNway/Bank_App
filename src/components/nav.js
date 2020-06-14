import React , {useState} from "react";
import Logo from "../images/CH.svg";
import { NavLink } from "react-router-dom";
import "./nav.scss";

const Nav = () => {

  return (
    <div className="Login">
      <ul className="nav">
        <li>
          <img src={Logo} alt="logo"></img>
        </li>
        <li>
          <NavLink to="/" exact activeClassName={"active"}>
            <span>LOGIN</span> 
          </NavLink> / 
          <NavLink to="/signUp" exact activeClassName={"active"}>
            <span>SIGN UP</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
