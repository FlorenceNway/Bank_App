import React, { useState, useEffect } from "react";
import Input from "./Form/Input";
import backArrow from "../images/Arrow.svg";
import manAvatar from "../images/man_1.svg";
import API from "./API";
import "./Style/setting.scss";

const Setting = () => {
  const [isHidden, setIsHidden] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    API.getUsers().then((users) => {
      const loggedInUser = users.find(
        (user) => user.email === localStorage.userEmail
      );
      setUser(loggedInUser);
    });
  }, []);

  const clickSetting = () => {
    setIsHidden(!isHidden);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    API.patchUser(user.id, user);

    alert("Your account has been updated!");
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const uploadFileHandler = (e) => {
    let imgPath = e.target.value.split("\\");
    setUser({ ...user, avatar: imgPath[2] });
  };

  return !isHidden && user ? (

    <div className="setting">
      <div className="form SignUpform">
        <div className="signUp_title">
          <span onClick={clickSetting}>
            <img src={backArrow} alt="backArrow"></img>
          </span>
          <span>Settings</span>
        </div>
        <div className="box">
          <div>
            <p>Block account</p>
            <span className="on">On</span>
            <label className="switch">
              <input type="checkbox" value="Off"/> <span className="slider"></span>
            </label>
            <span className="off">Off</span>
          </div>
          <div>
            <p>Round expenses and put to savings account</p>
            <span className="on">On</span>
            <label className="switch">
              <input type="checkbox" value="Off" />
              <span className="slider"></span>
            </label>
            <span className="off">Off</span>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <Input label="First Name" type="text" name="firstname" changeHandler={changeHandler} value={user.firstname}/>
          <Input label="Last Name" type="text" name="lastname" changeHandler={changeHandler} value={user.lastname}/>
          <Input label="Email" type="email"       name="email"  changeHandler={changeHandler} value={user.email}/>
          <Input label="Password" type="text" name="password" changeHandler={changeHandler}value={user.password}/>
          <Input label="Confirm Password" type="text" name="confpassword" changeHandler={changeHandler}value={user.password}/>

          <div className="uploadAvatar">
            <div className="button">
              <span>Upload Avatar</span>
              <label htmlFor="upload">Upload</label>
              <input type="file" id="upload" onChange={uploadFileHandler} />
            </div>
            <div>
              <img src={manAvatar} alt={"avatar"}></img>
            </div>
          </div>

          <button type="submit" className="saveBtn">Save</button>
        </form>
      </div>
    </div>
  ) : (
    ""
  );
};

export default Setting;
