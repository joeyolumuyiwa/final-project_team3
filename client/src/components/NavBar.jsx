import React, {useContext, useState} from "react";
import { NavLink } from "react-router-dom";
import UserContext from "./UserContext";
import './Navbar.css';

const NavBar = () => {
   const [{authenticated}, {name},,, {avatar}, {logoutHandler}] = useContext(UserContext)
   const [click, setClick] = useState(false);
  

   const handleClick = () => setClick(!click);
   const closeMobileMenu = () => setClick(false);

   return <>
      <header className="navbar" >
         <div className="container">
           { authenticated && <div style={{display:"flex",alignItems:"center"}}>
            {avatar && <img src={avatar} alt="User Avatar" style={{width:"60px", height:"60px", borderRadius:"50%", marginRight:"10px"}} />}
               <h2>Welcome {name}</h2>
            </div>}
            <NavLink to='/' className='navbar-logo' onClick={closeMobileMenu}>
          GIFT4U
          
          <i class="fas fa-gift"></i>
        </NavLink>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>

        
           <li className='nav-item'>
                  {authenticated && <NavLink to="/my-profile" className='nav-links'
              onClick={closeMobileMenu}> Profile</NavLink>}
               </li>
               <li className='nav-item' > <NavLink to="/home" className='nav-links' onClick={closeMobileMenu}>Home</NavLink></li>
               <li className='nav-item'>
               
                  {!authenticated && <NavLink to='/register' className='nav-links' onClick={closeMobileMenu}> Register </NavLink>}
               </li>
              
               
               <li className='nav-item' >
                  {authenticated ?
                     <NavLink to="/login"  onClick={logoutHandler}>Logout</NavLink>
                     : <NavLink to="/login"  className='nav-links'
                     onClick={closeMobileMenu}>Login</NavLink>
                  }
               </li><li className='nav-item' > <NavLink to="/contact" className='nav-links' onClick={closeMobileMenu}>Contact</NavLink></li>
            </ul>
         </div>
      </header>
   </>;
};

export default NavBar;



