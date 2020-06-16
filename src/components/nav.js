import React, {useState} from "react";
import Logo from "../images/CH.svg";
import { NavLink } from "react-router-dom";
import Setting from './Setting'
import "./Style/nav.scss";
import LinksBeforeLogin from "./LinksBeforeLogIn";
import LinksAfterLogIn from './LinksAfterLogIn';

const Nav = ({onOff, onOffvalue}) => {
  const [isHidden, setIsHidden] = useState(true)

  const clickSetting = () => {
    setIsHidden(!isHidden)
  }

  const OnOffHandler = (childData) => { //childData will get e.target.checked value from setting
    onOff(childData)
  }

  return (<>
    <div className="Login LoginNav">
      <ul className="login_nav nav">
        <li>
          <img src={Logo} alt="logo"></img>
        </li>
        {localStorage.userEmail ? <LinksAfterLogIn clickSetting={clickSetting}/> : <LinksBeforeLogin/>}
      </ul>
    </div>
    
    <section className="settingSection">
      {!isHidden && <Setting onOffHandler={OnOffHandler} onOffvalue={onOffvalue}/>} 
      {/* onOffvalue is the value from userContext passed from Loans and Savings */}
      {/* Nav pass (props onOffHandler) function and get return e.target.checked (from setting) */}
    </section>
    
  </>);
};

export default Nav;
