import axios from "axios";

export function fetchProducts() {
  return axios.get("http://localhost:8080/products");
}

export function fetchProductById(id) {
  return axios.get("http://localhost:8080/products/" + id);
}

export function fetchProductsBrand() {
  return axios.get("http://localhost:8080/brands/");
}

export function fetchProductsCategory() {
  return axios.get("http://localhost:8080/categories/");
}

export function fetchProductByFilter(filter) {
  let queryString = "";
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length > 0) {
      queryString += `${key}=${categoryValues}&`;
    }
  }
  return axios.get(`http://localhost:8080/products?${queryString}`);
}

export function fetchProductBySearch(search) {
  return axios.get("http://localhost:8080/products?q=" + search);
}
