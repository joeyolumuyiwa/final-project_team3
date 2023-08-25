import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {UserContext} from "./UserContext";
import "./Navbar.css";

const NavBar = () => {
  const [
    { authenticated },
    { name },
    ,
    ,
    { avatar },
    { logoutHandler },
    { click, setClick },
  ] = useContext(UserContext);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <>
      <header className="navbar">
        <div className="container">
        <NavLink to="/home" className="navbar-logo" onClick={closeMobileMenu}>
            <img src="/logo-gift.png" alt="" />
          </NavLink>
          {authenticated && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "100px",
              }}
            >
              {avatar && (
                <img
                  src={avatar}
                  alt="User Avatar"
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    marginRight: "20px",
                  }}
                />
              )}
              <h3>Welcome {name.split(" ")[0]}</h3>
            </div>
          )}
        
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                to="/home"
                className="nav-links"
                onClick={closeMobileMenu}
              >
               <i class="fa-solid fa-house"> Home</i> 
              </NavLink>
            </li>
            {!authenticated && (
              <li className="nav-item">
                <NavLink
                  to="/register"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  {" "}
                  <i class="fa-solid fa-clipboard-user">  Register</i>  {" "}
                </NavLink>
              </li>
            )}

            {authenticated && (
              <li className="nav-item">
                <NavLink
                  to="/my-profile"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                <i class="fa-solid fa-user"> My Profile</i>  
                </NavLink>
              </li>
            )}

            <li className="nav-item">
              <NavLink
                to="/contact"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                <i class="fa-solid fa-phone-volume"> Contact Us</i>
              </NavLink>
            </li>
            {authenticated ? (
              <li className="nav-item">
                <NavLink
                  to="/login"
                  className="nav-links"
                  onClick={logoutHandler}
                >
                  <i class="fa-solid fa-arrow-right-from-bracket"> Logout</i>
                </NavLink>
              </li>
            ) : (
              <li className="nav-item">
                {" "}
                <NavLink
                  to="/login"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  <i class="fa-solid fa-right-to-bracket"> Login</i>
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </header>
    </>
  );
};

export default NavBar;
