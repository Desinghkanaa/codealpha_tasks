import React, { useContext } from 'react';
import './ProductDisplay.css';
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png';
import { ShopContext } from '../../Context/ShopContext';

export const ProductDisplay = ({ product }) => {

  const {addCart} = useContext(ShopContext)

  if (!product) {
    return <div>Product details not available</div>;
  }
  
  
  const { name, images = [], image } = product;


  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          {images.map((img, index) => (
            <img src={img} alt={`Thumbnail ${index + 1}`} key={index} />
          ))}
          <img src={image} alt={name}/>
          <img src={image} alt={name}/>
          <img src={image} alt={name}/>
          <img src={image} alt={name}/>
        </div>
        <div c className="productdisplay-main-img">
          <img src={image} alt={name} />
        </div>
      </div>

      <div className="productdisplay-right">
        <h1>{name}</h1>
        <div className="productdisplay-right-star">
          <img src={star_icon} alt="Star 1" />
          <img src={star_icon} alt="Star 2" />
          <img src={star_icon} alt="Star 3" />
          <img src={star_icon} alt="Star 4" />
          <img src={star_dull_icon} alt="Star 5" />
          <p>(132)</p>
        </div>
        <div className="productdisplay-right-prices">
            <div className="productdisplay-price-old">
                ${product.old_price}
            </div>
            <div className="productdisplay-price-new">
                ${product.new_price}
            </div>
        </div>
        <div className="productdisplay-right-descripstion">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit illum expedita nam vero ex,
             aspernatur eveniet reiciendis! Sint veritatis pariatur molestiae? Velit repellat quod odio eos nobis! Suscipit, eveniet ipsam?
        </div>
        <div className="productdisplay-right-size">
            <h1>Select Size</h1>
            <div className="productdisplay-right-sizes">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
            </div>
        </div>
        <button onClick={()=>{addCart(product.id)}}>ADD TO CART</button>
        <p className="productdisplay-right-categorey">
            <span>Category:</span>
            Women, T-Shirt, Crop-Top
        </p>

        <p className="productdisplay-right-categorey">
            <span>Tag:</span>
            Modern, Latest
        </p>
      </div>
    </div>
  );
};
