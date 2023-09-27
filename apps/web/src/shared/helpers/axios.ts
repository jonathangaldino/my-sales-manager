import axios from "axios";

// Set config defaults when creating the instance
const reqInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3000",
  headers: {},
});

export default reqInstance;
