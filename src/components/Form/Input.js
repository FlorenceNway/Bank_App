import React from "react";

const Input = ({label,type,name,changeHandler,value}) => {
    
	return  <div className="field">
                <label className="label">{label}</label>
                <input className="input" type={type} name={name} onChange={changeHandler} value={value} required />
            </div>
}

export default Input;