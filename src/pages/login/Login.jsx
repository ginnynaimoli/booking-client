import { useContext, useState } from "react"
import "./login.css"
import { AuthContext } from "../../context/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

const Login = () => {
  const [ credentials, setCredentials ] = useState({
    username: undefined, 
    password: undefined
  })

  const { loading, error, dispatch } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" })
    try {
      const res = await axios.post("https://booking-api-xkuy.onrender.com/api/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      navigate("/")
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
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

    <div className="login">
      <div className="lContainer">
        <h3>Sign in or create an account</h3>
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button disabled={loading} onClick={handleClick} className="lButton">
          Login
        </button>
        {error && <span>{error.message}</span>}
        <button className="lButton"><Link to='/register' style={{ color:'white', textDecoration: 'none'}}>Create an account</Link></button>
      </div>
    </div>
   </>
  )
}

export default Login