import axios from "axios";

export function fetchProducts() {
  return axios.get("http://localhost:8080/products");
}

export function fetchProductById(id) {
  return axios.get("http://localhost:8080/products/" + id);
}

export function fetchProductByBrand() {
  return axios.get("http://localhost:8080/brands/");
}

export function fetchProductByCategory() {
  return axios.get("http://localhost:8080/categories/");
}
