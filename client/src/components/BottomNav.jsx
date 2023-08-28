import React from "react";
import { NavLink } from "react-router-dom";
import "./bottomNav.css"

const BottomNav =() => {

    return (
<div className="bottom-bar">
        <div className="icon1"><NavLink to="/my-profile"><i class="fa-solid fa-user"></i></NavLink> 
        <NavLink to="/contact"> <i class="fa-solid fa-phone-volume"> </i></NavLink></div> <div className="logo">
          <div className="b-logo">
           <NavLink to="/home"> <img  src="/Gift (3).png" alt="" /></NavLink>
          </div>
        </div> <div className="icon2">
        <NavLink to="/voucher/search"><i class="fa-solid fa-magnifying-glass"></i> </NavLink>
          <NavLink to="/shopping-cart"><i class="fa-solid fa-cart-shopping"></i></NavLink></div>
      </div>
    )
}


export default BottomNav