import React, {useState} from "react";
import Logo from "../images/CH.svg";
import { NavLink } from "react-router-dom";
import Setting from './Setting'
import "./Style/nav.scss";
import LinksBeforeLogin from "./LinksBeforeLogIn";
import LinksAfterLogIn from './LinksAfterLogIn';

const Nav = () => {
  const [isHidden, setIsHidden] = useState(true)

  const clickSetting = () => {
    setIsHidden(!isHidden)
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
      {!isHidden && <Setting />}
    </section>
    
  </>);
};

export default Nav;
