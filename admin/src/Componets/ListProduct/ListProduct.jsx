import React from 'react'
import './listproduct.css'
import { useState } from 'react'
import { useEffect } from 'react';
import remove_icon from '../../assets/cross_icon.png'

const ListProduct = () => {

    const [allproduct, setAllProducts] = useState([]);

    const fetchInfo = async ()=>{
      await fetch("http://localhost:4000/allproducts")
      .then((res)=>res.json()
      .then((data)=>{
        setAllProducts(data)
      }))
    }

    useEffect(()=>{
      fetchInfo()
    },[])



    const remove_product = async (id)=>{
      await fetch('http://localhost:4000/removeproduct', {
        method:'POST',
        headers:{
          Accept:'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify({id:id})
      })
      await fetchInfo();
    }

  return (
    <div className="listproduct">
      <h1>All Product list</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>

      <div className="listproduct-allproduct">
        <hr />
        {allproduct.map((product, index)=>{
          return<>
           <div key={index} className="listproduct-format-main listproduct-format">
            <img src={product.image}alt="" className="listproduct-product-icon" />
            <p>{product.name}</p>
            <p>${product.old_price}</p>
            <p>${product.new_price}</p>
            <p>{product.category}</p>
            <img onClick={()=>{remove_product(product.id)}} src={remove_icon} alt="" className="listproduct-removeicon" />
          </div>
          <hr />
          </>
        })}
      </div>
    </div>
  )
}

export default ListProduct