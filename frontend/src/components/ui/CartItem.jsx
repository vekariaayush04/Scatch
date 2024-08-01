import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import img from "../../assets/bag.png";

const CartItem = ({ bgcolor, productname, quantity, price, id, onQuantityChange }) => {
  const [quant, setQuant] = useState(quantity);

  const handleIncrement = () => setQuant(quant + 1);
  const handleDecrement = () => setQuant(quant > 0 ? quant - 1 : 0);

  

  useEffect(() => {
    
    const updateCart = async () => {
      if(quant === 0){
        const response = await axios.post(
          `${import.meta.env.VITE_APP_BASE_URI}/cart/removeFromCart`,
          {
            productId: id,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        console.log(response.data);
        onQuantityChange();
      }
      else{
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_APP_BASE_URI}/cart/addToCart`,
            {
              productId: id,
              quantity: quant,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }
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
  }, [quant, id]);

  if(quant === 0){
    return(
      <>
      </>
    )
  }

  return (
    
    <div
      className={`h-[17rem] flex m-6 rounded-2xl border-2`}
      style={{ backgroundColor: bgcolor }}
    >
      <div className="rounded-l-2xl" style={{ backgroundColor: "blue" }}>
        <img src={img} alt="Product" className="h-[13rem] my-8 mx-6" />
      </div>
      <div className="m-4">
        <div className="m-3 font-bold text-2xl mb-2">{productname}</div>
        <div className="m-3 text-lg text-gray-500 mb-2">
          Item Price: {price}
        </div>
        <div className="m-3 mt-16 text-lg text-gray-500">
          Qty: {quant} {/* Use quant here */}
        </div>
        <div className="m-3 text-lg text-gray-500 mb-2">
          Net Total: {Math.floor(price * quant * 100) / 100} {/* Use quant here */}
        </div>
        <div className='flex items-center mt-4'>
          <button onClick={handleDecrement} className='bg-gray-200 p-2 rounded'>-</button>
          <span className='mx-2 text-lg'>{quant}</span> {/* Use quant here */}
          <button onClick={handleIncrement} className='bg-gray-200 p-2 rounded'>+</button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
