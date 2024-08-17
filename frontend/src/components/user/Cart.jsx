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
  const token = localStorage.getItem("token");
  const [user, setUser] = useRecoilState(userData(token));
  const [cartData, setCartData] = useState([]);
  const [mrp, setMrp] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [platformFee, setPlatformFee] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [reload, setReload] = useState(false);

  // Check if the user is an admin and navigate accordingly
  useEffect(() => {
    if (user?.isAdmin) {
      navigate('/admin');
    }
  }, [user, navigate]);
  const calculateTotals = (data) => data.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const calculateDiscounts = (data) => data.reduce((total, item) => total + item.product.discount * item.quantity, 0);
  // Fetch cart data
  useEffect(() => {
    const getCartData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URI}/user/cart/cartItems`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartData(response.data);
      } catch (error) {
        console.error(error);
        toast(error.message);
        navigate("/");
      }
    };

    getCartData();
  }, [reload]); // Minimal dependencies to avoid unnecessary re-fetches

  // Calculate totals when cart data changes
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
              productname={product.product.productname}
              price={product.product.price}
              quantity={product.quantity}
              key={product.product._id} // Ensure each item has a unique key
              id={product.product._id}
              imageurl={product.product.imageurl}
              onQuantityChange={handleQuantityChange}
            />
          ))
        ) : (
          <div className="m-6 text-center text-xl">Your cart is empty</div>
        )}
      </div>
      <div className="w-full lg:w-2/5">
  <div className="h-[24rem] bg-gradient-to-br from-gray-50 to-gray-100 m-6 rounded-xl shadow-lg p-6">
    <div className="text-2xl font-bold text-gray-800 mb-4">Price Breakdown</div>
    <div className="space-y-3">
      <div className="flex justify-between text-lg text-gray-700">
        <div>Total MRP</div>
        <div className="font-medium">{`₹${mrp}`}</div>
      </div>
      <div className="flex justify-between text-lg text-gray-700">
        <div>Discount on MRP</div>
        <div className="font-medium text-green-600">{`-₹${discount}`}</div>
      </div>
      <div className="flex justify-between text-lg text-gray-700">
        <div>Platform Fee</div>
        <div className="font-medium">{`₹${platformFee}`}</div>
      </div>
      <div className="flex justify-between text-lg text-gray-700">
        <div>Shipping Fee</div>
        <div className="font-medium">{`₹${shippingFee}`}</div>
      </div>
    </div>
    <div className="flex justify-between text-xl font-bold text-gray-800 mt-6">
      <div>Total Amount</div>
      <div>{`₹${totalAmount}`}</div>
    </div>
    <button className="w-full mt-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-lg font-semibold rounded-xl shadow-md hover:from-blue-700 hover:to-blue-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300">
      Place Order
    </button>
  </div>
</div>

    </div>
  );
};

export default Cart;
