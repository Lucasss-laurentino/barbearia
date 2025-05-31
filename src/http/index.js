import axios from "axios";

export const http = axios.create({
  baseURL: "http://192.168.0.85:5171/",
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
