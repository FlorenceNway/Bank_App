import React from 'react';

const BalanceTransfer = ({user,loggedInUser, In, Out, InActive, OutActive, getValuetoTransfer, transfer, addMinus, 
    InActiveClass, OutActiveClass, InButton, OutButton, balance, buttonClass
}) => {
    
    return (
    <section className={'balTranfSection'}>
        <div className="profile">
            <div className='balance'>
                { !user ?
                loggedInUser.map((user,index)=> (
                    <p key={index}>{user[balance]}</p>)): <p>{user[balance]}</p>} 
                    <p>Balance</p>
            </div>
            <div className={buttonClass}>
                <button onClick={In} className={InActive? InActiveClass:""}>{InButton}</button>
                <button onClick={Out} className={OutActive?OutActiveClass:""}>{OutButton}</button>
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
    
)}

export default BalanceTransfer;