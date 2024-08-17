import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { userData } from '../atoms/UserAtom';
import { useNavigate } from 'react-router-dom';

const Loader = () => (
  <div className="flex justify-center items-center h-full">
    <div className="border-t-4 border-blue-500 border-solid w-16 h-16 border-radius-full animate-spin"></div>
  </div>
);

const MyAccount = () => {
  const token = localStorage.getItem("token")
  const [user, setUser] = useRecoilState(userData(token));
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  console.log(user);
  
  useEffect(() => {
    if (user.username === "") {
      navigate('/auth');
    } else if (user.isAdmin) {
      navigate('/admin');
    }
    setLoading(false); // Set loading to false after processing
  }, [user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    navigate('/auth');
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto p-6 bg-gray-100" >
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
            <strong>Username:</strong> {user ? user.username : 'Loading...'}
          </div>
          <div className="text-lg mb-2">
            <strong>Email:</strong> {user ? user.email : 'Loading...'}
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Cart</h2>
          {/* <ul className="list-disc pl-6">
            {user && user.cart && user.cart.length > 0 ? (
              user.cart.map((item, index) => (
                <li key={index} className="text-lg mb-1">{item}</li>
              ))
            ) : (
              <li className="text-lg">No items in cart</li>
            )}
          </ul> */}
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-2">Orders</h2>
          {/* <ul className="list-disc pl-6">
            {user && user.orders && user.orders.length > 0 ? (
              user.orders.map((order, index) => (
                <li key={index} className="text-lg mb-1">{order}</li>
              ))
            ) : (
              <li className="text-lg">No orders placed</li>
            )}
          </ul> */}
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
