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
import Overlay from "./Overlay";
import BalanceTransfer from "./BalanceTrasfer"

let d = new Date()
d = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`

const Wallet = () => {
  const {val, setVal} = useContext(UserContext)
  const [transferValue, setTransferValue] = useState(0)
  const [Users, setUsers] = useState([]);
  const [user, setUser] = useState(null)
  const [addMinus, setAddMinus] = useState(null)
  const [isRendering, setIsRendering] = useState(false);
  const [isON, setIsON] = useState(false)
  const history = useHistory();

  useEffect(() => {
    if (!localStorage.userEmail) {
      history.push("/");
    } else {
      setIsRendering(true);
    }
  }, []);

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

  const getValuetoTransfer = (e) => { //e.target.value from transfer input
    setTransferValue(e.target.value)
  }

  const getRoundOnOff = (roundOnOffVal) => {
    console.log('wallet',roundOnOffVal)
    setIsON(roundOnOffVal) //true or false
  }

  const payExpense = () => {
    setAddMinus('-')
  }

  const transfer = () => {
    if(addMinus == '-') {
      const decimal_number = parseFloat(transferValue) // 2.56
      const int_number = parseInt(transferValue) // 2
      let decimal = decimal_number - int_number   // 2.56 - 2 = 0.56
      let saving = 1 - decimal   // 1 - 0.56 = 0.4399999999999
      let roundedPense = saving + decimal_number //2.56 + 0.34 = 3

      if (isON) {
        loggedInUser[0].balance -= roundedPense
        loggedInUser[0].Saving_balance += parseFloat(saving.toFixed(2))

        loggedInUser[0].transactions.push({
          "transaction": "New Expense",
          "debitcredit": "-",
          "amount": roundedPense
        })
      }else {
        loggedInUser[0].balance -= decimal_number

        loggedInUser[0].transactions.push({
          "transaction": "New Expense",
          "debitcredit": "-",
          "amount": decimal_number
        })
      }

      setUser({...user,
        balance: loggedInUser[0].balance,
        Saving_balance: loggedInUser[0].Saving_balance,
        transactions:{...loggedInUser[0].transactions}
      }) //wallet balance
    }
    
    API.patchUser(loggedInUser[0].id,loggedInUser[0])
  }

  const onOff = (data) => { //callback data from setting
    setVal(data)
  }

  return isRendering ? (
      
    <div className="wallet">
      <Nav onOff={onOff} onOffvalue={val} getRoundOnOff={getRoundOnOff}/>

      <section className={"balTranfSection"}>
        <div className="profile">
            <div className='balance'>
              {loggedInUser.map((user,index)=> (
                <p key={index}>{user.balance}</p>))}
                <p>Balance</p>
            </div>
            <div className='avatar'>
              <img src={manAvatar} alt="profile"></img>
              <p>{d}</p>
              <div className="wallet_button">
                <button onClick={payExpense} className="expenseActive">Add Expense</button>
            </div>
            </div>
          </div>  
          <hr/>
          {addMinus? 
            <div className="transfer">
                <span>£</span><input type='text' onChange={getValuetoTransfer}/>
                <button onClick={transfer}>Transfer</button>
            </div>
            : 
            ""}
      </section>
        

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
           
      <Overlay val={val} />
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

