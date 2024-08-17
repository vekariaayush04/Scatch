import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import img from "../../assets/bag.png";
import pricefloor from "../../utils/PriceFloor";

const CartItem = ({ productname, quantity, price, id, onQuantityChange ,imageurl}) => {
  const [quant, setQuant] = useState(quantity);

  const handleIncrement = () => setQuant(quant + 1);
  const handleDecrement = () => setQuant(quant > 1 ? quant - 1 : 0);

  useEffect(() => {
    const updateCart = async () => {
      if (quant === 0) {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_APP_BASE_URI}/user/cart/removeFromCart`,
            { productId: id },
            { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
          );
          console.log(response.data);
          toast(response.data.message);
          onQuantityChange(); // Notify parent component about the change
        } catch (error) {
          console.error(error);
          toast(error.message);
        }
      } else {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_APP_BASE_URI}/user/cart/addToCart`,
            { productId: id, quantity: quant },
            { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
          );
          console.log(response.data);
          toast(response.data.message);
          onQuantityChange(); // Notify parent component about the change
        } catch (error) {
          console.error(error);
          toast(error.message);
        }
      }
    };

    updateCart();
  }, [quant]);

  if (quant === 0) {
    return null; // Return null to remove the component from the DOM
  }

  return (
    <div className="h-[18rem] m-6 rounded-2xl border-2 shadow-lg grid grid-cols-3 overflow-hidden transform transition-transform ">
  <div className="col-span-1 flex items-center justify-center bg-white rounded-l-2xl">
    <img src={imageurl} alt="Product" className="h-[14rem] w-auto object-contain p-4" />
  </div>
  <div className="m-4 col-span-1 flex flex-col justify-between">
    <div className="font-bold text-3xl text-gray-800 mb-2">{productname}</div>
    <div className="text-xl text-gray-500 mb-2">{`Item Price: ₹${price}`}</div>
    <div className="text-xl text-gray-500 mt-4">{`Qty: ${quant}`}</div>
    <div className="text-xl text-gray-800 font-semibold">{`Net Total: ₹${pricefloor(price * quant)}`}</div>
  </div>
  <div className="col-span-1 flex flex-col justify-center items-center">
    <div className="flex items-center space-x-4">
      <button 
        onClick={handleDecrement} 
        className="bg-gray-200 p-3 rounded-full text-xl font-bold text-gray-700 hover:bg-gray-300 transition"
      >
        -
      </button>
      <span className="text-2xl font-semibold text-gray-800">{quant}</span>
      <button 
        onClick={handleIncrement} 
        className="bg-gray-200 p-3 rounded-full text-xl font-bold text-gray-700 hover:bg-gray-300 transition"
      >
        +
      </button>
    </div>
  </div>
</div>

  );
};

export default CartItem;
