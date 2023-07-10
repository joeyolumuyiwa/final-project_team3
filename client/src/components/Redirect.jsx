import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Redirect() {
   const navigate = useNavigate()

   useEffect(() => {
      setTimeout(() => {
         navigate('/login')
      }, 10000)
   }, [])
   return (

      <div className='landing'>
         <div className='container'>
            <h1>Thank you! We have sent you an email to complete your registration. You will be redirected to the login page...</h1>
         </div></div>
   )
}