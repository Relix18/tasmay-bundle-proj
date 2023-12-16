import { useDispatch, useSelector } from "react-redux";
import "../styles/Filter.scss";
import {
  productByFilterAsync,
  selectBrands,
  selectCategories,
} from "../redux/product/productSlice";
import { useEffect, useState } from "react";

const Filter = () => {
  const dispatch = useDispatch();
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const [filter, setFilter] = useState({});

  const filters = [
    {
      id: "category",
      name: "Category",
      options: categories,
    },
    {
      id: "brand",
      name: "Brands",
      options: brands,
    },
  ];

  const handleFilter = (e, section, option) => {
    const newFilter = { ...filter };
    if (e.target.checked) {
      if (newFilter[section.id]) {
        newFilter[section.id].push(option.value);
      } else {
        newFilter[section.id] = [option.value];
      }
    } else {
      const index = newFilter[section.id].findIndex(
        (value) => value === option.value
      );
      newFilter[section.id].splice(index, 1);
    }
    setFilter(newFilter);
  };

  useEffect(() => {
    dispatch(productByFilterAsync(filter));
  }, [dispatch, filter]);

  return (
    <div id="filter">
      <h2>Filters</h2>
      {filters.map((section) => (
        <div className="filter option" key={section.id}>
          <p>{section.name}</p>
          {section.options.map((option, i) => (
            <div key={i}>
              <input
                type="checkbox"
                name={`${section.id}[]`}
                value={option.value}
                id={`filter-${section.id}-${i}`}
                onChange={(e) => handleFilter(e, section, option)}
              />

              <label htmlFor={`filter-${section.id}-${i}`}>
                {option.label}
              </label>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Filter;
