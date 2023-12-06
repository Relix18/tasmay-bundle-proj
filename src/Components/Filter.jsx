import "../styles/Filter.scss";

const Filter = () => {
  return (
    <div id="filter">
      <h2>Filters</h2>

      <div className="availability option">
        <p>Availability</p>
        <input type="radio" name="available" id="available1" />
        <label htmlFor="available1">Include Out of Stock</label>
      </div>
      <div className="categories option">
        <p>Categories</p>
        <input type="radio" name="category" id="category1" />
        <label htmlFor="category1">Almonds / Badam</label>
        <br></br>
        <input type="radio" name="category" id="category2" />
        <label htmlFor="category2">Basmati Rice</label>
        <br></br>
        <input type="radio" name="category" id="category3" />
        <label htmlFor="category3">Bathing Bars & Soaps</label>
        <br></br>
        <input type="radio" name="category" id="category4" />
        <label htmlFor="category4">Blended Masalas</label>
        <br></br>
        <input type="radio" name="category" id="category5" />
        <label htmlFor="category5">Body Lotion & Cream</label>
      </div>
      <div className="brands option">
        <p>Brands</p>
        <input type="radio" name="brand" id="brand1" />
        <label htmlFor="brand1">bb Combo</label>
        <br></br>
        <input type="radio" name="brand" id="brand2" />
        <label htmlFor="brand2">BB Royal</label>
        <br></br>
        <input type="radio" name="brand" id="brand3" />
        <label htmlFor="brand3">Farmogo</label>
        <br></br>
        <input type="radio" name="brand" id="brand4" />
        <label htmlFor="brand4">Fresho</label>
        <br></br>
        <input type="radio" name="brand" id="brand5" />
        <label htmlFor="brand5">Organic</label>
        <br></br>
        <input type="radio" name="brand" id="brand6" />
        <label htmlFor="brand6">Supa Corn</label>
        <br></br>
        <input type="radio" name="brand" id="brand7" />
        <label htmlFor="brand7">SV Agri Carisma</label>
        <br></br>
        <input type="radio" name="brand" id="brand8" />
        <label htmlFor="brand8">Tadaa</label>
      </div>
    </div>
  );
};

export default Filter;
