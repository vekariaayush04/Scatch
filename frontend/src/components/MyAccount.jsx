import React, { useEffect } from 'react'
import { userData } from '../atoms/UserAtom'
import { useRecoilState } from 'recoil'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MyAccount = () => {
    const [user,setUser] = useRecoilState(userData);
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove the token from localStorage
        navigate('/user/auth'); // Redirect to the login page
        window.location.reload();
      };

    // useEffect(async ()=>{
    //     try {
    //         const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URI}/product/`, {
    //           headers: {
    //             Authorization: `Bearer ${localStorage.getItem('token')}`,
    //           },
    //         });
    //         setProductdata(response.data.products);
    //         setUser(response.data.userData);
    //       } catch (error) {
    //         console.error('Error fetching product data:', error);
    //         navigate("/user/auth")
    //       }
    // },[])
  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Account</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Account Details</h2>
        <div className="text-lg mb-2">
          <strong>Username:</strong> {user.username}
        </div>
        <div className="text-lg mb-2">
          <strong>Email:</strong> {user.email}
        </div>
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Cart</h2>
        <ul className="list-disc pl-6">
          {user.cart.length > 0 ? (
            user.cart.map((item, index) => (
              <li key={index} className="text-lg mb-1">{item}</li>
            ))
          ) : (
            <li className="text-lg">No items in cart</li>
          )}
        </ul>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-2">Orders</h2>
        <ul className="list-disc pl-6">
          {user.orders.length > 0 ? (
            user.orders.map((order, index) => (
              <li key={index} className="text-lg mb-1">{order}</li>
            ))
          ) : (
            <li className="text-lg">No orders placed</li>
          )}
        </ul>
      </div>
    </div>
  </div>

);

}

export default MyAccount