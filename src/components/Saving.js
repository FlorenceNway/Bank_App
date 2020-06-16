import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import API from './API'
import Nav from "./Nav";
import TransactionTitle from "./TransactionTitle"
import './Style/saving.scss'

const Savings = () => {
  const [isRendering, setIsRendering] = useState(false);
  const [Users, setUsers] = useState([]);
  const [user, setUser] = useState(null)
  const [value, setValue] = useState(0)
  const [addMinus, setAddMinus] = useState(null)
  const [payInActive, setPayInActive] = useState(false)
  const [payOutActive, setPayOutActive] = useState(false)

  useEffect(() => {
    API.getUsers().then((users) => {
      setUsers(users);

      const loggedInUser = Users.find(
        (user) => user.email === localStorage.userEmail
      );
      setUser(loggedInUser);
    });
  }, []);

  const loggedInUser = Users.filter(user => user.email === localStorage.userEmail)

  const history = useHistory();
  useEffect(() => {
    if (!localStorage.userEmail) {
      history.push("/");
    } else {
      setIsRendering(true);
    }
  }, []);

  const getValuetoTransfer = (e) => {
    setValue(e.target.value)
  }

  const payIn = () => {
    setAddMinus('+')
    setPayInActive(true)
    setPayOutActive(false)
  }

  const payOut = () => {
    setAddMinus('-')
    setPayOutActive(true)
    setPayInActive(false)
  }

  const transfer = () => {
    if(addMinus == '+') {
      loggedInUser[0].Saving_balance += parseInt(value)
      setUser({...user,Saving_balance:loggedInUser[0].Saving_balance})
    
    }else {
      loggedInUser[0].Saving_balance -= parseInt(value)
      setUser({...user,Saving_balance:loggedInUser[0].Saving_balance})
    }
    
    API.patchUser(loggedInUser[0].id,loggedInUser[0])
  }

  return isRendering ? (
      
    <div className="loan saving">
        <Nav/>
        <section className={'balTranfSection'}>
            <div className="profile">
              <div className='balance'>
                { !user ?
                  loggedInUser.map((user,index)=> (
                      <p key={index}>{user.Saving_balance}</p>)): <p>{user.Saving_balance}</p>} 
                      <p>Balance</p>
              </div>
              <div className='saving_buttons'>
                <button onClick={payIn} className={payInActive?"payInactive":""}>PAY IN</button>
                <button onClick={payOut} className={payOutActive?"payOutactive":""}>PAY OUT</button>
              </div>
            </div>  
              <hr/>
              {addMinus? 
              <div className="transfer">
                <span>£</span><input type='text' onChange={getValuetoTransfer}/>
                <button onClick={transfer}>Transfer</button>
              </div>: ""}
            
        </section>   

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