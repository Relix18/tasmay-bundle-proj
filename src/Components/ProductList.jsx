import React, { useState } from "react";
import "../styles/ProductList.scss";
import data from "../data";
import Pagination from "./Pagination";

const ProductList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const postPerPage = 10;
  const lastIndex = currentPage * postPerPage;
  const firstIndex = lastIndex - postPerPage;
  const currentPost = data.slice(firstIndex, lastIndex);

  return (
    <div>
      <div id="productList">
        {currentPost.map((item) => (
          <div className="card">
            <img src={item.thumbnail} alt="product" />
            <h5>{item.title}</h5>
            <h3>${item.price}</h3>
            <button>ADD TO CART</button>
          </div>
        ))}
      </div>
      <Pagination
        totalPosts={data.length}
        postPerPage={postPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default ProductList;
