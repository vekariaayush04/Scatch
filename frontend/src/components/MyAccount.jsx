import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userData } from '../atoms/UserAtom';
import { useNavigate } from 'react-router-dom';

const MyAccount = () => {
  const [user, setUser] = useRecoilState(userData);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUserData = localStorage.getItem('userData');
    if (savedUserData) {
      setUser(JSON.parse(savedUserData)); // Load user data from local storage
    }
  }, [setUser]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData'); // Remove user data from local storage
    navigate('/auth');
    window.location.reload();
  };


  return (
    <div className="container mx-auto p-6 bg-gray-100">
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
            {user.cart && user.cart.length > 0 ? (
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
            {user.orders && user.orders.length > 0 ? (
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
};

export default MyAccount;
