import React from 'react'
import { Link } from 'react-router-dom'
import './logout.css'

const Logout = () => {
  return (
    <>
      <div className='navbar'>
        <div className="navContainer">
          <Link to='/' style={{ color: 'inherit', textDecoration: 'none' }}>
            <span className='logo'>Booking.com</span>
          </Link> 
        </div>
      </div>
  
      <div className="logout">
        <div className="logoutContainer">
          <p>You have been logged out!</p>
          <Link to='/login'>
            <button className="logoutButton">Login</button>
          </Link>
          <Link to='/'>
            <button className="logoutButton">Homepage</button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Logout