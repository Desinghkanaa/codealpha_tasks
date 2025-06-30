import React from 'react'
import './Hero.css'
import hero_hand from '../Assets/hand_icon.png'
import left_arrow from '../Assets/arrow.png'
import hero_image from '../Assets/hero_image.png'

export const Hero = () => {
  return (
    <div className='hero'>
        <div className="hero-left">
            <h2>NEW ARRIVALS ONLY</h2>
            <div className="hero-hand-icon">
                <p>new</p>
                <img src={hero_hand} alt="" />
            </div>
            <p>collection</p>
            <p>for everyone</p>
            <div className="hero-latest-btn">
                <div>Latest Collection</div>
                <img src={left_arrow} alt="" />
            </div>
        </div>


        <div className="hero-right">
            <img src={hero_image} alt="" />
        </div>
    </div>
  )
}
