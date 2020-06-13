import React, { useState } from "react";
import Logo from "../images/CH.svg";
import { Route, Link } from "react-router-dom";
import LOGIN from "./Login";
import SIGNUP from "./SignUp";
import WALLET from "./Wallet";
import { UserContext } from "./UserContext";
import "./nav.scss";

const Nav = () => {
  const [user, setUser] = useState("");

  return (
    <div className="Login">
      <ul className="nav">
        <li>
          <img src={Logo} alt="logo"></img>
        </li>
        <li>
          <Link to="/">
            <span>LOGIN</span> 
          </Link> / 
          <Link to="/signUp">
            <span>SIGN UP</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
