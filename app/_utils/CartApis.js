import { axiosClient } from "./axiosClient";

const addToCart = (payload) => {
  return axiosClient.post("/carts", payload);
};

// Updated getUserCart function
const getUserCart = (email) => {
  return axiosClient.get(
    `/carts?populate[products][populate]=banner&filters[email][$eq]=${encodeURIComponent(
      email
    )}`
  );
};

const deleteCartItem = (id) => {
  return axiosClient.delete(`/carts/${id}`);
};

export default { addToCart, getUserCart, deleteCartItem };
