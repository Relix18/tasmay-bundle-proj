import { useEffect, useState } from "react";
import "../styles/ProductList.scss";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Pagination from "./Pagination.jsx";
import {
  productAsync,
  productByBrandAsync,
  productByCategoryAsync,
  productStatus,
  selectAllProducts,
  selectProductById,
} from "../redux/product/productSlice";
import { addAsync, cartAsync, selectItems } from "../redux/cart/cartSlice";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const ProductList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 10;
  const lastIndex = currentPage * postPerPage;
  const firstIndex = lastIndex - postPerPage;
  const dispatch = useDispatch();
  const data = useSelector(selectAllProducts);
  const status = useSelector(productStatus);
  const items = useSelector(selectItems);

  useEffect(() => {
    dispatch(productByBrandAsync());
    dispatch(productByCategoryAsync());
  }, []);
  useEffect(() => {
    dispatch(productAsync());
    dispatch(cartAsync());
  }, []);

  const products = data.slice(firstIndex, lastIndex);

  const addToCartHandler = (item) => {
    if (items.findIndex((i) => i.id === item.id) < 0) {
      dispatch(addAsync(item));
      toast.success("Added To Cart");
    } else {
      toast.error("Item Already Added");
    }
  };

  return (
    <>
      {status === "loading" ? (
        <div>Loading...</div>
      ) : (
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
              id={item.id}
              rating={item.rating}
              category={item.category}
            />
          ))}
        </div>
      )}
      {status === "loading" ? (
        <></>
      ) : (
        <Pagination
          totalPosts={data.length}
          postPerPage={postPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      )}
    </>
  );
};

const ProductCard = ({
  id,
  rating,
  item,
  thumbnail,
  title,
  price,
  handler,
  category,
}) => {
  return (
    <div className="card">
      <Link to={`/product/${id}`} className="productLink">
        <img src={thumbnail} alt="product" />
        <h5>{title.length >= 16 ? title.substring(0, 17) + "..." : title}</h5>
        <h5 className="cat">{category}</h5>
        <h3>${price}</h3>
        <h4>
          <FaStar />
          {rating}
        </h4>
      </Link>
      <button onClick={() => handler(item)}>ADD TO CART</button>
    </div>
  );
};

export default ProductList;
