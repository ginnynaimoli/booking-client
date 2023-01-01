import React, { useContext, useState } from 'react'
import Navbar from "../../components/navbar/Navbar"
import Header from "../../components/header/Header"
import './list.css'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { format, previousDay } from 'date-fns'
import { DateRange } from 'react-date-range'
import SearchItem from '../../components/searchItem/SearchItem'
import useFetch from "../../hooks/useFetch"
import { SearchContext } from '../../context/SearchContext'

const List = () => {
  const location = useLocation()
  const [ destination, setDestination ] = useState(location.state?.destination)
  const [options, setOptions] = useState(location.state?.options)
  const [dates, setDates] = useState(location.state?.dates || [{ startDate: new Date(), endDate: new Date(), key: 'selection' }]) 
  const [openDate, setOpenDate] = useState(false)
  const [min, setMin] = useState(undefined)
  const [max, setMax] = useState(undefined)
  const { dispatch } = useContext(SearchContext)
  const navigate = useNavigate()

  const city = useParams()

  console.log(destination)
  
  const { data, loading, reFetch } = useFetch(
    destination 
      ? `https://booking-api.onrender.com/api/hotels?city=${destination}&min=${min || 0 }&max=${max || 999}`
      : city.name 
        ? `https://booking-api.onrender.com/api/hotels/city/${city.name}?min=${min || 0 }&max=${max || 999}`
        : `https://booking-api.onrender.com/api/hotels`
  )

  const handleClick = () => {
    reFetch()
    dispatch({ type: 'NEW_SEARCH', payload: { destination, dates, options }})
    navigate('/hotels', { state: {destination, dates, options} })
  }

  return (
    <div>
      <Navbar />
      <Header type='list'/>
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input placeholder={city ? city.name : destination} type="text" 
                onChange={(e) => setDestination(e.target.value)}/>
            </div>

            <div className="lsItem">
              <label>Check in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>
                {`${format(dates[0].startDate,"MM/dd/yyyy")} 
                  to ${format(dates[0].endDate, "MM/dd/yyyy")}`}
              </span>
              {openDate && (
                <DateRange 
                    onChange={item => setDates([item.selection])}
                    ranges={dates}
                    minDate={new Date()}
                />
              )}
            </div>

            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input 
                    onChange={e=>setMin(e.target.value)}
                    type="number" className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input 
                    onChange={e=>setMax(e.target.value)}
                    type="number" className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options?.adult}                    
                    />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input                    
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={options?.children}                    
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options?.room}
                    onChange={(e)=>setOptions({room: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <button onClick={handleClick}>Search</button>
          </div>
          <div className="listResult">
            {loading 
              ? ('Loading... Please wait!') 
              : (
                  <>
                    {data.map((item) => (
                      <SearchItem item={item} key={item._id}/>
                    ))}
                  </>
                )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default List