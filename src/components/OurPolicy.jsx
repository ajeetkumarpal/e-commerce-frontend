import React from "react";
import { assets } from "../assets/frontend_assets/assets";
const ourPolicy = () => {
  return (
    <div className="flex justify-around items-center py-4">
      <div className="flex flex-col justify-center items-center px-4 py-2">
        <img className="h-16 w-16" src={assets.exchange_icon} alt="" />
        <h3 className="text-center font-semibold">Easy Exchange Policy</h3>
        <p className="text-center">We offer hassle free exchange policy</p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <img className="h-16 w-16" src={assets.quality_icon} alt="" />
        <h3 className="text-center font-semibold"> 7 Days Return Policy</h3>
        <p className="text-center">We offer 7 Days free return policy</p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <img className="h-12 w-12" src={assets.support_img} alt="" />
        <h3 className="text-center font-semibold">Best Customers Policy</h3>
        <p className="text-center">We provide 24/7 Customers support</p>
      </div>
    </div>
  );
};

export default ourPolicy;
