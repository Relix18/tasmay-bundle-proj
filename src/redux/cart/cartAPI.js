import axios from "axios";

export function fetchItems(item) {
  return axios.get("http://localhost:8080/cart" + item);
}

export function fetchItemsByUser(userId) {
  return axios.get("http://localhost:8080/cart?user=" + userId);
}

export function addItem(item) {
  return axios.post("http://localhost:8080/cart", item);
}

export function updateItem(id, itemUpdate) {
  return axios.patch(`http://localhost:8080/cart/${id}`, itemUpdate);
}

export function deleteItem(id) {
  return axios.delete(`http://localhost:8080/cart/${id}`);
}

export function resetCart(userId) {
  return new Promise(async (resolve) => {
    const response = await fetchItemsByUser(userId);
    const items = response.data;
    for (let item of items) {
      await deleteItem(item.id);
    }
    resolve({ status: "success" });
  });
}
