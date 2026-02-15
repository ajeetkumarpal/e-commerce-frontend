import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/CreateShopContext";
import Title from "./Title";
import ProductItems from "./ProductItems";

const RelatedProduct = ({ category, subCategory, id }) => {
  const { products } = useContext(ShopContext);
  const [RelatedProductArr, setRelatedProductArr] = useState([]);

  useEffect(() => {
    if (products.length <= 0) return;
    const copyProducts = products.slice();

    const categoryRelated = copyProducts
      .filter((product) => product.category === category && product._id !== id)
      .slice(0, 5);
    const subCategoryRelated = copyProducts
      .filter(
        (product) => product.subCategory === subCategory && product._id !== id,
      )
      .slice(0, 5);
    if (subCategoryRelated.length >= 5) {
      setRelatedProductArr(subCategoryRelated);
    } else if (subCategoryRelated.length < 5) {
      const combinedRelated = subCategoryRelated
        .concat(categoryRelated)
        .slice(0, 5);
      setRelatedProductArr(combinedRelated);
    }
  }, [id, subCategory, category, products]);

  return (
    <div className="flex flex-col">
      <Title text1={"RELATED"} text2={"PRODUCTS"} />
      <div className="grid grid-cols-5 gap-4 py-4">
        {RelatedProductArr.map((item) => (
          <ProductItems
            key={item._id}
            id={item._id}
            name={item.name}
            image={item.image}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProduct;
