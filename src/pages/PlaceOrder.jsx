import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { useNavigate } from "react-router-dom";

import deliveryAddress from "../services/deliveryAddress";
import { toast } from "react-toastify";
import { ShopContext } from "../context/CreateShopContext";
import createPaymentRajorpay from "../services/createPaymentOrder";
import verifyPaymentRajorpay from "../services/verifyPayment";

const PlaceOrder = () => {
  const {
    cartDataForBackend,
    userLoggedIn,
    cartContainer,
    setCartContainer,
    setOrderData,
  } = useContext(ShopContext);

  const Subtotal = cartContainer.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0,
  );

  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("razorpay");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");

  const submitHandler = async () => {
    try {
      const orderDetail = {
        firstName,
        lastName,
        email,
        street,
        city,
        state,
        zipcode,
        country,
        phone,
        paymentMethod,
        payment: Subtotal,
        cartItems: cartDataForBackend,
      };

      const result = await deliveryAddress(orderDetail);

      if (result.data.success) {
        setOrderData(result.data);
        return true;
      } else {
        toast.error("Order save failed");
        return false;
      }
    } catch (error) {
      console.log(error);
      toast.error("Order error");
      return false;
    }
  };

  const paymentHandler = async () => {
    if (Subtotal === 0) {
      toast.error("Cart is empty");
      return;
    } else if (email.length === 0) {
      toast.error("email is mandatory");
    } else if (userLoggedIn.length === 0) {
      toast.error("login first!");
    } else {
      if (paymentMethod === "cod") {
        const orderSaved = await submitHandler();
        if (orderSaved) {
          toast.success("Order placed successfully");
          sessionStorage.removeItem("cartContainer");
          setCartContainer([]);
          navigate("/order");
        }
        return;
      }

      if (paymentMethod === "razorpay") {
        try {
          //  Create order in backend
          const result = await createPaymentRajorpay({
            amount: Subtotal,
          });

          if (!result.data.success) {
            toast.error("Payment initiation failed");
            return;
          }

          const { order_id, amount, currency, key } = result.data;

          // Open Razorpay popup
          const options = {
            key: key,
            amount: amount,
            currency: currency,
            name: "My Store",
            description: "Order Payment",
            order_id: order_id,

            handler: async function (response) {
              //  Verify payment
              const verifyData = {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              };

              const verify = await verifyPaymentRajorpay(verifyData);

              if (verify.data.success) {
                //  Save order after payment success
                const orderSaved = await submitHandler();

                if (orderSaved) {
                  toast.success("Payment Successful");
                  sessionStorage.removeItem("cartContainer");
                  setCartContainer([]);
                  navigate("/order");
                }
              } else {
                toast.error("Payment verification failed");
              }
            },

            prefill: {
              name: firstName + " " + lastName,
              email: email,
              contact: phone,
            },

            theme: {
              color: "#3399cc",
            },
          };

          const razor = new window.Razorpay(options);
          razor.open();
        } catch (error) {
          console.error(error);
          toast.error("Payment failed");
        }
      }

      if (paymentMethod === "stripe") {
        toast.info("Stripe integration pending");
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-40  mb-52">
      <div className="flex-1 mt-20">
        <Title text1="DELIVERY" text2="INFORMATION" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <input
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full py-2 px-3 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full py-2 px-3 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full py-2 px-3 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 col-span-2"
          />
          <input
            type="text"
            placeholder="Street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            className="w-full py-2 px-3 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 col-span-2"
          />
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full py-2 px-3 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full py-2 px-3 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Zipcode"
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
            className="w-full py-2 px-3 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full py-2 px-3 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full py-2 px-3 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 col-span-2"
          />
        </div>
      </div>

      <div className="flex-1 mt-32">
        <Title text1="CART PRODUCT" text2="TOTAL" />
        <CartTotal />

        <Title text1="PAYMENT" text2="METHOD" className="mt-6 mb-2" />

        <div className="flex gap-3 mt-2">
          <button
            onClick={() => setPaymentMethod("stripe")}
            className={`flex-1 py-2 border rounded ${
              paymentMethod === "stripe"
                ? "bg-green-500 text-white"
                : "bg-gray-100"
            }`}
          >
            Stripe
          </button>
          <button
            onClick={() => setPaymentMethod("razorpay")}
            className={`flex-1 py-2 border rounded ${
              paymentMethod === "razorpay"
                ? "bg-green-500 text-white"
                : "bg-gray-100"
            }`}
          >
            Razorpay
          </button>
          <button
            onClick={() => setPaymentMethod("cod")}
            className={`flex-1 py-2 border rounded ${
              paymentMethod === "cod"
                ? "bg-green-500 text-white"
                : "bg-gray-100"
            }`}
          >
            COD
          </button>
        </div>

        <button
          type="button"
          onClick={paymentHandler}
          className="mt-6 w-full py-3 bg-gray-700 text-white font-medium rounded hover:bg-gray-600"
        >
          PLACE ORDER
        </button>
      </div>
    </div>
  );
};

export default PlaceOrder;
