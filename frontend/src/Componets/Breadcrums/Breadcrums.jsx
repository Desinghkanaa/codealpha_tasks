import React from 'react'
import arrow_img from '../Assets/breadcrum_arrow.png'
import './Breadcrums.css'

export const Breadcrums = (props) => {
    const {product} = props;
  return (
    <div className="breadcrum">
        
        HOME <img src={arrow_img}  alt="" />SHOP <img src={arrow_img}  alt="" />
        {product.category} <img src={arrow_img} alt="" />{product.name} 
        
    </div>
  )
}
