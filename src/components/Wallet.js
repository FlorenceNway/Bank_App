import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Saving from "./Saving";
import Loans from "./Loan";
import Setting from "./Setting";
import Login from "./Login";
import { Route} from "react-router-dom";
import "./wallet.scss";
import LoggedInNav from "./LoggedInNav";

const Wallet = () => {
  const [isRendering, setIsRendering] = useState(false);

  const history = useHistory();
  useEffect(() => {
    if (!localStorage.userEmail) {
      history.push("/");
    } else {
      setIsRendering(true);
    }
  }, []);

  return isRendering ? (
      
    <div className="wallet">
        <LoggedInNav/>
        <h1> Wallet </h1>
        
		<Route path="/saving" exact component={Saving} />
		<Route path="/loan" exact component={Loans} />
		<Route path="/setting" exact component={Setting} />
		<Route path="/signOut" exact component={Login} />
    </div>
  ) : (
    ""
  );
};

export default Wallet;

