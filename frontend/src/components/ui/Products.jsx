import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard'
import { useNavigate } from 'react-router-dom';



const Products = () => {
    const navigate = useNavigate();
    const [productdata, setProductdata] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URI}/product/allproducts`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setProductdata(response.data);
      } catch (error) {
        console.error('Error fetching product data:', error);
        navigate("/user/auth")
      }
    };
    fetchData();
  }, []); // dependency array to avoid multiple calls
  return (
    <>
        <div className='flex-1 h-[35rem] overflow-y-auto flex flex-wrap justify-evenly'>
          {productdata.map((product, index) => (
            <ProductCard
              key={index}
              title={product.productname}
              price={product.price}
              panelcolor={product.panelcolor}
              bgcolor={product.bgcolor}
              textcolor={product.textcolor}
            />
          ))}
        </div>
    </>
  )
}

export default Products