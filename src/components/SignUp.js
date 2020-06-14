import React,{useState} from "react";
import { Link } from "react-router-dom";
import Input from './Form/Input'
import backArrow from '../images/Arrow.svg'
import manAvatar from '../images/man_1.svg'
import Nav from "./Nav";
import './signUp.scss'

const SingUp = () => {

    const [signUpUser, setSignUpUser] = useState({
        firstname:'',
        lastname: '',
        email: '',
        password: '',
        confpassword: ''
    })
  
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    
    const changeHandler = (e) => {
        const {name, value} = e.target
        setSignUpUser(
            {...signUpUser,
             [name]: value}
        )
    }

    const fileChangeHandler = (e) => {

    }

    return  (
            <>
            <Nav/>
                <div className="form SignUpform">
                    <div className="signUp_title">
                    <span><Link to="/backArrow"><img src={backArrow} alt="backArrow"></img></Link></span>
                    <span>SIGN UP</span></div>

                    <form onSubmit={handleSubmit}>
                        <Input label="First Name" type='text' name="firstname" changeHandler={changeHandler} />
                        <Input label="Last Name" type='text' name="lastname" changeHandler={changeHandler} />
                        <Input label="Email" type='email' name="email" changeHandler={changeHandler} />
                        <Input label="Password" type='text' name="password" changeHandler={changeHandler} />
                        <Input label="Confirm Password" type='text' name="confpassword" changeHandler={changeHandler} />
                        <button type="submit" >
                            Sign Up
                        </button>
                    </form>
                    <div className='uploadAvatar'>
                        
                        <div className='button'>
                            <label htmlFor='single'>
                                Upload
                            </label>
                            <input type='file' id='single' onChange={fileChangeHandler} /> 
                        </div>
                        <div>
                            <img src={manAvatar}></img>
                        </div> 
                    </div>
                    
                </div>
            </>
    )
}

export default SingUp;