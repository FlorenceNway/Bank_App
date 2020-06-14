import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import LoggedInNav from "./LoggedInNav";

const Loan = () => {
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
        <h1> Loan </h1>
        
    </div>
  ) : (
    ""
  );
};

export default Loan;

