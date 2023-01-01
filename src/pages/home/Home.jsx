import React from 'react'
import HotelsByCity from '../../components/hotelsByCity/HotelsByCity'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import MailList from '../../components/mailList/MailList'
import { Navbar } from '../../components/navbar/Navbar'
import HotelsByType from '../../components/hotelsByType/HotelsByType'
import HotelsFavorite from '../../components/hotelsFavorite/HotelsFavorite'
import './home.css'

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">
        <HotelsByCity />
        <h1 className="homeTitle">Browse by property type</h1>
        <HotelsByType />
        <h1 className="homeTitle">Most visited hotels</h1>
        <HotelsFavorite/>
        <MailList/>
        <Footer />
      </div>
    </div>
  )
}

export default Home