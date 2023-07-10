import React, { useState, useEffect } from "react";
// import { NavLink, useNavigate } from "react-router-dom";

import axios from "axios";

const Profile = ({ name, userId, authenticated, email }) => {
  
   const [errorMessage, setErrorMessage] = useState("");
   const [profile, setProfile] = useState({});
   const [successMessage, setSuccessMessage] = useState("");
   const [userData, setUserData] = useState({
      name: "",
      email: "",
      location: ""
   });


   //const navigate = useNavigate();

   const configuration =  {
      headers: {
          'Authorization' : `Bearer ${JSON.parse(localStorage.getItem('my-app-token'))}` 
      }
  }

   useEffect(()=>{
      axios.get(`${process.env.REACT_APP_BE_URL}/api/user/profile-details`, configuration)
      .then(response=>{
         setProfile(response.data)
      })
      .catch(err => setErrorMessage(err.request.response))
  }, [])

userData["name"] = profile.name
userData["email"] = profile.email
userData["location"] = profile.location


   
         const handleSubmit = async (e) => {
            e.preventDefault();


      for (let i = 0; i < e.target.elements.length - 1; i++) {
        userData[e.target.elements[i].name] = e.target.elements[i].value;
      }


            axios
            .put(
               `${process.env.REACT_APP_BE_URL}/api/user/update-profile`, userData, configuration)
             .then((res) => {
               setSuccessMessage(res.data)
            })
            .catch((err) => {
               setErrorMessage(err.request.response);
            }) 
            clear();
          };

          const clear = () => {
            setUserData({
               name: "",
               email: "",
               location: ""
            });
          };


   return (
      <React.Fragment>
<div className="form-container">
            <div className="form-wrapper">
               <h1>Edit Profile</h1>
               <hr />
               <form onSubmit={handleSubmit}>
                  <label htmlFor="name"> Name:</label>
                  <input
                     type="text"
                     id="name"
                     name="name"
                     defaultValue={userData.name}
                     required
                  />
               <hr />

                  <label htmlFor="email">Email:</label>
                  <input
                     type="email"
                     id="email"
                     name="email"
                     defaultValue={userData.email}
                     required
                  />
               <hr />

                  <label htmlFor="location">Location:</label>
                  <input
                     type="text"
                     id="location"
                     name="location"
                     defaultValue={userData.location}
                     required
                  />
                  <hr />

                  {<button type="submit" className="save">Save Changes</button>}
               </form>

               <div>
                  <br />
               {errorMessage && <p style={{ color: "darkred" }}>{errorMessage}</p>}
         {successMessage && <p style={{ color: "darkgreen" }}>{successMessage}</p>}
               </div>
            </div>
         </div>

      </React.Fragment>
   );
};

export default Profile;
