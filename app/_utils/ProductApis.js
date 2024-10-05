import { axiosClient } from "./axiosClient";

const getLatestProducts = () => axiosClient.get("/products?populate=*");

export default {
  getLatestProducts,
};
