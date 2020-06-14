import React from "react";
import Logo from "../images/CH.svg";
import { Link } from "react-router-dom";
import "./nav.scss";

const LoggedInNav = () => {

const signOut = () => {
  localStorage.removeItem('userEmail')
}

const addClassName = () => {

}

  return (
    <div className="LoginNav">
      <ul className="login_nav nav">
        <li>
          <img src={Logo} alt="logo"></img>
        </li>
        <li>
          <Link to="/wallet">
            <span>WALLETS</span> 
          </Link> 
          <Link to="/saving">
            <span>SAVINGS</span>
          </Link>
          <Link to="/loan">
            <span>LOANS</span>
          </Link>
          <Link to="/setting">
            <span>SETTINGS</span>
          </Link>
          <Link to="/signOut">
            <span onClick={signOut}>SIGNOUT</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default LoggedInNav;