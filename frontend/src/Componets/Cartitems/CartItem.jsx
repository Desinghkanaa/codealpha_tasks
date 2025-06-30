import React, { useContext } from 'react'
import remove_icon from '../Assets/cart_cross_icon.png'
import './CartItem.css'

import { ShopContext } from '../../Context/ShopContext'

export const CartItem = () => {
    const { getTotalAmount, all_product, cartItems, removeCart } = useContext(ShopContext)
    return (
        <div className="cartitem">
            <div className="cartitems-format-main">
                <p>Products</p>
                <p>Tittle</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>

            <hr />

            {all_product.map((e) => {
                if (cartItems[e.id] > 0) {
                    return (
                        <div key={e.id}>
                            <div className="cartitems-format cartitems-format-main">
                                <img
                                    src={e.image}
                                    alt={e.name}
                                    className="cartitems-product-icon"
                                />
                                <p>{e.name}</p>
                                <p>${e.new_price}</p>
                                <button className="cartitems-quantity">{cartItems[e.id]}</button>
                                <p>${e.new_price * cartItems[e.id]}</p>
                                <img className='cartitem-remove-icon'
                                    src={remove_icon}
                                    onClick={() => removeCart(e.id)}
                                    alt="Remove Item"
                                />
                            </div>
                            <hr />
                        </div>
                    );
                }
                return null;
            })}

            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>Cart Totals</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p>${getTotalAmount()}</p>
                        </div>
                        <hr />

                        <div className="cartitems-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />

                        <div className="cartitems-total-item">
                            <h3>Total</h3>
                            <h3>${getTotalAmount()}</h3>
                        </div>

                    </div>
                    <button>PROCEED TO CHECKOUT</button>

                    <div className="cartitems-promocode">
                        <p>If you have a promo code, Enter it here </p>
                        <div className="cartitems-promobox">
                            <input type="text" placeholder='Your Promocode' />
                            <button>Submit</button>
                        </div>
                    </div>

                </div>

            </div>


        </div>


    )
}

