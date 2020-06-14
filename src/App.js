import React ,{useState, useEffect} from "react";
import "./App.css";
import Nav from "./components/Nav";
import LoggedInNav from "./components/LoggedInNav";
import Wallet from "./components/Wallet";
import Saving from "./components/Saving";
import Loans from "./components/Loan";
import Setting from "./components/Setting";
import Signup from "./components/SignUp";
import Login from "./components/Login";
import { useHistory } from "react-router-dom";
import { BrowserRouter as Router, Route} from "react-router-dom";
import { UserContext } from "./components/UserContext";

function App() {

  return (
    <div className="App">
    	
		<Route path="/" exact component={Login} />
		<Route path="/signUp" exact component={Signup} />
		<Route path="/wallet" exact component={Wallet} />
		<Route path="/backArrow" exact component={Login} />
		<Route path="/signOut" exact component={Login} />

		<Route path="/loan" exact component={Loans} />
     
    </div>
  );
}

export default App;
