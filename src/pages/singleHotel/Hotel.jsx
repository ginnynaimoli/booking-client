import React, { useContext } from 'react'
import './hotel.css'
import Navbar from "../../components/navbar/Navbar"
import Header from "../../components/header/Header"
import MailList from "../../components/mailList/MailList"
import Footer from "../../components/footer/Footer"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import useFetch from "../../hooks/useFetch"
import { useLocation, useNavigate } from 'react-router-dom'
import { SearchContext } from '../../context/SearchContext'
import { AuthContext } from '../../context/AuthContext'
import Reservation from '../../components/reservation/Reservation'

const Hotel = () => {
  const location = useLocation()
  const id = location.pathname.split("/")[2]
  const [ slideNumber, setSlideNumber ] = useState(0)
  const [ openSlider, setOpenSlider ] = useState(false)
  const [ openReservation, setOpenReservation ] = useState(false)
  const { dates, options } = useContext(SearchContext)
  const navigate = useNavigate()

  // Get the days between chosen dates
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24

  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2?.getTime() - date1?.getTime())
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY)
    return diffDays;
  }

  const days = dayDifference(dates[0]?.endDate, dates[0]?.startDate)

  console.log(days, dates, id, options)

  const { data, loading } = useFetch(`https://style-me-api.onrender.com/api/hotels/find/${id}`)
  const { user } = useContext(AuthContext)

  const handleOpenReservation = () => {
    if(user) {
      setOpenReservation(true)
    } else {
      navigate('/login')
    }
  }

  const handleOpenSlider = (i) => {
    setSlideNumber(i)
    setOpenSlider(true)
  }

  const handleMove = (direction) => {
    let newSlideNumber
    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1
    }
    setSlideNumber(newSlideNumber)
  }

  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading 
        ? ('Loading... Please wait!')
        : (
          <>
            <div className="hotelContainer">
              {openSlider && (
                <div className="slider">
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    className="close"
                    onClick={() => setOpenSlider(false)}
                  />
                  <FontAwesomeIcon
                    icon={faCircleArrowLeft}
                    className="arrow"
                    onClick={() => handleMove("l")}
                  />
                  <div className="sliderWrapper">
                    <img src={data.photos[slideNumber]} alt="" className="sliderImg" />
                  </div>
                  <FontAwesomeIcon
                    icon={faCircleArrowRight}
                    className="arrow"
                    onClick={() => handleMove("r")}
                  />
                </div>
              )}
              <div className="hotelWrapper">
                <h1 className="hotelTitle">{data.name}</h1>
                <div className="hotelAddress">
                  <FontAwesomeIcon icon={faLocationDot} />
                  <span>{data.address}</span>
                </div>
                <span className="hotelDistance">
                  Excellent location - {data.distance}m from center
                </span>
                <span className="hotelPriceHighlight">
                  Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi
                </span>
                <div className="hotelImages">
                  {data.photos?.map((photo, i) => (
                    <div className="hotelImgWrapper" key={i}>
                      <img
                        onClick={() => handleOpenSlider(i)}
                        src={photo}
                        alt=""
                        className="hotelImg"
                      />
                    </div>
                  ))}
                </div>
                <div className="hotelDetails">
                  <div className="hotelDetailsTexts">
                    <h1 className="hotelTitle">{data.title}</h1>
                    <p className="hotelDesc">
                      {data.description}
                    </p>
                  </div>
                  <div className="hotelDetailsPrice">
                    <h1>Perfect for a 9-night stay!</h1>
                    <span>
                      Located in the real heart of {data.city?.replace(/\b\w/g, l => l.toUpperCase())}, this property has an
                      excellent location score of {data.rating}!
                    </span>
                    {days 
                      ? (<h2><b>${days * data.cheapestPrice * options?.room}</b> ({days} nights)</h2>)
                      : (<h2>Starting <b>${data.cheapestPrice}</b> a night</h2>) 
                    }
                    <button onClick={handleOpenReservation}>
                      {user ? 'Reserve or Book Now!' : 'Log in to Reserve'}
                    </button>
                  </div>
                </div>
              </div>
              <MailList />
              <Footer />
            </div>
          </>
      )}
      {openReservation && 
        <Reservation setOpen={setOpenReservation} hotelId={id} />
      }
    </div>
  )
}

export default Hotel