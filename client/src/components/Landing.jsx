import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


 const Landing = () => {
   
    const navigate = useNavigate()

    useEffect(() => {
       setTimeout(() => {
          navigate('/home')
       }, 3000)
    }, [])
    return (
 
       <div className='landing'>
          <div className='container'>
             <h1>Landing Page</h1>
          </div></div>
    )
}

export default Landing