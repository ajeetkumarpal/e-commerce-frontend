import React, { useContext, useEffect, useState } from "react";
import Title from "./Title";
import { ShopContext } from "../context/CreateShopContext";
import ProductItems from "./ProductItems";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProduct, setLatestProduct] = useState([]);

  useEffect(() => {
    setLatestProduct(products.slice(0, 10));
  }, [products]);

  return (
    <div className="flex flex-col py-12 ">
      <div className="flex flex-col">
        <Title text1="LATEST" text2="COLLECTION" />
        <p className="text-sm text-gray-600 text-center pb-4">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vel magni
          porro minima et odit.
        </p>
      </div>
      <div className="grid grid-cols-5 gap-4 py-4">
        {latestProduct.map((item) => {
          return (
            <ProductItems
              key={item._id}
              id={item._id}
              image={item.image}
              price={item.price}
              name={item.name}
            />
          );
        })}
      </div>
    </div>
  );
};

export default LatestCollection;
