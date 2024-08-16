import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import img from "../../assets/bag.png";
import pricefloor from "../../utils/PriceFloor";

const CartItem = ({ bgcolor, productname, quantity, price, id, onQuantityChange ,imageurl}) => {
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
    <div className={`h-[17rem] flex m-6 rounded-2xl border-2`} style={{ backgroundColor: bgcolor }}>
      <div className="rounded-l-2xl" style={{ backgroundColor: "blue" }}>
        <img src={imageurl} alt="Product" className="h-[13rem] my-8 mx-6" />
      </div>
      <div className="m-4">
        <div className="m-3 font-bold text-2xl mb-2">{productname}</div>
        <div className="m-3 text-lg text-gray-500 mb-2">Item Price: {price}</div>
        <div className="m-3 mt-16 text-lg text-gray-500">Qty: {quant}</div>
        <div className="m-3 text-lg text-gray-500 mb-2">Net Total: {pricefloor(price * quant)}</div>
        <div className="flex items-center mt-4">
          <button onClick={handleDecrement} className="bg-gray-200 p-2 rounded">-</button>
          <span className="mx-2 text-lg">{quant}</span>
          <button onClick={handleIncrement} className="bg-gray-200 p-2 rounded">+</button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
