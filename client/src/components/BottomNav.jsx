import React from "react";
import { NavLink } from "react-router-dom";
import "./bottomNav.css";

const BottomNav = () => {

  let showCount =JSON.parse(localStorage.getItem("cart-list")) && JSON.parse(localStorage.getItem("cart-list")).length > 0 ? "block" : "none"


  return (
    <div className="bottom-bar">
      <div className="icon1">
        <NavLink to={ JSON.parse(localStorage.getItem("my-profile")) ||
      JSON.parse(localStorage.getItem("my-app-token"))?"/my-profile":"/login"}>
          <i class="fa-solid fa-user"></i>
        </NavLink>


        <NavLink to="/contact">
          {" "}
          <i class="fa-solid fa-phone-volume"> </i>
        </NavLink>
      </div>{" "}
      <div className="logo">
        <div className="b-logo">
          <NavLink to="/home">
            {" "}
            <img src="/Gift (3).png" alt="" />
          </NavLink>
        </div>
      </div>{" "}
      <div className="icon2">
        <NavLink to="/voucher/search">
          <i class="fa-solid fa-magnifying-glass"></i>{" "}
        </NavLink>
       {/*  <NavLink to="/shopping-cart">
          <i class="fa-solid fa-cart-shopping"></i>
        </NavLink> */}

        <NavLink to="/shopping-cart">
          <i  className="fa-solid fa-cart-shopping shoppingbasket"> 
  <div className="basketitems" style={{display:`${showCount}`}}>{JSON.parse(localStorage.getItem("cart-list"))?JSON.parse(localStorage.getItem("cart-list")).length:""}</div>
</i>
          </NavLink>
      </div>
    </div>
  );
};

export default BottomNav;
