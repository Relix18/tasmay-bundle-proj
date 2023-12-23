import axios from "axios";

export function fetchLoggedInUser(userId) {
  return axios.get(`http://localhost:8080/user/${userId}`);
}

export function fetchLoggedInUserOrders(userId) {
  return axios.get(`http://localhost:8080/orders/?user.id=${userId}`);
}

export function updateUser(update) {
  return axios.patch("http://localhost:8080/user/" + update.id, update);
}
