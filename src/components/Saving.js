import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import API from './API'
import Nav from "./Nav";
import TransactionTitle from "./TransactionTitle"
import './Style/saving.scss'
import { UserContext } from "./UserContext";
import Overlay from "./Overlay";
import BalanceTransfer from "./BalanceTrasfer";

const Savings = () => {
  const {val, setVal} = useContext(UserContext) //Block OnOff value from context passed from onOff function -line 74
  
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

  const getValuetoTransfer = (e) => { //e.target.value from transfer input
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
      loggedInUser[0].balance -= parseInt(value)
      setUser({...user,
        Saving_balance:loggedInUser[0].Saving_balance, //Saving balance
        balance:loggedInUser[0].balance}) //wallet balance
    
    }else {
      loggedInUser[0].Saving_balance -= parseInt(value)
      loggedInUser[0].balance += parseInt(value)
      setUser({...user,
        Saving_balance:loggedInUser[0].Saving_balance, //Saving balance
        balance:loggedInUser[0].balance}) //wallet balance
    }
    
    API.patchUser(loggedInUser[0].id,loggedInUser[0])
  }

  const onOff = (data) => {
    setVal(data)
  }

  console.log(val)
  return isRendering ? (
      
    <div className="saving">
        <Nav onOff={onOff} onOffvalue={val}/> {/* onOff -> passed from parent , onOffvalue -> val get from useContext */}

        <BalanceTransfer user={user} loggedInUser={loggedInUser} In={payIn} Out={payOut} InActive={payInActive} 
              OutActive={payOutActive} getValuetoTransfer={getValuetoTransfer} transfer={transfer} addMinus={addMinus}
              InActiveClass={"payInactive"} OutActiveClass={"payOutactive"} InButton={"PAY IN"} OutButton={"PAY OUT"}
              balance={"Saving_balance"} buttonClass={"saving_buttons"}/>

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
      <Overlay val={val}/>
    
    </div>
     
  ) : (
    ""
  );
};

export default Savings;