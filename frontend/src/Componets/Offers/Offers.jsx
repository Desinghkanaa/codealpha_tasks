import React from 'react'
import './Offers.css'
import offer_page_image from '../Assets/exclusive_image.png'

export const Offers = () => {
  return (
   <div className="offers">
        <div className="offers-left">
            <h1>Exclusive</h1>
            <h1>Offers for you</h1>
            <p>ONLY ON THE BEST SELLER PRODUCT</p>
            <button>Check Now</button>
            
        </div>

        <div className="offers-right">
            <img src={offer_page_image} alt="" />
        </div>

   </div>
  )
}
