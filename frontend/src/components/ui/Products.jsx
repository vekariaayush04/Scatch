import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userData } from '../../atoms/UserAtom';
import ProductCard from './ProductCard';

const Products = () => {
  const navigate = useNavigate();
  const [productdata, setProductdata] = useState([]);
  const user = useRecoilValue(userData)

  
  useEffect(() => {
    if(user === null){
    navigate('/auth')
  }
    if(user.isAdmin){
      navigate('/admin')
    }                                     
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URI}/user/product/allproducts`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setProductdata(response.data.products);
        localStorage.setItem('userData', JSON.stringify(response.data.userData)); // Save user data to local storage
        console.log(response.data.userData);
      } catch (error) {
        console.error('Error fetching product data:', error);
        navigate("/auth");
      }
    };
    fetchData();
  }, [navigate]); // dependency array to avoid multiple calls

  return (
    <div className='flex-1 h-[35rem] overflow-y-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {productdata.map((product, index) => (
        <ProductCard
          id={product._id}
          key={index}
          title={product.productname}
          price={product.price}
          panelcolor={product.panelcolor}
          bgcolor={product.bgcolor}
          textcolor={product.textcolor}
        />
      ))}
    </div>
  );
};

export default Products;
