import React from "react";
import { NavLink } from "react-router-dom";
import "./bottomNav.css"

const BottomNav =() => {

    return (
<div className="bottom-bar">
        <div className="icon1"><NavLink to="/my-profile"><i class="fa-solid fa-user"></i></NavLink> <i class="fa-solid fa-list"></i></div> <div className="logo">
          <div className="b-logo">
           <NavLink to="/"> <img  src="/logo-gift.png" alt="" /></NavLink>
          </div>
        </div> <div className="icon2">
        <NavLink to="/voucher/search"><i class="fa-solid fa-magnifying-glass"></i> </NavLink>
          <NavLink to="/"><i class="fa-solid fa-cart-shopping"></i></NavLink></div>
      </div>
    )
}


export default BottomNav