import React from "react";
import "../styles/ProductList.scss";
import data from "../data.js";

const ProductList = () => {
  return (
    <div id="productList">
      {data.map((item) => (
        <div className="card">
          <img src={item.thumbnail} alt="product" />
          <h5>{item.title}</h5>
          <h3>₹{item.price}</h3>
          <button>ADD TO CART</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
