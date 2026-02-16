import axios from "axios";
import { backendURL } from "../api";

const createPaymentRajorpay = async (paymentData) => {
  try {
    const response = await axios.post(          
      `${backendURL}/api/payment/rajorpay/createorder`,
      paymentData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log("error", error);
    return error.response;
  }
};
export default createPaymentRajorpay;
