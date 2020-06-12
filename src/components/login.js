import React,{useState, useEffect, useContext} from "react";
import { BrowserRouter as Link } from "react-router-dom";
import API from './API';
import './login.scss';
import { UserContext } from './UserContext';

const Login = (props) => {
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const performValidation = () => {
        return username.length > 0 && password.length > 0;
    }

    const handleSubmit = (e) => {
       e.preventDefault();
       const user = users.filter(user => user.email === username && user.password === password)
       props.onSubmit(user)
    }


    useEffect(() => { 
        API.getUsers().then((users) => {
          setUsers(users);
        });
    
        return () => {
          console.log("component will unmount!");
        };
      }, []);


    return (
        <div className="form">
            <div className="login_title"><span>Login</span></div>
            <form onSubmit={handleSubmit}>
                <div className="field">
                    <label className="label">Email</label>
                    <input className="input" type="email" name="email" onChange={e => setUsername(e.target.value)} required />
                </div>
                <div className="field">
                    <label className="label">Password</label>
                    <input className="input" type="password" name="password" onChange={e => setPassword(e.target.value)} required />
                </div>
                <button disabled={!performValidation()} className={performValidation()? "removeDisable":""} type="submit" >
                    Login
                </button>
                <Link to="/signUp" ><span>Sign Up</span></Link>
            </form>
        </div>
    )
}
export default Login;
