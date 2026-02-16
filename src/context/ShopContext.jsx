import React, { useState, useEffect } from "react";
import { products as staticProducts } from "../assets/frontend_assets/assets"; // static products
import axios from "axios";
import { toast } from "react-toastify";
import { backendURL } from "../api";
import { ShopContext } from "./CreateShopContext";

const ShopContextProvider = ({ children }) => {
  const currency = "₹";
  const delivery_fee = 10;

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [cartContainer, setCartContainer] = useState(() => {
    const storedCart = sessionStorage.getItem("cartContainer");
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [products, setProducts] = useState([]);
  const [orderData, setOrderData] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(() => {
    const loginUser = localStorage.getItem("userName");
    return loginUser ? loginUser : "";
  });

  const fetchAllProducts = async () => {
    try {
      const response = await axios.get(
        `${backendURL}/api/product/list`
      );
      const backendProducts = response.data.data;

      if (!Array.isArray(backendProducts)) {
        setProducts(staticProducts);
        return;
      }

      const merged = [
        ...staticProducts,
        ...backendProducts.filter(
          (bp) => !staticProducts.some((sp) => sp._id === bp._id),
        ),
      ];

      setProducts(merged);
    } catch (error) {
      console.error(
        "Error fetching products, fallback to static:",
        error.response || error,
      );
      setProducts(staticProducts);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const ADDTOCART = (id, size) => {
    const productData = products.find((item) => item._id === id);
    if (!productData) return;
    if (!size) {
      toast.error("Please select a size");
      return;
    }

    setCartContainer((prev) => {
      const existingItem = prev.find(
        (item) => item.id === id && item.size === size,
      );

      if (existingItem) {
        return prev.map((item) =>
          item.id === id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [
        ...prev,
        {
          id: id,
          image: productData.image?.[0] || "",
          name: productData.name,
          price: productData.price,
          size: size,
          quantity: 1,
          addedAt: new Date().getTime(),
        },
      ];
    });
  };

  const cartCount = cartContainer.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const cartDataForBackend = cartContainer.map((cart) => ({
    cartDataId: cart.id,
    quantity: cart.quantity,
    size: cart.size,
    name: cart.name,
    price: cart.price,
  }));

  useEffect(() => {
    sessionStorage.setItem("cartContainer", JSON.stringify(cartContainer));
  }, [cartContainer]);

  const value = {
    products,
    currency,
    delivery_fee,
    searchOpen,
    setSearchOpen,
    searchInput,
    setSearchInput,
    cartContainer,
    setCartContainer,
    ADDTOCART,
    cartCount,
    cartDataForBackend,
    orderData,
    setOrderData,
    userLoggedIn,
    setUserLoggedIn,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
