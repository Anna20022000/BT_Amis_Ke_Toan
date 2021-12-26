import axios from "axios";

export default axios.create({
  // baseURL: "http://amis.manhnv.net",
  baseURL: "http://localhost:18204",
  headers: {
    "Content-type": "application/json"
  }
});