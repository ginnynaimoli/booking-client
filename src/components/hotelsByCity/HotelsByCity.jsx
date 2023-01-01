import React from 'react'
import useFetch from '../../hooks/useFetch'
import './hotelsByCity.css'
import { Link } from 'react-router-dom'

const HotelsByCity = () => {
  const { data, loading, error } = useFetch('https://booking-api-xkuy.onrender.com/api/hotels/countByCity?cities=new%20york,seoul,london')

  return (
    <div className="featured">
    {loading 
    ? ('Loading... Please wait!')
    : (
      <>
        <div className="featuredItem">
          <Link to='/hotels/city/new%20york' style={{ color: 'white' }}>
            <img
              src="https://lp-cms-production.imgix.net/features/2019/05/GettyImages-960609922-copy-1b250a469ea0.jpg?auto=format&q=40&ar=16%3A9&fit=crop"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>New York</h1>
              <h3>{data[0]} properties</h3>
            </div>
          </Link>
        </div>
        
        <div className="featuredItem">
          <Link to='/hotels/city/seoul' style={{ color: 'white' }}>
            <img
              src="https://media.istockphoto.com/photos/namsan-tower-and-seoul-city-skyline-picture-id1294740506?b=1&k=20&m=1294740506&s=170667a&w=0&h=JuGO0mt4ylCXSE8SYUoO2tF-0tc4kGd4pk7GSxrHuMc="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Seoul</h1>
              <h3>{data[1]} properties</h3>
            </div>
          </Link> 
        </div>
        
        <div className="featuredItem">
          <Link to='/hotels/city/london' style={{ color: 'white' }}>
            <img
              src="https://c4.wallpaperflare.com/wallpaper/588/833/260/city-london-london-eye-big-ben-wallpaper-preview.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>London</h1>
              <h3>{data[2]} properties</h3>
            </div>
          </Link>
        </div>
      </>
    )}
  </div>
  )
}

export default HotelsByCity