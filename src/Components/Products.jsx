import Filter from "./Filter";
import ProductList from "./ProductList";
import "../styles/Products.scss";

const Products = () => {
  return (
    <div id="products">
      <div>
        <Filter />
      </div>
      <div className="card">
        <ProductList />
      </div>
    </div>
  );
};

export default Products;
