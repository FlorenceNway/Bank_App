import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import LoggedInNav from "./LoggedInNav";

const Setting = () => {
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
        <h1> Setting </h1>
        
    </div>
  ) : (
    ""
  );
};

export default Setting;