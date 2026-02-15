import axios from "axios";
import { backendURLPayment } from "../api";

const verifyPaymentRajorpay = async (verifyData) => {
  try {
    const response = await axios.post(
      backendURLPayment + "rajorpay/verifypayment",
      verifyData,
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
export default verifyPaymentRajorpay;
