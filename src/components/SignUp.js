import React,{useState} from "react";
import { BrowserRouter as Link } from "react-router-dom";
import Input from './Form/Input'
import backArrow from '../images/Arrow.svg'
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

	return  <div className="form SignUpform">
                <div className="signUp_title">
                <Link to="/"><span><img src={backArrow}></img></span></Link>
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
            </div>
}

export default SingUp;