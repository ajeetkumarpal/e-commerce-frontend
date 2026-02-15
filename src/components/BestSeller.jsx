import React, { useContext, useEffect, useState } from "react";
import Title from "./Title";
import { ShopContext } from "../context/CreateShopContext";
import ProductItems from "./ProductItems";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSellerCollection, setBestSellerCollection] = useState([]);
  useEffect(() => {
    const bestSellerFilter =
      products?.filter((item) => item.bestseller === true) || [];

    setBestSellerCollection(bestSellerFilter.slice(0, 5));
  }, [products]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <Title text1="BEST" text2="SELLER" />
        <p className="text-sm text-gray-600 text-center pb-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
          necessitatibus numquam, culpa deleniti neque asperiores
        </p>
      </div>
      <div className="grid grid-cols-5 gap-4 py-4">
        {bestSellerCollection.map((item) => (
          <ProductItems
            key={item._id}
            name={item.name}
            price={item.price}
            image={item.image}
            id={item._id}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
