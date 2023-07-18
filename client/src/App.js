import { Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import NavBar from "./components/NavBar";
import ConfirmEmail from "./components/ConfirmEmail";
import Contact from "./components/Contact";
import Redirect from "./components/Redirect";
import ResetPassword from "./components/ResetPassword";
import PasswordRecovery from "./components/PasswordRecovery";
import ChangePassword from "./components/ChangePassword";
import UserContext from "./components/UserContext";
import { useLocation } from 'react-router-dom'
import Landing from "./components/Landing";

function App() {
const location = useLocation()

  const [authenticated, setAuthenticated] = useState(false);
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");

  const logoutHandler = () => {
    setAuthenticated(false);
    if (JSON.parse(localStorage.getItem("my-profile"))) {
      localStorage.removeItem("my-profile");
    } else {
      localStorage.removeItem("my-app-token");
    }
  };

  return (
    <UserContext.Provider
      value={[
        { authenticated: authenticated, setAuthenticated: setAuthenticated },
        { name: name, setName: setName },
        { userId: userId, setUserId: setUserId },
        { email: email, setEmail: setEmail },
        {logoutHandler: logoutHandler}
      ]}
    >
      {location.pathname !== "/" && <  NavBar />}
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/confirm-email/:token" element={<ConfirmEmail />} />
          <Route path="/redirect" element={<Redirect />} />
          <Route path="/my-profile" element={<Profile />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route
            path="/reset-password/:email/:token"
            element={<PasswordRecovery />}
          />
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
