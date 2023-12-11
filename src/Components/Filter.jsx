import { useSelector } from "react-redux";
import "../styles/Filter.scss";
import { selectBrands, selectCategories } from "../redux/product/productSlice";

const Filter = () => {
  const brand = useSelector(selectBrands);
  const categories = useSelector(selectCategories);

  return (
    <div id="filter">
      <h2>Filters</h2>
      <div className="availability option">
        <p>Availability</p>
        <input type="checkbox" name="available" id="available1" />
        <label htmlFor="available1">Include Out of Stock</label>
      </div>
      <div className="categories option">
        <p>Categories</p>
        {categories.map((item, i) => (
          <div key={i}>
            <input type="checkbox" name="category" id={`category${i}`} />
            <label htmlFor={`category${i}`}>{item.value}</label>
          </div>
        ))}
      </div>
      <div className="brands option">
        <p>Brands</p>
        {brand.map((item, i) => (
          <div key={i}>
            <input type="checkbox" name="brand" id={`brand${i}`} />
            <label htmlFor={`brand${i}`}>{item.value}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
