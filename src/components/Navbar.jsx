import React, { useContext, useState, useEffect } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/CreateShopContext";

const Navbar = () => {
  const {
    searchOpen,
    setSearchOpen,
    userLoggedIn,
    setUserLoggedIn,
    setSearchInput,
    cartCount,
  } = useContext(ShopContext);
  const [openMenu, setOpenMenu] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname !== "/collection") {
      setSearchOpen(false);
    }
  }, [location.pathname, setSearchOpen]);

  const handleSearchClick = () => {
    navigate("/collection");
    setSearchOpen(true);
  };
  console.log("user login or not", userLoggedIn, "batao");
  const loggedOutHandler = () => {
    localStorage.removeItem("userName");
    setUserLoggedIn(null);
  };

  let isActiveClass = ({ isActive }) =>
    `relative ${isActive ? "after:w-full" : "after:w-0"} after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-black`;

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-5 bg-white border-b border-b-gray-700">
        <div className="flex flex-row justify-between items-center py-6  md:px-4 max-w-7xl mx-auto">
          <Link to="/">
            <img
              className="relative h-12 w-auto"
              src={assets.logo}
              alt="not available"
            />
          </Link>

          <div className="hidden md:flex gap-7 font-semibold text-lg items-center">
            <NavLink className={isActiveClass} to="/home">
              Home
            </NavLink>
            <NavLink className={isActiveClass} to="/collection">
              Collection
            </NavLink>
            <NavLink className={isActiveClass} to="/about">
              About
            </NavLink>
            <NavLink className={isActiveClass} to="/contact">
              Contact
            </NavLink>
          </div>

          <div className="flex  items-center justify-center">
            <div className="px-2">
              <Link to="/collection">
                <button onClick={handleSearchClick}>
                  <img
                    className={`relative mt-2 h-5 ${searchOpen ? "invisible" : ""}`}
                    src={assets.search_icon}
                    alt="not available"
                  />
                </button>
              </Link>

              {searchOpen && location.pathname === "/collection" && (
                <div className="absolute flex gap-2 top-28 z-50 justify-center items-center left-1/2 transform -translate-x-1/2 w-full px-4">
                  <input
                    type="search"
                    placeholder="Search Here..."
                    className="h-12 w-full max-w-2xl border rounded-full px-4 mb-4"
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                  <button onClick={() => setSearchOpen(false)}>
                    <img src={assets.cross_icon} alt="" className="h-5 -mt-4" />
                  </button>
                </div>
              )}
            </div>
            <div
              onClick={() => loggedOutHandler()}
              className="cursor-pointer mx-2 flex flex-row items-center justify-center"
            >
              <p className="py-1 pl-4 pr-0.5 font-semibold border-0  rounded-full  text-gray-600">
                {userLoggedIn}
              </p>
              {!userLoggedIn && (
                <Link
                  to="/login"
                  className="flex border border-gray-400 items-center rounded-lg"
                >
                  <p className="py-1 pl-4 pr-0.5 font-semibold border-0  rounded-full  text-gray-600">
                    Login
                  </p>
                  <img
                    className="h-5 mx-2"
                    src={assets.profile_icon}
                    alt="not available"
                  />
                </Link>
              )}
            </div>

            <div className="relative mx-2">
              <Link to="/cart">
                <img
                  className="h-5"
                  src={assets.cart_icon}
                  alt="not available"
                />
                <p className="absolute top-2 text-xs left-2 bg-gray-900 border rounded-full text-white h-5 w-5 p-0.5 font-semibold text-center">
                  {cartCount}
                </p>
              </Link>
            </div>

            <Link
              to="/order"
              className="px-4 mx-2 text-white text-xs border border-gray-800 bg-gray-600 py-2 rounded-sm font-extrabold"
            >
              Order
            </Link>

            {!openMenu && (
              <button onClick={() => setOpenMenu(true)}>
                <img className="md:hidden h-6" src={assets.menu_icon} alt="" />
              </button>
            )}
          </div>

          {/* Mobile Menu */}
          {openMenu && (
            <div>
              <button
                onClick={() => setOpenMenu(false)}
                className="flex flex-row md:hidden justify-center items-center bg-gray-500 h-8"
              >
                <img className="h-6" src={assets.dropdown_icon} alt="" />
                <span className="text-white font-semibold mx-2">Back</span>
              </button>

              <div className="absolute flex md:hidden flex-col mt-2 top-[10vh] left-0 w-full z-50 bg-white px-6">
                <NavLink
                  onClick={() => setOpenMenu(false)}
                  className="border border-b-gray-600 bg-gray-100 px-2 py-2 hover:bg-amber-300"
                  to="/home"
                >
                  Home
                </NavLink>
                <NavLink
                  onClick={() => setOpenMenu(false)}
                  className="border border-b-gray-600 bg-gray-100 px-2 py-2 hover:bg-amber-300"
                  to="/collection"
                >
                  Collection
                </NavLink>
                <NavLink
                  onClick={() => setOpenMenu(false)}
                  className="border border-b-gray-600 bg-gray-100 px-2 py-2 hover:bg-amber-300"
                  to="/about"
                >
                  About
                </NavLink>
                <NavLink
                  onClick={() => setOpenMenu(false)}
                  className="border border-b-gray-600 bg-gray-100 px-2 py-2 hover:bg-amber-300"
                  to="/contact"
                >
                  Contact
                </NavLink>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="h-20 md:h-24"></div>
    </>
  );
};

export default Navbar;
