import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";


const Contact = () => {

   const [errorMessage, setErrorMessage] = useState("");
   const [successMessage, setSuccessMessage] = useState("");
  

   return (<>

<div>
   <h1>Gift Shop Contact Details</h1>
</div>
     
   </>);
};

export default Contact;
