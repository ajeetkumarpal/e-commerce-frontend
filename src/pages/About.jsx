import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import NewsLetterBox from "../components/NewsLetterBox";

const About = () => {
  return (
    <div className=" pt-10 pb-20">
      <Title text1={"ABOUT"} text2={"US"} />
      <div className="flex flex-row py-12">
        <img className="w-1/3 " src={assets.about_img} alt="not found" />
        <div className="flex flex-col px-12 py-5">
          <p className="my-2">
            Forever was born out of a passion for innovation and a desire to
            revolutionize the way people shop online. Our journey began with a
            simple idea: to provide a platform where customers can easily
            discover, explore, and purchase a wide range of products from the
            comfort of their homes.
          </p>
          <p className="">
            Since our inception, we've worked tirelessly to curate a diverse
            selection of high-quality products that cater to every taste and
            preference. From fashion and beauty to electronics and home
            essentials, we offer an extensive collection sourced from trusted
            brands and suppliers
          </p>
          <p className="font-semibold text-lg text-start mb-2 mt-8">
            Our Mission
          </p>
          <p>
            Our mission at Forever is to empower customers with choice,
            convenience, and confidence. We're dedicated to providing a seamless
            shopping experience that exceeds expectations, from browsing and
            ordering to delivery and beyond.
          </p>
        </div>
      </div>
      <Title text1={"Why"} text2={"Choose Us"} />
      <div className="flex justify-center gap-8 mt-8">
        <div className="flex flex-col border border-gray-400 py-10 w-1/3">
          <p className="font-bold px-16 py-2.5">Quality Assurance:</p>
          <p className="text-sm px-16 pt-1.5 pb-2.5">
            We meticulously select and vet each product to ensure it meets our
            stringent quality standards.
          </p>
        </div>
        <div className="flex flex-col border border-gray-400 py-10 w-1/3">
          <p className="font-bold px-16 py-2.5">Convenience:</p>
          <p className="text-sm px-16 pt-1.5 pb-2.5">
            With our user-friendly interface and hassle-free ordering process,
            shopping has never been easier.
          </p>
        </div>
        <div className="flex flex-col border border-gray-400 py-10 w-1/3">
          <p className="font-bold px-16 py-2.5">
            Exceptional Customer Service:
          </p>
          <p className="text-sm px-16 pt-1.5 pb-2.5">
            Our team of dedicated professionals is here to assist you the way,
            ensuring your satisfaction is our top priority.
          </p>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  );
};

export default About;
