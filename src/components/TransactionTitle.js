import React from "react";
import upArrow from '../images/Polygon1.svg';
import downArrow from '../images/Polygon2.svg';

const TransactionTitle = () => {
    return (<><li className='transTitle'>
                <p>Transactions</p><span><img src={upArrow}></img><img src={downArrow}></img></span>
                <p>Amount</p>
            </li>
            <hr/></>)
}

export default TransactionTitle;