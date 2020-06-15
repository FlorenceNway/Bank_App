import React,{useState, useEffect} from "react";
import { Link } from "react-router-dom";
import Input from './Form/Input'
import backArrow from '../images/Arrow.svg'
import manAvatar from '../images/man_1.svg'
import API from './API'
import { useHistory } from "react-router-dom";
import './Style/setting.scss'

const Setting = () => {
  const [isHidden, setIsHidden] = useState(false)

  const clickSetting = () => {
    setIsHidden(!isHidden)
  }

  const [users, setUsers] = useState([]);
  const [updateUser, setUpdateUser] = useState([])
  
  useEffect(() => { 
    API.getUsers().then((users) => {
      setUsers(users);
    });
  }, []);

  const loggedInUser = users.filter(user => user.email === localStorage.userEmail)

  const handleSubmit = (e) => {
      e.preventDefault();

    const id = loggedInUser[0].id
    API.patchUser(id,updateUser)
      
    alert("Your account has been updated!")
  }
  
  const changeHandler = (e) => {
      const {name, value} = e.target
      setUpdateUser(
          {...updateUser,
            [name]: value}
      )
  }

  const uploadFileHandler = (e) => {
    let imgPath = e.target.value.split("\\")

    setUpdateUser({...updateUser,
        avatar: imgPath[2]})
  }

  
  return !isHidden && loggedInUser.length ? (
    <div className="setting">
        <div className="form SignUpform">
            <div className="signUp_title">
              <span onClick={clickSetting}><img src={backArrow} alt="backArrow"></img></span>
              <span>Settings</span>
            </div>
            <div className="box">
              <div>
                <p>Block account</p>
                <span className='on'>On</span>
                <label className="switch">
                  <input type="checkbox" value="Off"/><span className="slider"></span>
                </label>
                <span className='off'>Off</span>
              </div>
              <div>
                <p>Round expenses and put to savings account</p>
                <span className='on'>On</span>
                <label className="switch">
                  <input type="checkbox" value="Off"/><span className="slider"></span>
                </label>
                <span className="off">Off</span>
              </div> 
            </div>
            <form onSubmit={handleSubmit}>
                <Input label="First Name" type='text' name="firstname" changeHandler={changeHandler} value={loggedInUser[0].firstname} />
                <Input label="Last Name" type='text' name="lastname" changeHandler={changeHandler} value={loggedInUser[0].lastname}/>
                <Input label="Email" type='email' name="email" changeHandler={changeHandler} value={loggedInUser[0].email}/>
                <Input label="Password" type='text' name="password" changeHandler={changeHandler} value={loggedInUser[0].password}/>
                <Input label="Confirm Password" type='text' name="confpassword" changeHandler={changeHandler} value={loggedInUser[0].password}/>
                
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

                <button type="submit" className="saveBtn"> Save </button>
            </form>
        </div>
        
    </div>
  ) : (
    ""
  );
};

export default Setting;