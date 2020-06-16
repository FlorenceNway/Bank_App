import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Nav from "./Nav";
import API from './API';
import TransactionTitle from "./TransactionTitle";
import './Style/loan.scss'
import { UserContext } from "./UserContext";
import Overlay from "./Overlay";

const Loan = () => {
  const {val, setVal} = useContext(UserContext)
  
  const history = useHistory();
  const [isRendering, setIsRendering] = useState(false);
  const [Users, setUsers] = useState([]);
  const [user, setUser] = useState(null)
  const [value, setValue] = useState(0)
  const [addMinus, setAddMinus] = useState(null)
  const [payActive, setPayActive] = useState(false)
  const [takeActive, setTakeActive] = useState(false)

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

  const takeloan = () => {
    setAddMinus('+')
    setPayActive(false)
    setTakeActive(true)
  }

  const payback = () => {
    setAddMinus('-')
    setTakeActive(false)
    setPayActive(true)
  }

  const transfer = () => {
    if(addMinus == '+') {
      loggedInUser[0].Loan_balance -= parseInt(value)
      setUser({...user,Loan_balance:loggedInUser[0].Loan_balance})
      loggedInUser[0].balance += parseInt(value)
      setUser({...user,balance:loggedInUser[0].balance})
    
    }else {
      loggedInUser[0].Loan_balance += parseInt(value)
      setUser({...user,Loan_balance:loggedInUser[0].Loan_balance})
    }
    
    API.patchUser(loggedInUser[0].id,loggedInUser[0])
  }

  const onOff = (data) => {
    setVal(data)
  }

  return isRendering ? (
      
    <div className="loan saving">
      <Nav onOff={onOff} onOffvalue={val}/> {/* onOff -> passed from parent , onOffvalue -> get from useContext */}
    
      <section className={'balTranfSection'}>
        <div className="profile">
          <div className='balance'>
              { !user ?
                loggedInUser.map((user,index)=> (
                <p key={index}>{user.Loan_balance}</p>)): <p>{user.Loan_balance}</p>} 
                <p>Balance</p>
          </div>
          <div className='loan_buttons'>
            <button onClick={takeloan} className={takeActive?"payactive":""}>TAKE LOAN</button>
            <button onClick={payback} className={payActive?"takeactive":""}>PAY BACK</button>
          </div>
        </div> 
        <hr/>
        {addMinus? <div className="transfer">
            <span>£</span><input type='text' onChange={getValuetoTransfer}/>
            <button onClick={transfer}>Transfer</button>
        </div>: ""}
        
      </section>
       

      <div className='transBox'>
        <ul className="transactions">
          <TransactionTitle/>
          {loggedInUser.map(user => user.loan_transactions.length?
            user.loan_transactions.map((transaction,index)=> (
              <li className='transaction' key={index}>
                <p>{transaction.transaction}</p>
                <p><span className={transaction.debit === '+'? "green":"orange"}>{transaction.debit}</span>
                <span>£</span>{transaction.amount}</p>
              </li>
            )): (<li className='transaction'>
                  <p>{"No transaction to show!"}</p>
                </li>
            ))}
          </ul>
      </div>
      <Overlay val={val} />
      
    </div>
  ) : (
    ""
  );
};

export default Loan;

