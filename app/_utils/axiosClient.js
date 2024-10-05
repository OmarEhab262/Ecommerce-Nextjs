const apiKey = process.env.NEXT_PUBLIC_REST_API_KEY;
const axios = require("axios");
const apiUrl = "http://localhost:1337/api";
export const axiosClient = axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: `Bearer ${apiKey}`,
  },
});
