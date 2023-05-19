import axios from "axios";

export const sections = [

]

export const endpoints = [

]

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3005",
});

export default api;
