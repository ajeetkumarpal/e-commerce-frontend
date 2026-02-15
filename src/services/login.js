import { backendURL } from "../api";
import axios from "axios";

const loginApi = async (data, status) => {
  try {
    const response = await axios.post(`${backendURL}${status}`, data, {
      headers: { "Content-Type": "application/json" },
    });
    console.log(response);

    return response;
  } catch (error) {
    console.log("error", error.response);
    return error.response;
  }
};
export default loginApi;
