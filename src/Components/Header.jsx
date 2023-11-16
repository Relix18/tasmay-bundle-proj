import React, { useRef, useState } from "react";
import "../styles/Header.scss";
import logo from "../assets/logo.png";
import { BsCart3 } from "react-icons/bs";
import { IoIosSearch } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";

const Header = () => {
  const zipCodes = ["229206", "229309", "229308", "229001", "229301", "229231"];
  const [search, setSearch] = useState("");
  const [zipCodeToggle, setZipCodeToggle] = useState(false);
  const [zipSearch, setZipSearch] = useState("");
  const [zipRes, setZipRes] = useState("");
  const clearSearch = useRef("");

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
    console.log(search);
    setSearch("");
    clearSearch.current.value = "";
  };

  return (
    <div id="header">
      {/* <Link to={"/"}> */}
      <img src={logo} alt="Logo" className="logo" />
      {/* </Link> */}

      <div className="navbar">
        <div className="inputs">
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
            <span className="searchIcon" onClick={() => searchButtonHandle()}>
              <IoIosSearch />
            </span>
          </div>
          <div
            className="location"
            onClick={() => {
              zipCodeToggleHandler();
            }}
          >
            <span className="locationIcon">
              <IoLocationSharp />
            </span>

            <button className="locationBtn">See locations</button>
          </div>
          {zipCodeToggle && (
            <div className="checkOption">
              <input
                type="number"
                className="checkInput"
                onChange={(e) => setZipSearch(e.target.value)}
                value={zipSearch}
                placeholder="Check Location"
              />
              <p style={{ color: "red", fontSize: "12px", marginLeft: "10px" }}>
                {zipRes}
              </p>

              <button className="checkBtn" onClick={() => zipCheckHandler()}>
                Check
              </button>
              <button
                className="close"
                onClick={() => {
                  setZipCodeToggle(false);
                  setZipSearch("");
                }}
              >
                Cancel
              </button>
            </div>
          )}
          <div className="otherIcon">
            <Link className="cart" to="/cart">
              <BsCart3 />
              <p>0</p>
            </Link>
            <AiOutlineUser />
          </div>
        </div>
        <div className="buttons">
          <select>
            <option>Shop by category</option>
            <option>Almonds/Badam</option>
            <option>Basmati Rice</option>
            <option>Bathing Bars & Soaps</option>
            <option>Blended Masalas</option>
            <option>Body Lotion & Cream</option>
          </select>
          <button>Oil & Spicies</button>
          <button>Grains</button>
          <button>Organic</button>
          <button>Personal Care</button>
          <button className="contactBtn">Contact</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
