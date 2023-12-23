import { Carousel } from "react-responsive-carousel";
import "../styles/ProductDetails.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  productByIdAsync,
  selectProductById,
} from "../redux/product/productSlice";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { zipCodes } from "./utils/common.jsx";
import {
  addAsync,
  itemsByUserIdAsync,
  selectItems,
} from "../redux/cart/cartSlice";
import toast from "react-hot-toast";
import { selectLoggedInUser } from "../redux/auth/authSlice.js";

const ProductDetails = () => {
  const [zipSearch, setZipSearch] = useState("");
  const [zipRes, setZipRes] = useState("");
  const product = useSelector(selectProductById);
  const params = useParams();
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    dispatch(productByIdAsync(params.id));
    {
      user && dispatch(itemsByUserIdAsync(user.id));
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [dispatch, params.id, user]);

  const p = document.querySelector(".pin-res");

  zipRes === "Available" ? p.classList.add("green") : "";
  zipRes === "Not Available" ? p.classList.remove("green") : "";

  const zipCheckHandler = () => {
    if (zipCodes.includes(zipSearch)) {
      setZipRes("Available");
    } else {
      setZipRes("Not Available");
    }
  };

  const addToCartHandler = (product) => {
    if (user) {
      if (items.findIndex((i) => i.productId === product.id) < 0) {
        const newItem = {
          ...product,
          productId: product.id,
          qty: 1,
          user: user.id,
        };
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
    <div id="ProductDetails">
      {product && (
        <>
          <div className="imgSlide">
            <Carousel
              className="carousel"
              autoPlay={true}
              showArrows={false}
              interval={3000}
              infiniteLoop={true}
              showIndicators={true}
              showStatus={false}
            >
              {product.images.map((img, i) => (
                <div key={i}>
                  <img src={img} alt="banner" />
                </div>
              ))}
            </Carousel>
          </div>
          <div className="details">
            <h1 className="title">{product.title}</h1>
            <h3>
              By {product.brand}
              <span>
                {product.rating} <FaStar />
              </span>
            </h3>
            <div className="product-price">
              <h2>
                $
                {Math.floor(
                  product.price -
                    (product.price * product.discountPercentage) / 100
                )}
                <span>${product.price}</span>
              </h2>
              <h4>{product.discountPercentage}% off</h4>
            </div>
            <div className="prod-desc">
              <h1>Product Details</h1>
              <p>{product.description}</p>
            </div>
            <div className="pin-check">
              <p>Delivery</p>
              <div className="pin-input">
                <input
                  type="number"
                  className="checkInput"
                  onChange={(e) => setZipSearch(e.target.value.substring(0, 6))}
                  value={zipSearch}
                  placeholder="Enter Delivery Pincode"
                />
                <button className="checkBtn" onClick={() => zipCheckHandler()}>
                  Check
                </button>
              </div>
              <p className="pin-res">{zipRes}</p>
            </div>
            <div className="flex-button">
              <div className="main-button">
                <button className="buyBtn">Buy now</button>
                <button onClick={() => addToCartHandler(product)}>
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetails;
