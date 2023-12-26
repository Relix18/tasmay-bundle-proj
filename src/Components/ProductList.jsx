import { useEffect, useState } from "react";
import "../styles/ProductList.scss";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Pagination from "./Pagination.jsx";
import {
  productAsync,
  productsBrandAsync,
  productsCategoryAsync,
  productStatus,
  selectAllProducts,
} from "../redux/product/productSlice";
import {
  addAsync,
  itemsByUserIdAsync,
  selectItems,
} from "../redux/cart/cartSlice";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { Rings } from "react-loader-spinner";
import { fetchLoggedInUserAsync } from "../redux/user/userSlice.js";
import { selectLoggedInUser } from "../redux/auth/authSlice.js";

const ProductList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 10;
  const lastIndex = currentPage * postPerPage;
  const firstIndex = lastIndex - postPerPage;
  const dispatch = useDispatch();
  const data = useSelector(selectAllProducts);
  const status = useSelector(productStatus);
  const items = useSelector(selectItems);
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    dispatch(productsBrandAsync());
    dispatch(productsCategoryAsync());
  }, [dispatch]);
  useEffect(() => {
    dispatch(productAsync());
    if (user) {
      dispatch(itemsByUserIdAsync(user.id));
      dispatch(fetchLoggedInUserAsync(user.id));
    }
  }, [dispatch, user]);

  const products = data.slice(firstIndex, lastIndex);

  const addToCartHandler = (item) => {
    if (user) {
      if (items.findIndex((i) => i.productId === item.id) < 0) {
        const newItem = { ...item, productId: item.id, qty: 1, user: user.id };
        delete newItem["id"];
        dispatch(addAsync(newItem));
        toast.success("Added To Cart");
      } else {
        toast.error("Item Already Added");
      }
    } else {
      toast.error("Please Login First");
    }
  };

  return (
    <>
      {status === "loading" ? (
        <div id="loader">
          <Rings
            height="180"
            width="180"
            color="orange"
            radius="6"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="rings-loading"
          />
        </div>
      ) : (
        <div id="productList">
          {products.length === 0 && <p className="noMatch">No Match Found</p>}
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
