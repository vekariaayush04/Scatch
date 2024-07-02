import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ui/ProductCard';
import axios from 'axios';


const Shop = () => {
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
      }
    };
    fetchData();
  }, []); // dependency array to avoid multiple calls

  return (
    <>
      <div className='w-screen flex'>
        <div className='w-60' style={{ height: '35rem' }}>
          <div className='flex m-6'>
            <h1 className='font-semibold font-serif text-md'>Sort By :</h1>
            <select name="Sort By" id="1" className=''>
              <option value="">Popular</option>
              <option value="">New</option>
            </select>
          </div>
          <div className='mt-8 mb-24 mx-6'>
            <Link to="/new-collection">New Collection</Link>
            <br />
            <Link to="/all-products">All Products</Link>
            <br />
            <Link to="/discounted-products">Discounted Products</Link>
          </div>
          <div className='mx-6 mt-64'>
            <h2>Filter By:</h2>
            <Link to="/availability">Availability</Link>
            <br />
            <Link to="/discount">Discount</Link>
          </div>
        </div>
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
      </div>
    </>
  );
};

export default Shop;
