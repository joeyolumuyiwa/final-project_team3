import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Form.css";
import axios from "axios";
import Login1 from "./googleLogin";

const Register = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {};

    for (let i = 0; i < e.target.elements.length - 1; i++) {
      user[e.target.elements[i].name] = e.target.elements[i].value;
    }

    axios
      .post(`${process.env.REACT_APP_BE_URL}/api/user/signup`, user)
      .then((res) => {
        setSuccessMessage(res.data);
        e.target.reset();
        navigate("/redirect");
      })
      .catch((err) => {
        setErrorMessage(err.request.response);
      });
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <h1>Create Account</h1>
        <hr />
        <form onSubmit={handleSubmit}>
          <label> Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="full name"
            required
          ></input>
          <hr />

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

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            placeholder="*********"
            id="confirmPassword"
            name="confirmPassword"
            required
          ></input>
          <hr />

          <button type="submit">Submit</button>
        </form>

        <div>
          {successMessage && !errorMessage ? (
            <p style={{ color: "darkgreen", marginTop: "10px" }}>
              {successMessage}
            </p>
          ) : (
            <p style={{ color: "darkred", marginTop: "10px" }}>
              {errorMessage}
            </p>
          )}
        </div>
      </div>
      <hr/>
      <div>
        <Login1 />
      </div>
    </div>
  );
};

export default Register;
