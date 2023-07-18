import React, { useState, useEffect, useContext } from "react";
import { GoogleLogin } from "react-google-login";
import { useNavigate } from "react-router-dom";
import { gapi } from "gapi-script";
import UserContext from "./UserContext";

const Login1 = () => {
  const [{ setAuthenticated }, { setName }, { setUserId }, { setEmail }] =
    useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: process.env.REACT_APP_CLIENT_ID,
        scope: "email",
      });
    }

    gapi.load("client:auth2", start);
  }, []);

  const onSuccess = (res) => {
   
    localStorage.setItem("my-profile", JSON.stringify({ res }));

    const googleProfileObj = JSON.parse(localStorage.getItem("my-profile")).res
      .profileObj;

    setAuthenticated(true);
    setName(googleProfileObj.name);
    setUserId(googleProfileObj.sub);
    setEmail(googleProfileObj.email);

    navigate("/home");
  };
  const onFailure = (response) => {
    console.log("FAILED", response);
  };

  return (
    <div>
      <GoogleLogin
        clientId={process.env.REACT_APP_CLIENT_ID}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
    </div>
  );
};
export default Login1;
