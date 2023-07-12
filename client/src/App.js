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
import ChangePassword from "./components/ChangePassword"

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");

  const logoutHandler = () => {
    setAuthenticated(false);
    localStorage.removeItem("my-app-token");
  };

  return (
    <>
      <NavBar
        authenticated={authenticated}
        name={name}
        setAuthenticated={setAuthenticated}
        logoutHandler={logoutHandler}
      />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <Login
                setName={setName}
                setUserId={setUserId}
                setAuthenticated={setAuthenticated}
                authenticated={authenticated}
                setEmail={setEmail}
              />
            }
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/confirm-email/:token"
            element={
              <ConfirmEmail
                setName={setName}
                setAuthenticated={setAuthenticated}
              />
            }
          />
          <Route path="/redirect" element={<Redirect name={name} />} />
          <Route
            path="/my-profile"
            element={
              <Profile
                name={name}
                userId={userId}
                authenticated={authenticated}
                email={email}
              />
            }
          />
          <Route
            path="/contact"
            element={
              <Contact
                name={name}
                userId={userId}
                authenticated={authenticated}
              />
            }
          />
           <Route path="/reset-password" element={<ResetPassword/>} />
           <Route path="/change-password" element={<ChangePassword/>} />
           <Route path="/reset-password/:email/:token" element={<PasswordRecovery/>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
