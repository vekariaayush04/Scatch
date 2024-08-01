import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CartItem from './ui/CartItem';
import '../App.css';

const Cart = () => {
  const [cartData, setCartData] = useState([]);
  const [mrp, setMrp] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [platformFee, setPlatformFee] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [reload, setReload] = useState(false); // New state to trigger reload

  const getcartData = async () => {
    const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URI}/cart/cartItems`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    setCartData(response.data);
  };

  const calculateTotals = (data) => {
    return data.reduce(
      (total, item) => total + item.product.price * item.quantity, 0
    );
  };

  const calculateDiscounts = (data) => {
    return data.reduce(
      (total, item) => total + item.product.discount * item.quantity, 0
    );
  };

  useEffect(() => {
    getcartData();
  }, [reload]); // Reload cart data when `reload` state changes

  useEffect(() => {
    if (cartData.length > 0) {
      const totalMRP = Math.floor(calculateTotals(cartData) * 100) / 100;
      const totalDiscount = Math.floor(calculateDiscounts(cartData) * 100) / 100;
      setMrp(totalMRP);
      setDiscount(totalDiscount);

      const calculatedPlatformFee = totalMRP > 5000 ? 0 : Math.floor(totalMRP * 0.01 * 100) / 100;
      setPlatformFee(calculatedPlatformFee);
      setShippingFee(0); // Adjust as needed
      setTotalAmount(Math.floor((totalMRP - totalDiscount + calculatedPlatformFee + shippingFee) * 100) / 100);
    }
  }, [cartData, mrp, discount]);

  const handleQuantityChange = () => {
    setReload(!reload); // Trigger a reload by toggling the `reload` state
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row">
        <div className="h-[34rem] w-full lg:w-3/5 overflow-y-scroll custom-scrollbar">
          {cartData.map((product, index) => (
            <CartItem
              bgcolor={product.product.bgcolor}
              productname={product.product.productname}
              price={product.product.price}
              quantity={product.quantity}
              key={index}
              id={product.product._id}
              onQuantityChange={handleQuantityChange} // Pass callback
            />
          ))}
        </div>
        <div className="w-full lg:w-2/5">
          <div className="h-[17rem] bg-slate-400 m-6 rounded-xl">
            <div className="pt-3 pl-4 m-2 text-xl font-semibold">Price Breakdown</div>
            <div className="m-2 pl-7">
              <div className="flex m-1 font-semibold justify-between mr-9">
                <div>Total MRP</div>
                <div>{mrp}</div>
              </div>
              <div className="flex m-1 font-semibold justify-between mr-9">
                <div>Discount on MRP</div>
                <div>{discount}</div>
              </div>
              <div className="flex m-1 font-semibold justify-between mr-9">
                <div>Platform Fee</div>
                <div>{platformFee}</div>
              </div>
              <div className="flex m-1 font-semibold justify-between mr-9">
                <div>Shipping Fee</div>
                <div>{shippingFee}</div>
              </div>
            </div>
            <div className="flex m-2 pl-7 pt-7 font-semibold text-lg justify-between mr-9">
              <div>Total Amount</div>
              <div>{totalAmount}</div>
            </div>
            <button className="ml-7 mt-1 h-8 px-3 rounded-xl bg-black text-white">Place Order</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
