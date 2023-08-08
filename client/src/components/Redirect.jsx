import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from "./UserContext";
import videoGif from "../Redirect.mp4"

export default function Redirect() {
   const [, {name}] = useContext(UserContext)

   const navigate = useNavigate()

   useEffect(() => {
      setTimeout(() => {
         navigate('/login')
      }, 5000)
   }, [])
   return (

      <div className='redirect'>
         
         <video className="redirect-img" src={videoGif} autoPlay loop muted> </video>
            <h1>Thank you {name}! We have sent you an email to complete your registration. You will be redirected to the login page...</h1>
         </div>
   )
}