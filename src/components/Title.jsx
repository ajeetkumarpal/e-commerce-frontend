import React from "react";

const Title = ({ text1, text2, className = "" }) => {
  return (
    <div className={`flex justify-center items-center px-2 gap-3 ${className}`}>
      <p className="text-gray-700 mx-2 text-2xl py-1 ">
        {text1}
        <span className="text-gray-900 mx-2 font-semibold">{text2}</span>
      </p>
      <p className="w-24 h-1 bg-gray-700 border rounded-full "></p>
    </div>
  );
};

export default Title;
