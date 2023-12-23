import axios from "axios";

export const fetchCreateOrder = (order) => {
  return axios.post("http://localhost:8080/orders", order);
};
