import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CartItem from '../ui/CartItem';
import '../../App.css';
import pricefloor from '../../utils/PriceFloor';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userData } from '../../atoms/UserAtom';

const Cart = () => {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userData);
  const [cartData, setCartData] = useState([]);
  const [mrp, setMrp] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [platformFee, setPlatformFee] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [reload, setReload] = useState(false);

  if(user === null){
    navigate('/auth')
  }

  const getCartData = async () => {
    
    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URI}/user/cart/cartItems`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setCartData(response.data);
    } catch (error) {
      console.error(error);
      toast(error.message);
      navigate("/")
    }
  };

  const calculateTotals = (data) => data.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const calculateDiscounts = (data) => data.reduce((total, item) => total + item.product.discount * item.quantity, 0);

  useEffect(() => {
    if(user.isAdmin){
      navigate('/admin')
    } 
    getCartData();
  }, [reload]);

  useEffect(() => {
    if (cartData.length > 0) {
      const totalMRP = pricefloor(calculateTotals(cartData));
      const totalDiscount = pricefloor(calculateDiscounts(cartData));
      setMrp(totalMRP);
      setDiscount(totalDiscount);

      const calculatedPlatformFee = totalMRP > 5000 ? 0 : pricefloor(totalMRP * 0.01);
      setPlatformFee(calculatedPlatformFee);
      setShippingFee(0);
      setTotalAmount(pricefloor(totalMRP - totalDiscount + calculatedPlatformFee + shippingFee));
    } else {
      // Reset totals if cartData is empty
      setMrp(0);
      setDiscount(0);
      setPlatformFee(0);
      setShippingFee(0);
      setTotalAmount(0);
    }
  }, [cartData]);

  const handleQuantityChange = () => {
    setReload(!reload);
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="h-[34rem] w-full lg:w-3/5 overflow-y-scroll custom-scrollbar">
        {cartData.length > 0 ? (
          cartData.map((product, index) => (
            <CartItem
              bgcolor={product.product.bgcolor}
              productname={product.product.productname}
              price={product.product.price}
              quantity={product.quantity}
              key={product.product._id} // Ensure each item has a unique key
              id={product.product._id}
              onQuantityChange={handleQuantityChange}
            />
          ))
        ) : (
          <div className="m-6 text-center text-xl">Your cart is empty</div>
        )}
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
  );
};

export default Cart;
