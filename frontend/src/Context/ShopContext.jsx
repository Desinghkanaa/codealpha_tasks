import React, { createContext, useEffect, useState } from "react";
// import all_product from '../Componets/Assets/all_product'

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    // if(!Array.isArray(all_product)){
    //     console.error("Error: 'all_product' is not an array or is undefined.")
    // }

    let cart = {};
    for (let index = 0; index < 300 + 1; index++) {
        cart[index] = 0
        //  console.log("Generated default cart:", cart);
    }
    return cart;
    // console.log(cart);
}



const ShopContextProvider = (props) => {

    const [all_product, setAll_Product] = useState([]);
    const [cartItems, setCartItem] = useState(getDefaultCart())

    useEffect(() => {
        fetch('http://localhost:4000/allproducts')
            .then((response) => response.json())
            .then((data) => setAll_Product(data))

        if (localStorage.getItem('auth-token')) {
            fetch("http://localhost:4000/getcart", {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:'',
            }).then((response)=>response.json())
            .then((data)=>setCartItem(data));
        }

    }, [])


    const addCart = (ItemId) => {
        setCartItem((prev) => ({ ...prev, [ItemId]: prev[ItemId] + 1 }))
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/addtocart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 'ItemId': ItemId })
            })
                .then((response) => response.json())
                .then((data) => console.log(data))
        }
    }



    const removeCart = (ItemId) => {
        setCartItem((prev) => ({ ...prev, [ItemId]: prev[ItemId] - 1 }))
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/removeCart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 'ItemId': ItemId })
            })
                .then((response) => response.json())
                .then((data) => console.log(data))
        }
    }



    const getTotalAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product => product.id === Number(item)))
                totalAmount += itemInfo.new_price * cartItems[item];
            }
        }
        return totalAmount;
    }

    // console.log(getTotalAmount());


    function getTotalCartItems() {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item]; // Add instead of assign
            }
        }
        return totalItem;
    }






    const contextValue = { getTotalCartItems, all_product, cartItems, addCart, removeCart, getTotalAmount };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )

}

export default ShopContextProvider;
