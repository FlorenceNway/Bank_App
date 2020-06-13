import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./wallet.scss";

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
      <h1> Wallet </h1>
    </div>
  ) : (
    ""
  );
};

export default Wallet;

