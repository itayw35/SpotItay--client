import React, { useContext, useRef, useState } from "react";
import axios from "axios";
import "./Login.css";
import { PlaylistContext } from "../context/context";
export default function Login(props) {
  const loginRef = useRef();
  const registerRef = useRef();
  const [isLogin, setIsLogin] = useState(false);
  const { setCurrentPlaylist, baseURL } = useContext(PlaylistContext);
  const makeLogin = function () {
    registerRef.current.style.backgroundColor = "grey";
    loginRef.current.style.backgroundColor = "aliceblue";
    setIsLogin(true);
  };
  const makeRegister = function () {
    loginRef.current.style.backgroundColor = "grey";
    registerRef.current.style.backgroundColor = "aliceblue";
    setIsLogin(false);
  };
  const login = function (e) {
    e.preventDefault();
    const userName = e.target.userName.value;
    const password = e.target.password.value;
    const fname = e.target.firstName?.value;
    const lname = e.target.lastName?.value;
    const gender = e.target.gender?.value;
    const url = isLogin
      ? `${baseURL}/users/login`
      : `${baseURL}/users/register`;
    axios
      .post(url, {
        fname: fname,
        lname: lname,
        gender: gender,
        email: userName,
        password: password,
      })
      .then((res) => {
        localStorage.token = res.data.token;
        localStorage.userName = res.data.userName;
        props.setIsLogged(true);
        setCurrentPlaylist();
      })
      .catch((err) => console.log(err));
    //conditional request - login/register
  };
  return (
    <div id="login-box">
      <form className="login-form" onSubmit={(e) => login(e)}>
        {!isLogin ? (
          <div className="register-form">
            <input
              name="firstName"
              className="user-details"
              placeholder="first name"
              type={"text"}
            ></input>
            <input
              name="lastName"
              className="user-details"
              placeholder="last name"
              type={"text"}
            ></input>
            <div className="user-gender">
              <label>male</label>{" "}
              <input name="gender" type={"radio"} value="male"></input>
              <label>female</label>{" "}
              <input name="gender" type={"radio"} value="female"></input>
            </div>
          </div>
        ) : null}
        <input
          name="userName"
          className="user-details"
          placeholder="email"
          type={"email"}
        ></input>

        <input
          name="password"
          className="user-details"
          placeholder="password"
          type={"password"}
        ></input>

        <input className="submit-btn" type={"submit"}></input>
      </form>
      <div className="login-register-state">
        <button ref={loginRef} onClick={() => makeLogin()} id="login-btn">
          Sign-in
        </button>
        <button
          ref={registerRef}
          onClick={() => makeRegister()}
          id="register-btn"
        >
          Sign-up
        </button>
      </div>
    </div>
  );
}
