import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
   const [usersNum, setUsersNum] = useState(null);

   useEffect(() => {
      axios
         .get(`${process.env.REACT_APP_BE_URL}`)
         .then((res) => {
            setUsersNum(res.data);
         })
         .catch((err) => {
            console.log(err.request.response);
         });
   }, []);

   return (

      <div className="landing">
         <div className="container">
            <div className="text">
               <h1>Welcome, to our Gift4U Shop </h1>
               <p>
               Join our Gift4U Shop.
               </p>
               <h2>We have right now {usersNum} Customers.</h2>
            </div>
         </div>
      
      </div>
   );
};

export default Home;
