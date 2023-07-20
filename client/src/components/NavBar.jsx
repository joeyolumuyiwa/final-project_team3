import React, {useContext} from "react";
import { NavLink } from "react-router-dom";
import UserContext from "./UserContext";

const NavBar = () => {
   const [{authenticated}, {name},,, {avatar}, {logoutHandler}] = useContext(UserContext)
   
   return <>
      <header className="header" id="header">
         <div className="container">
           { authenticated && <div style={{display:"flex",alignItems:"center"}}>
            {avatar && <img src={avatar} alt="User Avatar" style={{width:"60px", height:"60px", borderRadius:"50%", marginRight:"10px"}} />}
               <h2>Welcome {name}</h2>
            </div>}
            <NavLink to='/home' className="logo">
               Gift4U
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



