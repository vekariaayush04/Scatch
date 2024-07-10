import React, { useState } from 'react';
import bag from '../../assets/bag.jpg';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProductCard = ({id , title, price, panelcolor, bgcolor, textcolor }) => {
  const [quantity, setQuantity] = useState(0);

  function plusQuantity() {
    setQuantity(quantity + 1);
  }

  function minusQuantity() {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    } else {
      setQuantity(0);
    }
  }

  
  async function addToCart() {
    // Implement functionality to add product to cart here
    console.log(`Added ${quantity} ${title} to cart`);
    // You can add further logic here to send data to backend or manage state
    try {
      const res = await axios.post(`${import.meta.env.VITE_APP_BASE_URI}/cart/addToCart`,{
        productId:id,
        quantity,
      },{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      })
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className='h-56 w-48 bg-white mt-5 basis-1/4 flex-col'>
        <div style={{ backgroundColor: bgcolor }} className='h-40 w-48 flex justify-center items-center'>
          <img src={bag} alt="" className='h-32 w-32 object-contain'/>
        </div>
        <div style={{ backgroundColor: panelcolor }} className='h-16 w-48 flex justify-between items-center'>
          <div>
            <h2 className='px-1 ml-2 pt-1'>{title}</h2>
            <h3 className='px-1 ml-2'>{`₹${price}`}</h3>
          </div>
          <div>{quantity}</div>
          <div>
            <div className='mt-1 mr-3 h-6 w-6 bg-white text-center rounded-full'>
              <Link className='font-bold text-md' onClick={plusQuantity}>+</Link>
            </div>
            <div className='mt-2 mr-3 h-6 w-6 bg-white text-center rounded-full'>
              <Link className='font-bold text-md' onClick={minusQuantity}>-</Link>
            </div>
          </div>
        </div>
        <div className='w-full flex justify-center'>
          <button onClick={addToCart} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2'>
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
