import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home';
import List from './pages/list/List';
import Hotel from './pages/singleHotel/Hotel';
import Login from './pages/login/Login';
import Logout from './pages/logout/Logout';
import Register from './pages/register/Register';
import Registered from './pages/registered/Registered';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/hotels' element={<List />} />
        <Route path='/hotels/city/:name' element={<List />} />
        <Route path='/hotels/:id' element={<Hotel />} />
        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/register' element={<Register />} />
        <Route path='/registered' element={<Registered />} />
      </Routes>
    </Router>
  ); 
}

export default App;
