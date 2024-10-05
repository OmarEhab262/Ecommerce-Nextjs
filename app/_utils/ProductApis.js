import { axiosClient } from "./axiosClient";

const getLatestProducts = () => axiosClient.get("/products?populate=*");
const getProductById = (id) => axiosClient.get(`/products/${id}?populate=*`);
const getProductByCategoryExcludingId = (category, excludedCategoryId) =>
  axiosClient.get(
    `/products?filters[category][$eq]=${category}&filters[id][$ne]=${excludedCategoryId}&populate=*`
  );

export default {
  getLatestProducts,
  getProductById,
  getProductByCategoryExcludingId,
};
