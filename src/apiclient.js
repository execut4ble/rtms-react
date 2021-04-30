import axios from "axios";

// Set config defaults when creating the instance
const instance = (token) =>
  axios.create({
    baseURL:
      process.env.NODE_ENV === "production" ? "/api" : "http://localhost:3337",
    headers: { Authorization: `Bearer ${token}` },
  });

export default instance;
