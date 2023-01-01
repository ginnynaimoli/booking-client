import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import './register.css'

const Register = () => {
  const [ credentials, setCredentials ] = useState({
    username: undefined,
    email: undefined, 
    password: undefined
  })

  const { loading, error, dispatch } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch({ type: "REGISTER_START" })
    try {
      const res = await axios.post("https://booking-api.onrender.com/api/auth/register", credentials);
      dispatch({ type: "REGISTER_SUCCESS" });
      navigate("/registered")
    } catch (err) {
      dispatch({ type: "REGISTER_FAILURE", payload: err.response.data });
    }
  }
 

  return (
    <> 
      <div className='navbar'>
        <div className="navContainer">
          <Link to='/' style={{ color: 'inherit', textDecoration: 'none' }}>
            <span className='logo'>Booking.com</span>
          </Link> 
        </div>
      </div>

      <div className="register">
        <div className="regContainer">
          <h3>Create an account</h3>
          <input
            type="text"
            placeholder="username"
            id="username"
            onChange={handleChange}
            className="regInput"
          />
          <input
            type="email"
            placeholder="email"
            id="email"
            onChange={handleChange}
            className="regInput"
          />
          <input
            type="password"
            placeholder="password"
            id="password"
            onChange={handleChange}
            className="regInput"
          />
          <button disabled={loading} onClick={handleSubmit} className="regButton">
            Create
          </button>
          {error && <span>{error.message}</span>}
        </div>
      </div>
    </>
  )
}

export default Register