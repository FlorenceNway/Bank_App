import React, { useContext,useState, useMemo}  from "react";
import "./App.css";
import Wallet from "./components/Wallet";
import Saving from "./components/Saving";
import Loans from "./components/Loan";
import Setting from "./components/Setting";
import Signup from "./components/SignUp";
import Login from "./components/Login";
import { BrowserRouter as Router, Route} from "react-router-dom";
import { UserContext } from "./components/UserContext";

function App() {

	const [val, setVal] = useState(null);
	//const providerValue = useMemo(() => ({val, setVal}), [val, setVal])	

  return (
    <div className="App">
		<Route path="/" exact component={Login} />
		<Route path="/signUp" exact component={Signup} />
		<Route path="/backArrow" exact component={Login} />
		
		<UserContext.Provider value={{val, setVal}}>
			<Route path="/wallet" exact component={Wallet} />
			<Route path="/loans" exact component={Loans} />
			<Route path="/savings" exact component={Saving} />
			<Route path="/setting" exact component={Setting} />
			<Route path="/signOut" exact component={Login} />
		</UserContext.Provider>
		
    </div>
  );
}

export default App;
