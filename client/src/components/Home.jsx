import React, { useState, useEffect } from "react";
import axios from "axios";
import Slides from "./slides";
import VoucherCards from "./VoucherCards";
import "./home.css";
import { NavLink } from "react-router-dom";
import videoGif from "../Cream White Floral Vintage Inspirational Quote Card Landscape (2).mp4";
import videoGif2 from "../bike.mp4";
import videoGif3 from "../Red Elegant Christmas Greeting Mobile Video.mp4";
import videoGif4 from "../flower.mp4";
import { Card } from "./Card";
import { useNavigate, useLocation } from "react-router-dom";

/* style={{border:"2px solid red"}} */

const categoryList = [
  { name: "food", image: "./images/food.png" },
  { name: "beauty", image: "./images/beauty.png" },
  { name: "sport", image: "./images/sport.png" },
  { name: "games", image: "./images/games.png" },
  { name: "style", image: "./images/style.png" },
  { name: "hobby", image: "./images/hobby.png" },
  { name: "garden", image: "./images/garden.png" },
  { name: "cinemas", image: "./images/cinemas.png" }
];
const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">

      <div>
        <NavLink to="/voucher/search" className="search-bar">
          <div>
            <i className="fa-solid fa-magnifying-glass">
              {" "}
              Search your next Gift!{" "}
            </i>
          </div>
        </NavLink>
      </div>

      <div className="open-carousel">
        <div className="home-carousel">
          {categoryList.map((el, index) => (
             <NavLink to = {`voucher/${el.name}`} key={index}>
              <div>
             <img
              className="gift-logo"
              src={el.image}
              alt=""
            /> 
            </div>   
             </NavLink>
          ))}
        </div>
      </div>
      <br />

       <div className="gift-bar" style={{marginBottom:"20px"}}>
          {" "}
          <i className="fa-solid fa-crown"> HOT Gifts! </i>
        </div>
    
      
      <div>

        <div className="video-container">
        <div >
        <video className="birth-video" src={videoGif} autoPlay loop muted onClick={()=>navigate("/hot-gifts/birthday")}>
          {" "}
        </video><video className="birth-video2" src={videoGif2} autoPlay loop muted onClick={()=>navigate("/hot-gifts/motherday")}>
              {" "}
            </video>
      </div>
          <div >
            
          </div>
          <div>
            <video className="birth-video3" src={videoGif3} autoPlay loop muted onClick={()=>navigate("/hot-gifts/christmas")}>
              {" "}
            </video>
            <video className="birth-video4" src={videoGif4} autoPlay loop muted onClick={()=>navigate("/hot-gifts/valentine-day")}>
              {" "}
            </video>
          </div>
        </div>
      </div>

 <div className="birth-gift" style={{marginBottom:"20px"}}>
        <div> Our Voucher Collection </div>
      </div> 
      <div>
        <div style={{width:"95%",margin:"0 auto 80px"}}>
        <VoucherCards />
        </div>
      </div>
    </div>
  );
};

export default Home;
