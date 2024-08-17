import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { userData } from "../../atoms/UserAtom";
import { useRecoilState } from "recoil";
const Item = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [itemData, setItemData] = useState({});
  const [quantity, setQuantity] = useState(1);
  const token = localStorage.getItem("token");
  const [user, setUser] = useRecoilState(userData(token));

  if (user === null) {
    navigate("/auth");
  }

  async function getItem() {
    try {
      const product = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URI}/user/product/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await product.data;

      setItemData(data);
    } catch (error) {
      console.error(error);
      navigate("/");
    }
  }
  useEffect(() => {
    if (user.isAdmin) {
      navigate("/admin");
    }
    getItem();
  }, [id]);

  const handleIncrement = () => setQuantity(quantity + 1);
  const handleDecrement = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  const addToCart = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URI}/user/cart/addToCart`,
        {
          productId: id,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      toast(response.data.message);
      setQuantity(quantity);
    } catch (error) {
      console.error(error);
      toast(error.message);
    }
  };

  return (
    <div className="w-full h-auto flex justify-center items-center bg-gray-100 p-8">
      <div className="w-[80%] max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="col-span-1 flex items-center justify-center bg-gray-50 p-4">
          <img
            src={itemData.imageurl}
            alt={itemData.productname}
            className="max-h-96 w-full object-contain"
          />
        </div>
        <div className="col-span-1 p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              {itemData.productname}
            </h1>
            <p className="text-2xl text-gray-600 mt-2">{`Price: ₹${itemData.price}`}</p>
            <p className="text-lg text-gray-500 mt-4">{itemData.description}</p>
            <p className="text-sm text-gray-500 mt-2">{`Seller: ${itemData.seller}`}</p>
            <p
              className={`text-lg mt-4 font-semibold ${
                itemData.stock > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {itemData.stock > 0
                ? `${itemData.stock} items left in stock`
                : "Out of stock"}
            </p>
          </div>
          <div className="flex items-center mt-6 space-x-4">
            <button
              onClick={handleDecrement}
              className="bg-gray-300 p-3 rounded-full text-xl font-semibold text-gray-800 transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              -
            </button>
            <span className="text-2xl font-medium text-gray-700">
              {quantity}
            </span>
            <button
              onClick={handleIncrement}
              className="bg-gray-300 p-3 rounded-full text-xl font-semibold text-gray-800 transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              +
            </button>
          </div>
          <button
            onClick={addToCart}
            className="mt-6 bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 px-6 rounded-lg shadow-md hover:from-blue-700 hover:to-blue-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Item;
