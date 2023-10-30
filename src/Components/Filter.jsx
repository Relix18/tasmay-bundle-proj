import React from "react";
import "../styles/Filter.scss";

const Filter = () => {
  return (
    <div id="filter">
      <h2>Filters</h2>

      <div className="availability option">
        <p>Availability</p>
        <input type="radio" name="available" id="available1" />
        <label for="available1">Include Out of Stock</label>
      </div>
      <div className="categories option">
        <p>Categories</p>
        <input type="radio" name="category" id="category1" />
        <label for="category1">Almonds / Badam</label>
        <br></br>
        <input type="radio" name="category" id="category2" />
        <label for="category2">Basmati Rice</label>
        <br></br>
        <input type="radio" name="category" id="category3" />
        <label for="category3">Bathing Bars & Soaps</label>
        <br></br>
        <input type="radio" name="category" id="category4" />
        <label for="category4">Blended Masalas</label>
        <br></br>
        <input type="radio" name="category" id="category5" />
        <label for="category5">Body Lotion & Cream</label>
      </div>
      <div className="brands option">
        <p>Brands</p>
        <input type="radio" name="brand" id="brand1" />
        <label for="brand1">bb Combo</label>
        <br></br>
        <input type="radio" name="brand" id="brand2" />
        <label for="brand2">BB Royal</label>
        <br></br>
        <input type="radio" name="brand" id="brand3" />
        <label for="brand3">Farmogo</label>
        <br></br>
        <input type="radio" name="brand" id="brand4" />
        <label for="brand4">Fresho</label>
        <br></br>
        <input type="radio" name="brand" id="brand5" />
        <label for="brand5">Organic</label>
        <br></br>
        <input type="radio" name="brand" id="brand6" />
        <label for="brand6">Supa Corn</label>
        <br></br>
        <input type="radio" name="brand" id="brand7" />
        <label for="brand7">SV Agri Carisma</label>
        <br></br>
        <input type="radio" name="brand" id="brand8" />
        <label for="brand8">Tadaa</label>
      </div>
    </div>
  );
};

export default Filter;
