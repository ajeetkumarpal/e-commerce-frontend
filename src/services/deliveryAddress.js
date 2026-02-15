import axios from "axios";
import { backendURLOrder } from "../api";

const deliveryAddress = async (deliveryDetail) => {
  try {
    console.log("start", deliveryDetail);
    const response = await axios.post(
      backendURLOrder + "place",
      deliveryDetail,
      { headers: { "Content-Type": "application/json" } },
    );
    console.log(response.data);
    return response;
  } catch (error) {
    console.log("error in delivery address in frontend", error.message);
    throw error.response;
  }
};
export default deliveryAddress;
