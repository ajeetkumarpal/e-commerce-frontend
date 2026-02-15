import React, { useContext } from "react";

import { Link } from "react-router-dom";
import { ShopContext } from "../context/CreateShopContext";

const ProductItems = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link className="flex flex-col" to={`/product/${id}`}>
      <div className="overflow-hidden">
        <img
          className="hover:scale-110 transition ease-in-out w-full h-56"
          src={image[0]}
          alt=""
        />
      </div>
      <p className="overflow-hidden whitespace-nowrap text-ellipsis text-sm">
        {name}
      </p>
      <p>
        {currency}
        {price}
      </p>
    </Link>
  );
};

export default ProductItems;
