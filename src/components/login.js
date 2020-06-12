import React,{useState} from "react";
import './login.scss';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function performValidation() {
        return username.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                    <input className="input" type="email" name="email" onChange={e => setUsername(e.target.value)} required />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                    <input className="input" type="password" name="password" onChange={e => setPassword(e.target.value)} required />
                    </div>
                </div>
                <button disabled={!performValidation()} type="submit">
                    Login
                </button>
            </form>
        </div>
    )
}
export default Login;
