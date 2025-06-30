import React from 'react'
import insta_icon from '../Assets/instagram_icon.png'
import pinterst_icon from '../Assets/pintester_icon.png'
import whatsapp_icon from '../Assets/whatsapp_icon.png'
import footer_logo from '../Assets/logo_big.png'
import './Footer.css'

export const Footer = () => {
  return (
    <div className="footer">
        <div className="footer_logo">
            <img src={footer_logo} alt="" />
            <p>SHOPPER</p>
        </div>
        <ul className="footer-links">
            <li>Company</li>
            <li>Products</li>
            <li>Offices</li>
            <li>About</li>
            <li>Contact</li>
        </ul>

        <div className="footer-social-icon">
            <div className="footer-icon-container">
                <img src={insta_icon} alt="" />
            </div>
            <div className="footer-icon-container">
                <img src={pinterst_icon} alt="" />
            </div>
            <div className="footer-icon-container">
                <img src={whatsapp_icon} alt="" />
            </div>
        </div>

        <div className="footer-copyrights">
            <hr/>
            <p>Copyrights @ 2025 - All reserved.</p>
        </div>
    </div>
  )
}
