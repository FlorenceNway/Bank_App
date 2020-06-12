import React , {useState,useContext,useEffect} from "react";
import "./App.css";
import Nav from './components/Nav'
import WALLET from './components/Wallet'
import SIGNUP from './components/SignUp'
import LOGIN from './components/Login'
import API from './components/API'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {UserContext} from "./components/UserContext";


function App() {
	const [users, setUsers] = useState([]);
	//const [user, setUser] = useState(null);
	const [authUser, setAuthUser] = useState('')

	// return user ? <AuthWebsite/> : <NoAuthWebsite/>
	// useEffect(() => { 
    //     API.getUsers().then((users) => {
    //       setUsers(users);
    //     });
    
    //     return () => {
    //       console.log("component will unmount!");
    //     };
	//   }, []);
	  
	
	const handleSubmit = (prop) => {
		//e.preventDefault();
		// const user = users.filter(user => user.email === username && user.password === password)
		// if(user) {
		//  setAuthUser("authenticated")
		// }else {
		//  setAuthUser("Not Found")
		// }
		console.log(prop)
	}


	return <div className="App">
		<Nav />
		<LOGIN onSubmit={handleSubmit} />
		{/* {user === "authenticated" ? <Wallet/> : <LOGIN/>} } */}

		<Router>
				<Route path="/" exact component={LOGIN}/>
				<Route path="/wallet" exact component={WALLET} />
				<Route path="/signUp" exact component={SIGNUP} />
		</Router>  

	</div>;
}

export default App;
