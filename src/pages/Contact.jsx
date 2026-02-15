import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import NewsLetterBox from "../components/NewsLetterBox";

const Contact = () => {
  return (
    <div className="py-8">
      <Title text1={"CONTACT"} text2={"US"} />
      <div className="flex flex-row py-6 justify-center">
        <img className="w-2/5" src={assets.contact_img} alt="not found" />
        <div className="flex flex-col px-20 py-12 ">
          <p className="font-bold text-lg my-5">Our Store</p>
          <p>54709 Willms Station</p>
          <p className="mb-4">Suite 350, Washington, USA</p>
          <p>Tel: (415) 555-0132</p>
          <p>Email: admin@forever.com</p>
          <p className="font-bold text-lg mb-5 mt-10">Careers at Forever</p>
          <p className="mb-4">Learn more about our teams and job openings.</p>
          <button className="h-14 w-36 py-2 hover:bg-gray-950 text-white bg-gray-700 border border-gray-950">
            Explore Jobs
          </button>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  );
};

export default Contact;
