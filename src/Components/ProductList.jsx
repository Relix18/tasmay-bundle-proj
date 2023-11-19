import React, { useState } from "react";
import "../styles/ProductList.scss";
import data from "../data";
import Pagination from "./Pagination.jsx";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const ProductList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 10;
  const lastIndex = currentPage * postPerPage;
  const firstIndex = lastIndex - postPerPage;
  const products = data.slice(firstIndex, lastIndex);
  const dispatch = useDispatch();

  const addToCartHandler = (options) => {
    dispatch({ type: "addToCart", payload: options });
    dispatch({ type: "calculatePrice" });
    toast.success("Added To Cart");
  };

  return (
    <>
      <div id="productList">
        {products.map((item) => (
          <ProductCard
            key={item.id}
            brand={item.brand}
            thumbnail={item.thumbnail}
            title={item.title}
            price={item.price}
            handler={addToCartHandler}
            id={item.id}
          />
        ))}
      </div>
      <Pagination
        totalPosts={data.length}
        postPerPage={postPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </>
  );
};

const ProductCard = ({
  id,
  brand,
  thumbnail,
  title,
  price,

  handler,
}) => (
  <div className="card">
    <img src={thumbnail} alt="product" />
    <h5>{title}</h5>
    <h3>${price}</h3>
    <button
      onClick={() =>
        handler({
          id,
          brand,
          thumbnail,
          title,

          price,
          quantity: 1,
        })
      }
    >
      ADD TO CART
    </button>
  </div>
);

export default ProductList;
