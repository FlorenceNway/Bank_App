import React,{useState, useEffect, useContext} from "react";
import { Link, useHistory } from "react-router-dom";
import API from './API';
import Input from './Form/Input'
import Nav from "./Nav";
import './login.scss';

const Login = () => {
    const history = useHistory();
    const [fetchUsers, setFetchUsers] = useState([]);

    const [inputUser, setInputUser] = useState({
        username: "",
        password: ""
    })
    
    const changeHandler = (e) => {
        const {name, value} = e.target
        setInputUser(
            {...inputUser,
             [name]: value}
        )
    }

    useEffect(() => { 
        API.getUsers().then((users) => {
          setFetchUsers(users);
        });
    
        return () => {
          console.log("component will unmount!");
        };
      }, []);


    const handleSubmit = (e) => {
       e.preventDefault();
       const {username, password} = inputUser
       const isValidCredentials = fetchUsers.filter(user => user.email === username && user.password === password)
       if(isValidCredentials) {
           // Push 
           localStorage.userEmail = username;
           history.push('/wallet')
        }
    }

    const isValidForm = inputUser.username && inputUser.password;

    return (
        <>
        <Nav />
        <div className="form">
            <div className="login_title"><span>Login</span></div>
            <form onSubmit={handleSubmit}>
                <Input label="Email" type='email' name="username" changeHandler={changeHandler} />
                <Input label="Password" type='text' name="password" changeHandler={changeHandler} />
                <button disabled={!isValidForm} className={isValidForm ? "removeDisable":""} type="submit" >
                    Login
                </button>
                <Link to="/signUp" ><span>Sign Up</span></Link>
            </form>
        </div>
      </>  
    )
}
export default Login;
