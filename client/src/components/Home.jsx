import React, { useState, useEffect } from "react";
import axios from "axios";
import Slides from "./slides";
import VoucherCards from "./VoucherCards";
import "./home.css";
import { NavLink } from "react-router-dom";
import videoGif from "../Cream White Floral Vintage Inspirational Quote Card Landscape (2).mp4";
import videoGif2 from "../bike.mp4";
import videoGif3 from "../music.mp4";
import videoGif4 from "../flower.mp4";
import { Card } from "./Card";

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

      {/* <div style={{ margin: "20px 0" }}>
        <Slides />
      </div> */}
      <div className="birth-gift">
        <div> Our best Birthday cards </div>
      </div>
      <div>
        <video className="birth-video" src={videoGif} autoPlay loop muted>
          {" "}
        </video>
      </div>
      <div className="list-container">
        <div className="birth-list">
          <div>
            <Card img="./images/birth.png" />
          </div>
          <div>
            <Card img="./images/birth1.png" />
          </div>
          <div>
            <Card img="./images/birth2.png" />
          </div>
          <div>
            <Card img="./images/birth3.png" />
          </div>
          <p className="more-button">
            <i className="fa-solid fa-gifts"></i> See more...
          </p>
        </div>
      </div>
      <br />
      <div>
        <div className="gift-bar">
          {" "}
          <i className="fa-solid fa-crown"> HOT Gifts! </i>
        </div>

        <div className="video-container">
          <div>
            <video className="birth-video2" src={videoGif2} autoPlay loop muted>
              {" "}
            </video>
          </div>
          <div>
            <video className="birth-video3" src={videoGif3} autoPlay loop muted>
              {" "}
            </video>
            <video className="birth-video4" src={videoGif4} autoPlay loop muted>
              {" "}
            </video>
          </div>
        </div>
      </div>
      

      <div>
        <div style={{width:"95%",margin:"0px auto 70px"}}>
        <VoucherCards />
        </div>
      </div>
    </div>
  );
};

export default Home;
