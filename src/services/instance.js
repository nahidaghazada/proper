import axios from "axios";
import ConfigObj from "../config/config";

export const instance = axios.create({
  baseURL: ConfigObj.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})