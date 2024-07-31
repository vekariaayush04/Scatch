import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import img from '../../assets/bag.png'
import { toast, ToastContainer } from 'react-toastify';
const Item = () => {
    const { id } = useParams();
    const [itemData , setItemData] = useState({});
    const [quantity,setQuantity] = useState(1);
    async function getItem () {
        try {
            const product = await axios.get(`${import.meta.env.VITE_APP_BASE_URI}/product/${id}`,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                  }
            })

            const data = await product.data;

            setItemData(data)

        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        getItem()
    },[id])

    const handleIncrement = () => setQuantity(quantity + 1);
    const handleDecrement = () => setQuantity(quantity > 1 ? quantity - 1 : 1);
  
    const addToCart = async () => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_APP_BASE_URI}/cart/addToCart`, {
          productId: id,
          quantity,
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        console.log(response.data);
        toast(response.data.message)
        setQuantity(0)
      } catch (error) {
        console.error(error);
        toast(error.message)
      }
    };

    return (
        <div className='p-5 flex'>
      <div className='w-1/2'>
        <img src={img} alt={itemData.productname} className='' />
      </div>
      <div className='w-1/2 pl-5'>
        <h1 className='text-2xl font-bold'>{itemData.productname}</h1>
        <p className='text-xl'>{`Price: ₹${itemData.price}`}</p>
        <div className='flex items-center mt-4'>
          <button onClick={handleDecrement} className='bg-gray-200 p-2 rounded'>-</button>
          <span className='mx-2 text-lg'>{quantity}</span>
          <button onClick={handleIncrement} className='bg-gray-200 p-2 rounded'>+</button>
        </div>
        <button onClick={addToCart} className='mt-3 bg-blue-500 text-white p-2 rounded'>Add to Cart</button>
      </div>
      <ToastContainer/>
    </div>
      );      
      
}

export default Item