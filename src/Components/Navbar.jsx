import { useEffect, useRef, useState } from "react";
import "../styles/Navbar.scss";
import logo from "../assets/logo.png";
import { BsCart3 } from "react-icons/bs";
import { IoIosSearch } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectItems } from "../redux/cart/cartSlice";
import {
  productAsync,
  productBySearchAsync,
} from "../redux/product/productSlice";
import { AnimatePresence, motion } from "framer-motion";
import { zipCodes } from "./utils/common.jsx";
import { selectLoggedInUser } from "../redux/auth/authSlice.js";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [zipCodeToggle, setZipCodeToggle] = useState(false);
  const [zipSearch, setZipSearch] = useState("");
  const [zipRes, setZipRes] = useState("");
  const [showUser, setShowUser] = useState(false);
  const divRef = useRef();
  const zipRef = useRef();
  const clearSearch = useRef("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectLoggedInUser);

  const p = document.querySelector(".pin-res");

  zipRes === "Available" ? p.classList.add("green") : "";
  zipRes === "Not Available" ? p.classList.remove("green") : "";

  const items = useSelector(selectItems);

  const zipCheckHandler = () => {
    if (zipCodes.includes(zipSearch)) {
      setZipRes("Available");
    } else {
      setZipRes("Not Available");
    }
  };

  const searchHandle = (e) => {
    setSearch(e.target.value);
  };
  const searchButtonHandle = async () => {
    navigate("/");
    await dispatch(productAsync());
    dispatch(productBySearchAsync(search));
  };

  useEffect(() => {
    document.addEventListener("mousedown", userHandle);
    document.addEventListener("mousedown", zipHandle);
  }, []);

  const userHandle = (e) => {
    if (divRef.current && !divRef.current.contains(e.target)) {
      setShowUser(false);
    }
  };

  const zipHandle = (e) => {
    if (zipRef.current && !zipRef.current.contains(e.target)) {
      setZipCodeToggle(false);
    }
  };

  return (
    <div id="Navbar">
      <div className="navbar">
        <div className="inputs">
          <Link to={"/"} className="logo">
            <img src={logo} alt="Logo" />
          </Link>
          <div className="searchInput">
            <input
              type="search"
              ref={clearSearch}
              placeholder="Search for products..."
              className="searchBox"
              onChange={(e) => {
                searchHandle(e);
              }}
            />
            <span className="searchIcon" onClick={(e) => searchButtonHandle(e)}>
              <IoIosSearch />
            </span>
          </div>

          <div className="location" ref={zipRef}>
            <span className="locationIcon"></span>

            <button
              className="locationBtn"
              onClick={() => {
                setZipCodeToggle(!zipCodeToggle);
              }}
            >
              <IoLocationSharp className="locationIcon" /> See locations
            </button>
            <AnimatePresence mode="wait">
              {zipCodeToggle && (
                <motion.div
                  initial={{
                    opacity: 0,
                    transformOrigin: "top right",
                    scale: 0.9,
                  }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="checkOption"
                >
                  <input
                    type="number"
                    className="checkInput"
                    onChange={(e) =>
                      setZipSearch(e.target.value.substring(0, 6))
                    }
                    value={zipSearch}
                    placeholder="Enter Pincode"
                  />
                  <p
                    className="pin-res"
                    style={{ fontSize: "12px", marginLeft: "10px" }}
                  >
                    {zipRes}
                  </p>
                  <div className="butt">
                    <button
                      className="checkBtn"
                      onClick={() => zipCheckHandler()}
                    >
                      Check
                    </button>
                    <button
                      className="close"
                      onClick={() => {
                        setZipCodeToggle(false);
                        setZipSearch("");
                        setZipRes("");
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="otherIcon">
            <Link className="cart" to="/cart">
              <BsCart3 />
              <p>{items.length}</p>
            </Link>
            <div ref={divRef} className="userIcon">
              {user ? (
                <div onClick={() => setShowUser(!showUser)}>
                  <AiOutlineUser />
                </div>
              ) : (
                <Link to="/login">
                  <AiOutlineUser />
                </Link>
              )}
              <AnimatePresence mode="wait">
                {showUser && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      transformOrigin: "top right",
                      scale: 0.9,
                    }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className="user"
                  >
                    {user && (
                      <>
                        <div onClick={() => setShowUser(!showUser)}>
                          <Link className="account" to="/profile">
                            My Account
                          </Link>
                        </div>
                        <div onClick={() => setShowUser(!showUser)}>
                          <Link className="order" to="/orders">
                            My Orders
                          </Link>
                        </div>
                        <div onClick={() => setShowUser(!showUser)}>
                          <Link className="logout" to="/">
                            Sign out
                          </Link>
                        </div>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
        <div className="buttons">
          <div className="emptyDiv"></div>
          <select onChange={(e) => console.log(e.target.value)}>
            <option>Shop by category</option>
            <option>Almonds/Badam</option>
            <option>Basmati Rice</option>
            <option>Bathing Bars & Soaps</option>
            <option>Blended Masalas</option>
            <option>Body Lotion & Cream</option>
          </select>
          <div className="catBtn">
            <button>Oil & Spicies</button>
            <button>Grains</button>
            <button>Organic</button>
            <button>Personal Care</button>
          </div>
          <button className="contactBtn">Contact</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
