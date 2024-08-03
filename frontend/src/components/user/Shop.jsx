import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Products from '../ui/Products';
import SideBar from '../ui/SideBar';


const Shop = () => {
  
  return (
    <>
      <div className='w-screen flex '>
        <SideBar/>
        <Products/>
      </div>
    </>
  );
};

export default Shop;
