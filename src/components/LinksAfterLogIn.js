import React,{useState} from "react";
import { NavLink } from "react-router-dom";
import "./Style/nav.scss";

const LinksAfterLogIn = ({clickSetting}) => {

  const signOut = () => {
    localStorage.removeItem('userEmail')
  }

  const [menu, setMenu] = useState({
    links: [{id: 1,name:'wallet'},{id: 2,name:'loans'}, {id: 3,name:'savings'},{id: 4,name:'Setting'}, {id: 5,name:'signout'}]
  })

  return  <li>
            {menu.links.map((link) =>(
              link.name == "Setting" ? <span className={'settingTab'} onClick={clickSetting}>{link.name}</span> :
            <NavLink to={`/${link.name}`} activeClassName={"active"} key={link.id}>
                {link.name === "signout"?
                <span onClick={signOut}>{link.name}</span> : <span>{link.name}</span> 
                }
            </NavLink> 
            ))}
        </li>
};

export default LinksAfterLogIn;