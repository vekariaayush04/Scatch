import React, { useState } from "react";
import bag from "../../assets/bag.png";
import { Link } from "react-router-dom";
import axios from "axios";

const ProductCard = ({ id, title, price, imgUrl }) => {
  return (
    <>
      <div className="h-60 w-52 mt-5 ml-5 flex flex-col rounded-t-xl rounded-b-2xl shadow-lg transform transition-transform hover:scale-105">
        <Link to={`/product/${id}`} className="block h-full">
          <div className="w-full flex justify-center bg-base-100 items-center rounded-t-xl shadow-inner">
            <img
              src={imgUrl}
              alt={title}
              className="h-40 w-40 object-contain"
            />
          </div>
          <div className="h-20 w-full flex justify-between items-center rounded-b-2xl bg-base-200 p-3">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
              <h3 className="text-xl font-bold text-gray-600">{`₹${price}`}</h3>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default ProductCard;
