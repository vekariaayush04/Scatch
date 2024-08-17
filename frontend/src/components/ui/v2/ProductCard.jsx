import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ id, title, price, imgUrl }) => {
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure>
        <img src={imgUrl} alt="title" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{price}</p>
        <div className="card-actions justify-end">
          <Link to={`/product/${id}`}>
            <button className="btn btn-primary">Buy Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
