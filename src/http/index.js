import axios from "axios";

export const http = axios.create({
  baseURL: "http://192.168.0.85:3002/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
