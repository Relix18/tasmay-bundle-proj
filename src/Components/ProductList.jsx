import React, { useEffect, useState } from "react";
import "../styles/ProductList.scss";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Pagination from "./Pagination.jsx";
import { productAsync } from "../redux/product/productSlice";
import { addAsync, cartAsync } from "../redux/cart/cartSlice";

const ProductList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 10;
  const lastIndex = currentPage * postPerPage;
  const firstIndex = lastIndex - postPerPage;
  const dispatch = useDispatch();
  const data = useSelector((state) => state.product.products);

  useEffect(() => {
    dispatch(productAsync());
    dispatch(cartAsync());
  }, []);

  const products = data.slice(firstIndex, lastIndex);

  const addToCartHandler = (item) => {
    dispatch(addAsync(item));
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
            item={item}
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
  item,
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
    <button onClick={() => handler(item)}>ADD TO CART</button>
  </div>
);

export default ProductList;
