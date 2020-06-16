import React,{useState} from "react";
import { Link } from "react-router-dom";
import Input from './Form/Input'
import backArrow from '../images/Arrow.svg'
import manAvatar from '../images/man_1.svg'
import Nav from "./Nav";
import API from "./API";
import { useHistory } from "react-router-dom";
import './Style/signUp.scss'

const SingUp = () => {
    const history = useHistory();

    const [signUpUserData, setSignUpUserData] = useState({
        firstname:'',
        lastname: '',
        email: '',
        password: '',
        confpassword: '',
        avatar: '',
        balance: 0,
        Saving_balance: 0,
        Loan_balance: 0,
        transactions:[],
        saving_transactions:[],
        loan_transactions:[]
    })
  
    const handleSubmit = (e) => {
        e.preventDefault();
        API.postUser(signUpUserData)

        alert("Your account has been created, you can now log in.")
        history.push("/");
    }
    
    const changeHandler = (e) => {
        const {name, value} = e.target
        setSignUpUserData(
            {...signUpUserData,
             [name]: value}
        )
    }

    const uploadFileHandler = (e) => {
        let imgPath = e.target.value.split("\\")

        setSignUpUserData({...signUpUserData,
            avatar: imgPath[2]})
    }

    return  (
            <>
            <Nav/>
                <div className="form SignUpform">
                    <div className="signUp_title">
                        <span><Link to="/backArrow"><img src={backArrow} alt="backArrow"></img></Link></span>
                        <span>SIGN UP</span>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <Input label="First Name" type='text' name="firstname" changeHandler={changeHandler} />
                        <Input label="Last Name" type='text' name="lastname" changeHandler={changeHandler} />
                        <Input label="Email" type='email' name="email" changeHandler={changeHandler} />
                        <Input label="Password" type='password' name="password" changeHandler={changeHandler} />
                        <Input label="Confirm Password" type='password' name="confpassword" changeHandler={changeHandler} />

                        <div className='uploadAvatar'>
                            <div className='button'>
                                <label htmlFor='upload'>Upload
                                <input type='file' id='upload' onChange={uploadFileHandler} /></label>
                            </div>
                            <div>
                                <img src={manAvatar}></img>
                            </div> 
                        </div>

                        <button type="submit"> Sign Up </button>
                    </form>
                </div>
            </>
    )
}

export default SingUp;