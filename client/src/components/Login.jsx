import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Form.css";

const Login = ({ setName, setUserId, setAuthenticated, setEmail }) => {
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
            setEmail(res.data.email)
            navigate("/");
         })
         .catch((err) => {
            setErrorMessage(err.response.data);
         });
   };

   return (
      <div className="form-container">
         <div className="form-wrapper">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
               <label htmlFor="email">Email</label>
               <input
                  type="email"
                  placeholder="your.email@gmail.com"
                  id="email"
                  name="email"
                  required
               ></input>
               <hr />
               <label htmlFor="password">Password</label>
               <input
                  type="password"
                  placeholder="*********"
                  id="password"
                  name="password"
                  required
               ></input>
               <hr />

               <button type="submit">Submit</button>
            </form>
            
            {errorMessage && (
               <p style={{ color: "darkred", marginTop: "10px" }}>{errorMessage}</p>
            )}
            <br />
            <p>
               Don't have a account? Please register
               <NavLink to="/register"> here.</NavLink>
            </p>
         </div>
      </div>
   );
};

export default Login;