import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SearchContext } from '../../context/SearchContext'
import useFetch from '../../hooks/useFetch'
import './reservation.css'

const Reservation = ({ setOpen, hotelId }) => {
  const { data } = useFetch(`https://style-me-api.onrender.com/api/hotels/room/${hotelId}`)
  const [selectedRooms, setSelectedRooms] = useState([])
  const { dates } = useContext(SearchContext)
  const navigate = useNavigate()

  console.log(data)

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());
    const dateList = [];
    while (date <= end) {
      dateList.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return dateList
  }
  
  const selectedDates = getDatesInRange(dates[0].startDate, dates[0].endDate)

  // take in room number and check if room is in the unavailable array (if found mean date is selected) return not found (false) mean available
  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) => 
      selectedDates.includes(new Date(date).getTime())
    )    
    return !isFound
  }

  const handleSelect = (e) => {
    const checked = e.target.checked
    const value = e.target.value
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    )
  }

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const response = axios.put(`https://style-me-api.onrender.com/api/rooms/availability/${roomId}`, {
            dates: selectedDates
          })
          return response.data
        })
      )
      setOpen(false)
      navigate("/", { state: dates, selectedRooms})
    } catch (err) {}
  }

  return (
    <div className='reserve'>
      <div className="rContainer">
        <FontAwesomeIcon 
          icon={faCircleXmark} 
          className='rClose' 
          onClick={()=>setOpen(false)} />
        <span className="selection">Select your rooms</span>
        {data.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.description}</div>
              <div className="rMax">
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">$ {item.price}</div>
            </div>

            <div className="rSelectRooms">
              {item.roomNumbers.map((roomNumber) => (
                <div className="room" key={roomNumber._id}>
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={handleClick} className="rButton">
          Reserve Now!
        </button>
      </div>
    </div>
  )
}

export default Reservation