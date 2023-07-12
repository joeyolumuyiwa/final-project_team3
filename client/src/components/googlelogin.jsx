import React from "react";
import { GoogleLogin } from "react-google-login";
import { useNavigate } from "react-router-dom";

const onSuccess = (res) => {
  console.log(res);

  alert(`Logged in successfully! Welcome ${res.profileObj.name}`);
  localStorage.setItem("profile", JSON.stringify({ res }));
};


const onFailure = (res) => {
  console.log(res);
  // if (res)
  // alert("Login failed!");
};

const Login2 = () => {

  const navigate = useNavigate()

  
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


export default Login2;