import React,{useState} from "react";
import { Link } from "react-router-dom";
import Input from './Form/Input'
import backArrow from '../images/Arrow.svg'
import manAvatar from '../images/man_1.svg'
import Nav from "./Nav";
import API from "./API";
import { useHistory } from "react-router-dom";
import './signUp.scss'

const SingUp = () => {
    const history = useHistory();

    const [signUpUserData, setSignUpUserData] = useState({
        firstname:'',
        lastname: '',
        email: '',
        password: '',
        confpassword: '',
        uploadImage: ''
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
            uploadImage: imgPath[2]})
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
                        

                        <div className='uploadAvatar'>
                            <div className='button'>
                                <label htmlFor='single'>
                                    Upload
                                </label>
                                <input type='file' id='single' onChange={uploadFileHandler} /> 
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