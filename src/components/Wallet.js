import React, { useEffect, useState, useContext} from "react";
import { useHistory } from "react-router-dom";
import Saving from "./Saving";
import Loans from "./Loan";
import Setting from "./Setting";
import Login from "./Login";
import TransactionTitle from "./TransactionTitle"
import manAvatar from '../images/man_1.svg';
import { Route} from "react-router-dom";
import "./Style/wallet.scss";
import Nav from "./Nav";
import API from './API';
import { UserContext } from "./UserContext";


const Wallet = () => {
  const {val, setVal} = useContext(UserContext)
  const [isRendering, setIsRendering] = useState(false);
  const [getUsers, setFetchUsers] = useState([]);

  useEffect(() => { 
    API.getUsers().then((users) => {
      setFetchUsers(users);
    });
  }, []);

  const loggedInUser = getUsers.filter(user => user.email === localStorage.userEmail)


  const history = useHistory();
  useEffect(() => {
    if (!localStorage.userEmail) {
      history.push("/");
    } else {
      setIsRendering(true);
    }
  }, []);

  const onOff = (data) => { //callback data from setting
    setVal(data)
  }

  let d = new Date()
  d = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`

  return isRendering ? (
      
    <div className="wallet">
      <Nav onOff={onOff} onOffvalue={val}/>
      <div className={val? "overlay":""}>
      <div className="profile">
        <div className='balance'>
        {loggedInUser.map((user,index)=> (
            <p key={index}>{user.balance}</p>))}
            <p>Balance</p>
        </div>
        <div className='avatar'>
          <img src={manAvatar} alt="profile"></img>
          <p>{d}</p>
        </div>
      </div>  

      <div className='transBox'>
        <ul className="transactions">
          <TransactionTitle/>
          {loggedInUser.map(user => user.transactions.length?
          user.transactions.map((transaction,index)=> (
              <li className='transaction' key={index}>
                <p>{transaction.transaction}</p>
                <p><span className={transaction.debitcredit === '+'? "green":"orange"}>{transaction.debitcredit}</span>
                <span>£</span>{transaction.amount}</p>
              </li>
          )): (<li className='transaction'>
                  <p>{"No transaction to show!"}</p>
              </li>
        ))}
          
        </ul>
      </div>
    </div> 
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

