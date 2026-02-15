import React, { useContext } from "react";
import { ShopContext } from "../context/CreateShopContext";

import Title from "../components/Title";
import { Link } from "react-router-dom";
import { assets } from "../assets/frontend_assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { cartContainer, setCartContainer, currency } = useContext(ShopContext);

  const Subtotal = cartContainer.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0,
  );

  const cartRemoveHandler = (id, size, addedAt) => {
    setCartContainer((prev) =>
      prev.filter(
        (cart) =>
          !(cart.id === id && cart.size === size && cart.addedAt == addedAt),
      ),
    );
  };
  return (
    <div className="flex flex-col py-4">
      <Title text1={"YOUR"} text2={"CART"} />
      {cartContainer.map((cart) => (
        <div
          key={cart.addedAt}
          className="flex flex-row border-b border-gray-500 justify-between items-center pt-5 pb-1"
        >
          <Link to={`/product/${cart.id}`}>
            <div className="flex flex-row items-center">
              <img
                className="h-24 w-24  border border-gray-400 mr-4"
                src={cart.image}
                alt="not found"
              />
              <div className="flex flex-col">
                <p className="font-medium text-lg">{cart.name}</p>
                <div className="flex flex-row">
                  <p className="font-bold text-lg pt-1">
                    {currency}
                    {cart.price}
                  </p>
                  <p className="h-8 w-8 border border-gray-400 bg-gray-300 text-center ml-4">
                    {cart.size}
                  </p>
                </div>
              </div>
            </div>
          </Link>
          <div className="flex flex-row justify-between gap-4 items-center">
            <div className="h-8 w-32 font-semibold border border-gray-400 text-center">
              <span className="font-medium pr-2">Quantity:</span>
              {cart.quantity}
            </div>
            <div>
              <button
                onClick={() =>
                  cartRemoveHandler(cart.id, cart.size, cart.addedAt)
                }
                className="h-5  w-5  border-gray-500  "
              >
                <img src={assets.bin_icon} alt="" />
              </button>
            </div>
          </div>
        </div>
      ))}
      <div className="flex flex-col w-1/3 p-2 justify-center mt-20 ml-auto mb-4">
        <Title text1={"CART"} text2={"TOTAL"} />
        <CartTotal />
        <Link to="/placeorder">
          <button className="h-12 w-56 border hover:bg-gray-400 border-gray-400 bg-gray-700 text-white font-medium my-3  ">
            PROCEED TO CHECKOUT
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
