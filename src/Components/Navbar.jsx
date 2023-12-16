import { useRef, useState } from "react";
import "../styles/Navbar.scss";
import logo from "../assets/logo.png";
import { BsCart3 } from "react-icons/bs";
import { IoIosSearch } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectItems } from "../redux/cart/cartSlice";
import { productBySearchAsync } from "../redux/product/productSlice";

export const zipCodes = [
  "229206",
  "229309",
  "229308",
  "229001",
  "229301",
  "229231",
];

const Header = () => {
  const [search, setSearch] = useState("");
  const [zipCodeToggle, setZipCodeToggle] = useState(false);
  const [zipSearch, setZipSearch] = useState("");
  const [zipRes, setZipRes] = useState("");
  const clearSearch = useRef("");
  const dispatch = useDispatch();

  const p = document.querySelector(".pin-res");

  zipRes === "Available" ? p.classList.add("green") : "";
  zipRes === "Not Available" ? p.classList.remove("green") : "";

  const items = useSelector(selectItems);

  const zipCodeToggleHandler = () => {
    if (zipCodeToggle === true) {
      setZipCodeToggle(false);
    } else {
      setZipCodeToggle(true);
    }
  };

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
  const searchButtonHandle = () => {
    dispatch(productBySearchAsync(search));
    console.log(search);
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
          <div
            className="location"
            onClick={() => {
              zipCodeToggleHandler();
            }}
          >
            <span className="locationIcon"></span>

            <button className="locationBtn">
              <IoLocationSharp className="locationIcon" /> See locations
            </button>
          </div>
          {zipCodeToggle && (
            <div className="checkOption">
              <input
                type="number"
                className="checkInput"
                onChange={(e) => setZipSearch(e.target.value.substring(0, 6))}
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
                <button className="checkBtn" onClick={() => zipCheckHandler()}>
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
            </div>
          )}
          <div className="otherIcon">
            <Link className="cart" to="/cart">
              <BsCart3 />
              <p>{items.length}</p>
            </Link>
            <Link className="profile" to="/login">
              <AiOutlineUser />
            </Link>
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

export default Header;
