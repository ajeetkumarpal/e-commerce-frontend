import React, { useContext } from "react";
import { ShopContext } from "../context/CreateShopContext";
import Title from "./Title";

const CartTotal = () => {
  const { cartContainer, currency, delivery_fee } = useContext(ShopContext);
  const Subtotal = cartContainer.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0,
  );
  return (
    <div className="flex flex-col ">
      <p className="border-b border-gray-400 p-2">
        Subtotal{" "}
        <span className="float-right">
          {currency}
          {Subtotal}
        </span>
      </p>
      <p className="border-b border-gray-400 p-2">
        Shipping Fee{" "}
        <span className="float-right">
          {currency}
          {delivery_fee}
        </span>
      </p>
      <p className="border-b border-gray-400 font-semibold p-2">
        Total{" "}
        <span className="float-right">
          {currency}
          {delivery_fee + Subtotal}
        </span>
      </p>
    </div>
  );
};

export default CartTotal;
