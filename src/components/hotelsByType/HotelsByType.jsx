import React from 'react'
import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch'
import './hotelsByType.css'

const HotelsByType = () => {
  const { data, loading, error } = useFetch('https://style-me-api.onrender.com/api/hotels/countByType')
  
  const images = [
    "https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=",
    "https://q-xx.bstatic.com/xdata/images/xphoto/300x240/45450074.jpeg?k=7039b03a94f3b99262c4b3054b0edcbbb91e9dade85b6efc880d45288a06c126&o=",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg",
  ]

  return (
    <div className="pList">
      {loading 
      ? ('Loading... Please wait!')
      : (
        <>
          {data &&
            images.map((img,i) => (
              <Link to='/hotels' style={{ textDecoration: 'none', color: 'black'}} key={i}>
                  <div className="pListItem" >
                  <img
                    src={img}
                    alt=""
                    className="pListImg"
                  />
                  <div className="pListTitles">
                    <h1>{data[i]?.type}</h1>
                    <h2>{data[i]?.count} {data[i]?.type}</h2>
                  </div>
                </div>
              </Link>
            ))}
        </>
        )
      }
    </div>
  );
};

export default HotelsByType