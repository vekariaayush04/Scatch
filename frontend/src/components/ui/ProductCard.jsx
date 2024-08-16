import React, { useState } from 'react';
import bag from '../../assets/bag.png';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProductCard = ({id , title, price, panelcolor, bgcolor, textcolor ,imgUrl}) => {

  return (
    <>

      <Link className='h-56 w-48 bg-white mt-5 flex-col ml-5' to={`/product/${id}`} >

        <div style={{ backgroundColor: bgcolor }} className='h-40 w-48 flex justify-center items-center rounded-t-xl'>
          <img src={imgUrl} alt="" className='h-40 w-40object-contain'/>
        </div>

        <div style={{ backgroundColor: panelcolor }} className='h-16 w-48 flex justify-between items-center rounded-b-xl'>
          <div>
            <h2 className='px-1 ml-2 pt-1'>{title}</h2>
            <h3 className='px-1 ml-2'>{`₹${price}`}</h3>
          </div>
        </div>

      </Link>
    </>
  );
};

export default ProductCard;
