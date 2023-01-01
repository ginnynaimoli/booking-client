import "./hotelsFavorite.css"
import useFetch from '../../hooks/useFetch'
import { Link } from "react-router-dom"

const HotelsFavorite = () => {
  const { data, loading, error } = useFetch('https://booking-api-xkuy.onrender.com/api/hotels?featured=true&limit=4')
  
  return (
    <div className="fp">
    {loading 
      ? ('Loading... Please wait!') 
      : (
        <>
          {data.map((item) => (
            <Link to={`/hotels/${item._id}`} style={{ textDecoration: 'none', color: 'black'}} key={item._id}>
              <div className="fpItem"  >
                <img
                  src={item.photos[0]}
                  alt=""
                  className="fpImg"
                />
                <span className="fpName">{item.name}</span>
                <span className="fpCity">{item.city.replace(/\b\w/g, l => l.toUpperCase())}</span>
                <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
                {item.rating && <div className="fpRating">
                  <button>{item.rating}</button>
                  <span>Excellent</span>
                </div>}
              </div>
            </Link>
          ))}
        </>
      )}
    </div>
  )
}

export default HotelsFavorite;