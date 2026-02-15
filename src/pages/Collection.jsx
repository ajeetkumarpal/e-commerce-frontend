import React, { useContext, useState } from "react";
import { ShopContext } from "../context/CreateShopContext";
import Title from "../components/Title";
import ProductItems from "../components/ProductItems";

const Collection = () => {
  const { products, searchOpen, searchInput } = useContext(ShopContext);
  const [sortPrice, setSortPrice] = useState("relavent");

  const [categoryValue, setCategoryValue] = useState({
    Men: false,
    Women: false,
    Kids: false,
  });

  const categoryFilter = Object.keys(categoryValue).filter(
    (categ) => categoryValue[categ] === true,
  );

  const [subCategoryValue, setSubCategoryValue] = useState({
    Topwear: false,
    Bottomwear: false,
    Winterwear: false,
  });

  const subCategoryFilter = Object.keys(subCategoryValue).filter(
    (categ) => subCategoryValue[categ] === true,
  );
  const finalShowProduct = products.filter((pro) => {
    const showByCategory =
      categoryFilter.length === 0 || categoryFilter.includes(pro.category);
    const showBySubCategory =
      subCategoryFilter.length === 0 ||
      subCategoryFilter.includes(pro.subCategory);

    return showByCategory && showBySubCategory;
  });

  const filterLowToHigh = [...finalShowProduct].sort(
    (a, b) => a.price - b.price,
  );
  const filterHighToLow = [...finalShowProduct].sort(
    (a, b) => b.price - a.price,
  );

  let finalProduct;
  if (sortPrice == "relavent") {
    finalProduct = finalShowProduct;
  } else if (sortPrice == "lowhigh") {
    finalProduct = filterLowToHigh;
  } else if (sortPrice == "highlow") {
    finalProduct = filterHighToLow;
  }

  const SearchProduct = finalProduct.filter((product) =>
    product.name.toLowerCase().includes(searchInput.toLowerCase()),
  );

  return (
    <div className="flex flex-row justify-between py-8">
      <div className="flex flex-col ">
        <p className="font-medium text-xl pt-2 pb-1.5">FILTERS</p>
        <div className="flex flex-col min-w-60 border border-gray-700 items-start justify-center pl-4 gap-1 py-2 text-sm my-4">
          <p className="font-medium py-1">CATEGORIES</p>
          <label className="py-0.5">
            <input
              className=" mr-2"
              name="Men"
              checked={categoryValue.Men}
              type="checkbox"
              onChange={(e) =>
                setCategoryValue((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.checked,
                }))
              }
            />
            Men
          </label>
          <label className="py-0.5">
            <input
              className=" mr-2"
              type="checkbox"
              name="Women"
              checked={categoryValue.Women}
              onChange={(e) =>
                setCategoryValue((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.checked,
                }))
              }
            />
            Women
          </label>
          <label className="py-0.5">
            <input
              className=" mr-2"
              type="checkbox"
              name="Kids"
              checked={categoryValue.Kids}
              onChange={(e) =>
                setCategoryValue((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.checked,
                }))
              }
            />
            Kids
          </label>
        </div>
        <div className="flex flex-col max-w-60 border border-gray-700 items-start justify-center pl-4 gap-1 py-2 text-sm my-4">
          <p className="font-medium py-1">TYPE</p>
          <label className="py-0.5">
            <input
              className=" mr-2"
              type="checkbox"
              name="Topwear"
              checked={subCategoryValue.Topwear}
              onChange={(e) =>
                setSubCategoryValue((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.checked,
                }))
              }
            />
            Topwear
          </label>
          <label className="py-0.5">
            <input
              className=" mr-2"
              type="checkbox"
              name="Bottomwear"
              checked={subCategoryValue.Bottomwear}
              onChange={(e) =>
                setSubCategoryValue((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.checked,
                }))
              }
            />
            Bottomwear
          </label>
          <label className="py-0.5">
            <input
              className=" mr-2"
              type="checkbox"
              name="Winterwear"
              checked={subCategoryValue.Winterwear}
              onChange={(e) =>
                setSubCategoryValue((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.checked,
                }))
              }
            />
            Winterwear
          </label>
        </div>
      </div>
      <div className="flex flex-col flex-1 ">
        <div className="flex flex-row  pl-4 justify-between items-center ">
          <div className={`${searchOpen ? "invisible" : "visible"} `}>
            <Title text1={"ALL"} text2={"COLLECTION"} />
          </div>

          <select
            value={sortPrice}
            onChange={(e) => setSortPrice(e.target.value)}
            className="border border-gray-700 py-1.5 px-3 rounded-lg "
          >
            <option value="relavent">Sort by: Relavent</option>
            <option value="lowhigh">Sort by: Low to High</option>
            <option value="highlow">Sort by: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-4 gap-4 py-4 pl-8">
          {SearchProduct.map((item) => (
            <ProductItems
              key={item._id}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
