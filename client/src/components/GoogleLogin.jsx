import React, { useState, useEffect, useContext } from "react";
import { GoogleLogin } from "react-google-login";
import { useNavigate } from "react-router-dom";
import { gapi } from "gapi-script";
import UserContext from "./UserContext";
import axios from "axios";

const Login1 = () => {
  const [{ setAuthenticated }, { setName }, { setUserId }, { setEmail }, {setAvatar}] =
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

     const token = JSON.parse(localStorage.getItem("my-profile")).res.tokenId; // Google token

     const configuration = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
   
      if (token !== null) {
        axios
          .get(`${process.env.REACT_APP_BE_URL}/api/user/authorize-user`, configuration)
          .then((res) => {
            setName(res.data.name);
            res.data.avatar? setAvatar(res.data.avatar) : setAvatar(googleProfileObj.imageUrl)  
          })
          .catch((err) => {
            console.log(err.message)
          });
      }
    

    setAuthenticated(true);
    // setName(googleProfileObj.name); 
    setUserId(googleProfileObj.googleId);
    setEmail(googleProfileObj.email);
    //setAvatar(googleProfileObj.imageUrl)

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
