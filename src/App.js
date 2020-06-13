import React, { useState, useContext, useEffect } from "react";
import "./App.css";
import Nav from "./components/Nav";
import Wallet from "./components/Wallet";
import Signup from "./components/SignUp";
import Login from "./components/Login";
import API from "./components/API";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { UserContext } from "./components/UserContext";

function App() {
  return (
    <div className="App">
      <Nav />
 
      <Route path="/" exact component={Login} />
      <Route path="/wallet" exact component={Wallet} />
      <Route path="/signUp" exact component={Signup} />
    </div>
  );
}

export default App;
