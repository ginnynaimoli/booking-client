import React from 'react'
import { Link } from 'react-router-dom'

const Registered = () => {
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
          <p>Registration completed successfully!</p>
          <Link to='/login'>
            <button className="logoutButton">Login</button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Registered