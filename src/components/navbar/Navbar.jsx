import './navbar.css'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { useContext } from 'react'

export const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext)

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" })
  }

  return (
    <div className='navbar'>
      <div className="navContainer">
        <Link to='/' style={{ color: 'inherit', textDecoration: 'none' }}>
          <span className='logo'>Booking.com</span>
        </Link> 
        {user 
          ? (
            <div className="navItems">
              <span>Welcome, {user.username}!</span>
              <Link to='/logout'>
                <button onClick={handleLogout} className="navButton">Log Out</button>
              </Link>
            </div>
            )
          : (
              <div className="navItems">
                <Link to='/register'>
                  <button className="navButton">Register</button>
                </Link>
                <Link to='/login'>
                  <button className="navButton">Login</button>
                </Link>
              </div>
            )}
      </div>
    </div>
  )
}

export default Navbar