import axios from "axios";

export default axios.create({
  baseURL: "http://amis.manhnv.net",
  headers: {
    "Content-type": "application/json"
  }
});