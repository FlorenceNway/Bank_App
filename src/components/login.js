import React,{useState, useEffect} from "react";
import API from './API';
import './login.scss';

const Login = () => {
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function performValidation() {
        return username.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
    }

    useEffect(() => {
        console.log("component has mounted! this will run only once");
    
        API.getUsers().then((users) => {
          setUsers(users);
          console.log(users)
        });
    
        // const fetchCats = async () => {
        //   const cats = await API.getCats();
        //   setCats(cats);
        // };
    
        // fetchCats();
    
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
                <button disabled={!performValidation()} type="submit">
                    Login
                </button>
            </form>
        </div>
    )
}
export default Login;
