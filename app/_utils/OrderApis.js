import { axiosClient } from "./axiosClient";

const createOrder = (data) => axiosClient.post("/orders", data);

export default { createOrder };
