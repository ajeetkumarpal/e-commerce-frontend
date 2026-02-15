import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/CreateShopContext";
import ImageZoom from "../components/ImageZoom";
import { VscStarEmpty } from "react-icons/vsc";
import RelatedProduct from "../components/RelatedProduct";
import { Link } from "react-router-dom";

const Product = () => {
  const { id } = useParams();
  const { products, currency, ADDTOCART } = useContext(ShopContext);
  const [valueSize, setValueSize] = useState("");
  const [showImage, setShowImage] = useState("");

  useEffect(() => {
    setShowImage("");
  }, [id]);

  const [noOfRating, setNoOfRating] = useState("");
  let arr = [1, 2, 3, 4, 5];

  const itemOfProduct = products.find((item) => item._id === id);

  if (!itemOfProduct) {
    return <div>Not found</div>;
  }

  return (
    <div className="flex flex-col  py-12">
      <div className="flex flex-row pb-20">
        <div className="flex flex-row  items-start ">
          <div className="flex gap-2 flex-col w-32 ">
            {itemOfProduct.image.map((item, idx) => (
              <div
                onClick={() => setShowImage(item)}
                key={idx}
                className="border border-gray-500"
              >
                <img
                  className="h-30  w-full object-cover cursor-pointer"
                  src={item || showImage}
                  alt=""
                />
              </div>
            ))}
          </div>
          <div className=" ml-3 border border-gray-500">
            <ImageZoom src={showImage || itemOfProduct.image[0]} />
          </div>
        </div>
        <div className="ml-16">
          <p className="text-3xl font-semibold my-2 ">{itemOfProduct.name}</p>
          <div className="flex mt-3 mb-5 ">
            {arr.map((rate) => (
              <button key={rate} onClick={() => setNoOfRating(rate)}>
                <VscStarEmpty
                  className={`h-6 w-6 ${noOfRating >= rate ? "text-red-500" : "text-black"}`}
                />
              </button>
            ))}
          </div>

          <p className="text-2xl font-semibold py-2">
            {currency}
            {itemOfProduct.price}
          </p>
          <p className="text-gray-900 pr-20 py-2">
            {itemOfProduct.description}
          </p>

          <p className="font-medium my-2">Select Size:</p>
          <div>
            {itemOfProduct.sizes.map((size, idx) => (
              <button
                className={`h-10 min-w-12 focus:bg-gray-300 mr-2  bg-gray-100 
}`}
                key={idx}
                onClick={() => {
                  setValueSize(size);
                }}
              >
                {size}
              </button>
            ))}
          </div>
          <button
            onClick={() => {
              ADDTOCART(id, valueSize);
            }}
            className="h-11 w-40 bg-gray-800 text-white my-6 focus:bg-gray-400 "
          >
            ADD TO CART
          </button>
          <Link to="/placeorder">
            {" "}
            <button className="h-11 w-40 bg-gray-800 text-white my-6 focus:bg-gray-400 ">
              Buy
            </button>
          </Link>
          <hr className="w-3/4 text-gray-400 my-5" />
          <p className="py-0.5">100% Original product.</p>
          <p className="py-0.5">
            Cash on delivery is available on this product.
          </p>
          <p className="py-0.5">
            Easy return and exchange policy within 7 days.
          </p>
        </div>
      </div>
      <div>
        <div className="flex flex-col">
          <div className="flex  ">
            <b className="border border-gray-300 h-11 w-28 text-sm text-center pt-2">
              Description
            </b>
            <p className="border border-gray-300 h-11 w-32 text-sm font-medium text-center pt-2">
              Reviews(122)
            </p>
          </div>
          <div className="flex flex-col border px-6 py-6 text-sm border-gray-300">
            <p className="mb-4 text-gray-500">
              An e-commerce website is an online platform that facilitates the
              buying and selling of products or services over the internet. It
              serves as a virtual marketplace where businesses and individuals
              can showcase their products, interact with customers, and conduct
              transactions without the need for a physical presence. E-commerce
              websites have gained immense popularity due to their convenience,
              accessibility, and the global reach they offer.
            </p>
            <p className="text-gray-500">
              E-commerce websites typically display products or services along
              with detailed descriptions, images, prices, and any available
              variations (e.g., sizes, colors). Each product usually has its own
              dedicated page with relevant information.
            </p>
          </div>
        </div>
      </div>
      <div>
        <RelatedProduct
          category={itemOfProduct.category}
          subCategory={itemOfProduct.subCategory}
          id={id}
        />
      </div>
    </div>
  );
};

export default Product;
