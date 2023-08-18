import React from "react";
import { NavLink } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <div>
      <footer>
        <h3 className="design">
          DCI Project 2023 <q>Gift4u Shop</q>
        </h3>
        <div style={{display:"flex", flexDirection:"column"}}>
          <NavLink to="/contact" className="contact">
            Contact Us
          </NavLink>
          <NavLink to="/privacy-policy" className="contact">
            Privacy Policy
          </NavLink>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
