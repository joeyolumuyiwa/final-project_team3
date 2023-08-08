import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Form.css";
import Login1 from "./GoogleLogin";
import UserContext from "./UserContext";
import {motion} from "framer-motion";

const Login = () => {
  const [{ setAuthenticated }, { setName }, { setUserId }, { setEmail }, {setAvatar}] =
    useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const credentials = {};

    for (let i = 0; i < e.target.elements.length - 1; i++) {
      credentials[e.target.elements[i].name] = e.target.elements[i].value;
    }

    axios
      .post(`${process.env.REACT_APP_BE_URL}/api/user/login`, credentials)
      .then((res) => {
        localStorage.setItem("my-app-token", JSON.stringify(res.data.token));
        e.target.reset();

        setAuthenticated(true);
        setName(res.data.name);
        setUserId(res.data.userId);
        setEmail(res.data.email);
        res.data.avatar? setAvatar(res.data.avatar) : setAvatar("https://cdn-icons-png.flaticon.com/512/6388/6388000.png") 
        navigate("/home");
      })
      .catch((err) => {
        setErrorMessage(err.response.data);
      });
  };

  return (
    <div className="form-container">
      <div >
        <motion.img className="logo" animate={{
        scale: [1, 1, 1, 1, 1],
        rotate: [0, 0, 180, 180, 0],
        
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        times: [0, 0.2, 0.5, 0.8, 1],
        
      }} src="/Gift4u.png" alt="logo" />
      </div>
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}> <br />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="your.email@gmail.com"
          id="email"
          name="email"
          required
        ></input> <br />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="*********"
          id="password"
          name="password"
          required
        ></input>
        <motion.button className="l-btn" whileHover={{scale:1.2}} type="submit">Login</motion.button>
      </form>
      {errorMessage && <p style={{ color: "darkred" }}>{errorMessage}</p>}
      <br />
      <div> <p> or login with:</p>
      
      <i class="fab fa-google"></i> 
      <i class="fab fa-facebook"></i>  

      <i class="fab fa-instagram"></i>
      </div>
      <motion.p whileHover={{scale:1.2}}>
        Don´t have an account? Register <NavLink className="linkin" to="/register">here! </NavLink>
        
      </motion.p>
      <p style={{ color: "Tomato" }}>
          Forgot Password? <NavLink to="/reset-password">Click Here!</NavLink>
        </p>

    </div>
  );
};

export default Login;
