import React,{useState} from "react";
import Logo from "../images/CH.svg";
import { NavLink } from "react-router-dom";
import "./Style/nav.scss";

const LoggedInNav = () => {

  const signOut = () => {
    localStorage.removeItem('userEmail')
  }

  const [menu, setMenu] = useState({
    links: [{id: 1,name:'wallet'},{id: 2,name:'loan'}, {id: 3,name:'saving'}, {id: 4,name:'signout'}]
  })

  return <div className="LoginNav">
          <ul className="login_nav nav">
            <li>
              <img src={Logo} alt="logo"></img>
            </li>
            <li>
              {menu.links.map((link) =>(
                <NavLink to={`/${link.name}`} activeClassName={"active"} key={link.id}>
                  {link.name === "signout"?
                    <span onClick={signOut}>{link.name}</span> : <span>{link.name}</span> 
                  }
                </NavLink> 
              ))}
            </li>
          </ul>
        </div>
};

export default LoggedInNav;