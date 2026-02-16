import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/admin_assets/assets";
import Title from "../components/Title";
import removeOrder from "../services/removeOrder";
import { io } from "socket.io-client";
import { backendURL } from "../api";

const socket = io(`${backendURL}`);

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${backendURL}/api/order/list`);

      if (res.data.success) {
        setOrders(res.data.data);
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();

    socket.on("orderStatusUpdated", (updatedOrder) => {
      console.log("Socket update received:", updatedOrder);

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order,
        ),
      );
    });

    return () => {
      socket.off("orderStatusUpdated");
    };
  }, []);

  const handleRemove = async (id) => {
    try {
      const res = await removeOrder(id);

      if (res.data.success) {
        setOrders((prev) => prev.filter((order) => order._id !== id));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error("Delete failed", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-200 text-yellow-800";
      case "Shipped":
        return "bg-blue-200 text-blue-800";
      case "Out for Delivery":
        return "bg-purple-200 text-purple-800";
      case "Delivered":
        return "bg-green-200 text-green-800";
      case "Cancelled":
        return "bg-red-200 text-red-800";
      case "Refunded":
        return "bg-gray-200 text-gray-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading orders...</p>;
  }

  if (!orders.length) {
    return (
      <p className="text-center text-4xl mb-20 mt-10 text-gray-500">
        No orders found
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto pt-6 pb-18 space-y-8">
      <Title text1={"Total"} text2={"Order"} />

      {orders.map((orderItem) => (
        <div
          key={orderItem._id}
          className="border border-gray-200 rounded-xl p-6 bg-white shadow-md"
        >
          {orderItem.deliveryStatus === "Pending" && (
            <button
              onClick={() => handleRemove(orderItem._id)}
              className="h-8 -mt-10 w-24 float-end rounded-full text-red-800 bg-red-200 font-semibold text-sm"
            >
              Cancel
            </button>
          )}

          <div className="flex items-start justify-between gap-5 mb-4">
            <div className="flex items-start gap-5 flex-1">
              <img
                src={assets.parcel_icon}
                alt=""
                className="w-20 h-20 object-cover rounded-md border"
              />

              <div>
                <p className="text-lg font-semibold text-gray-800">
                  {orderItem.firstName} {orderItem.lastName}
                </p>

                <div className="text-sm text-gray-600 mt-1 leading-relaxed">
                  {orderItem.street}, {orderItem.city}, {orderItem.state},{" "}
                  {orderItem.country} - {orderItem.zipcode}
                </div>

                <p className="text-sm text-gray-500 mt-1">
                  Phone: {orderItem.phone}
                </p>
              </div>
            </div>

            <div className="text-right flex flex-col items-end gap-2">
              <p className="text-sm text-gray-600">
                {new Date(orderItem.createdAt).toLocaleDateString("en-IN")}
              </p>

              <span className="px-4 min-w-20 text-center py-2 text-sm font-bold text-green-700 bg-green-200 border border-green-300 rounded-full">
                {orderItem.paymentMethod} - ₹ {orderItem.payment}
              </span>
            </div>
          </div>

          <div className="space-y-3 mt-4">
            {orderItem.cartItems.map((data) => (
              <div
                key={data._id}
                className="grid grid-cols-[2fr_1fr_1fr_1fr] items-center border border-gray-100 rounded-lg p-4 bg-gray-50"
              >
                <p className="font-medium text-gray-800">
                  {data.name}
                  <span className="mx-4 bg-black text-amber-300 px-4 py-2 rounded-full text-sm">
                    {data.size}
                  </span>
                </p>

                <p className="text-sm text-gray-600 text-center">
                  Qty: {data.quantity}
                </p>

                <p className="text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(
                      orderItem.deliveryStatus,
                    )}`}
                  >
                    {orderItem.deliveryStatus || "Pending"}
                  </span>
                </p>

                <p className="font-bold text-orange-600 text-right">
                  Payment:{" "}
                  {orderItem.paymentMethod === "razorpay"
                    ? "Success"
                    : "Pending"}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Order;
