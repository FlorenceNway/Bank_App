import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import API from './API'
import Nav from "./Nav";
import TransactionTitle from "./TransactionTitle"
import './Style/saving.scss'

const Savings = () => {
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

  return isRendering ? (
      
    <div className="saving">
        <Nav/>
        <div className="profile">
        <div className='balance'>
        {loggedInUser.map((user,index)=> (
            <p key={index}>{user.Saving_balance}</p>))}
            <p>Balance</p>
        </div>
        <div className='saving_buttons'>
          <button>PAY IN</button>
          <button>PAY OUT</button>
        </div>
      </div>  

      <div className='transBox'>
        <ul className="transactions">
          <TransactionTitle/>
          {loggedInUser.map(user => user.saving_transactions.length?
          user.saving_transactions.map((transaction,index)=> (
              <li className='transaction' key={index}>
                <p>{transaction.transaction}</p>
                <p><span className={transaction.debit === '+'? "green":"red"}>{transaction.debit}</span>
                <span>£</span>{transaction.amount}</p>
              </li>
          )): (<li className='transaction'>
                  <p>{"No transaction to show!"}</p>
              </li>
        ))}
          
        </ul>
      </div>
        
    </div>
  ) : (
    ""
  );
};

export default Savings;