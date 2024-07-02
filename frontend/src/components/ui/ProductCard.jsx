import React, { useState } from 'react';
import bag from '../../assets/bag.jpg';
import { Link } from 'react-router-dom';

const ProductCard = ({ title, price, panelcolor, bgcolor, textcolor }) => {
  const [quantity, setQuantity] = useState(0);

  function plusQuantity() {
    setQuantity(quantity + 1);
  }

  function minusQuantity() {
    if (quantity !== 0) {
      setQuantity(quantity - 1);
    } else {
      setQuantity(0);
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
      </div>
    </>
  );
};

export default ProductCard;
