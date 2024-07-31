import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios'
import CartItem from './ui/CartItem';
import '../App.css';  // Make sure to import your custom styles

const Cart = () => {
  const [cartData,setCartData] = useState([])
  const [mrp,setMrp] = useState(0)
  const [discount,setDiscount] = useState(0)
  const [platformFee,setPlatformFee] = useState(0)
  const [shippingFee,setShippingFee] = useState(0)
  
  const getcartData = async () => {
    const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URI}/cart/cartItems`,{
      headers:{
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    setCartData(response.data)
  }

  useEffect(() =>{
    getcartData();
    
  },[])



  return (
    <>
      <div className="flex flex-col lg:flex-row">
        <div className="h-[34rem] w-full lg:w-3/5 overflow-y-scroll custom-scrollbar">
        {
            cartData.map((product, index) => (
              (<CartItem
                bgcolor={product.product.bgcolor}
                productname={product.product.productname}
                price={product.product.price}
                quantity={product.quantity}
                key={index}
              />)
            ))
          }
        </div>
        <div className="w-full lg:w-2/5">
          <div className="h-[17rem] bg-slate-400 m-6 rounded-xl">
            <div className="pt-3 pl-4 m-2 text-xl font-semibold">Price Breakdown</div>
            <div className="m-2 pl-7">
              <div className="m-1 font-semibold">Total MRP </div>
              <div className="m-1 font-semibold">Discount on MRP</div>
              <div className="m-1 font-semibold">Platform Fee</div>
              <div className="m-1 font-semibold">Shipping Fee</div>
            </div>
            <div className="m-2 pl-7 pt-7 font-semibold text-lg">Total Amount</div>
            <button className="ml-7 mt-1 h-8 px-3 rounded-xl bg-black text-white">Place Order</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
