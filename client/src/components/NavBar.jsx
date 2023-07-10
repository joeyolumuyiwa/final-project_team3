import React from "react";
import { NavLink } from "react-router-dom";
const NavBar = ({ authenticated, userName, setAuthenticated, logoutHandler }) => {
   return <>
      <header className="header" id="header">
         <div className="container">
            <NavLink to='/' className="logo">
               Gift Shop
            </NavLink>
            <ul className="main-nav">
               <li>
                  {!authenticated && <NavLink to='/register'> Register </NavLink>}
               </li>
               <li>
                  {authenticated && <NavLink to="/my-profile">My Profile</NavLink>}
               </li>
               <li><NavLink to="/contact">Contact</NavLink></li>
               <li>
                  {authenticated ?
                     <NavLink to="/login" onClick={logoutHandler}>Logout</NavLink>
                     : <NavLink to="/login">Login</NavLink>
                  }
               </li>
            </ul>
         </div>
      </header>
   </>;
};

export default NavBar;



