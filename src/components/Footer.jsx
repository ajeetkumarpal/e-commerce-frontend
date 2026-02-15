import React from "react";
import { assets } from "../assets/admin_assets/assets";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <div className="flex justify-between items-start">
        <div className="flex justify-around items-center">
          <div className="flex flex-col mx-22 items-center text-center">
            <p className="text-center border min-w-40 rounded-full bg-cyan-950 text-white px-4 py-2 font-semibold">
              COMPANY
            </p>
            <ul>
              <li>About Us</li>
              <li>Careers</li>
              <li>Invester Relation</li>
              <li>Gift Vauchers</li>
              <li>Communities Initiatives</li>
            </ul>
          </div>
          <div className="flex flex-col mx-22 items-center text-center">
            <p className="text-center border min-w-40 rounded-full bg-cyan-950 text-white px-4 py-2 font-semibold">
              MORE INFO.
            </p>
            <ul>
              <li>T&C</li>
              <li>Privacy Policy</li>
              <li>Sitemap</li>
              <li>Get Notified</li>
              <li>Blogs</li>
            </ul>
          </div>
          <div className="flex flex-col mx-22 items-center text-center">
            <p className="text-center border min-w-40 rounded-full bg-cyan-950 text-white px-4 py-2 font-semibold">
              {" "}
              STORE NEAR ME
            </p>
            <ul>
              <li>Mumbai</li>
              <li>Pune</li>
              <li>Patna</li>
              <li>Kolkatta</li>
              <li>Bangalore</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col">
          <p className="text-center border min-w-40 rounded-full bg-cyan-950 text-white px-4 py-2 font-semibold">
            PARTNERS
          </p>
          <div className="flex flex-col py-2">
            <img
              className="h-28 w-40 border rounded-full"
              src={assets.partner1}
              alt=""
            />
            <p className="text-gray-800 font-semibold text-center">
              Business Partners
            </p>
          </div>
          <div className="flex flex-col">
            <img
              className="h-28 w-40 border rounded-full"
              src={assets.partner2}
              alt=""
            />
            <p className="text-gray-800 font-semibold text-center">
              Official Partners
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-row relative -top-24 pl-16">
        <span className="text-gray-800 mx-3">Follow Us:</span>
        <a href="https://facebook.com/">
          <FaFacebook className="h-8 w-8 p-1 mx-0.5 border rounded-full hover:-mt-1" />
        </a>
        <a href="https://twitter.com/">
          {" "}
          <FaXTwitter className="h-8 w-8 p-1 mx-0.5 border rounded-full hover:-mt-1" />
        </a>
        <a href="https://youtube.com/">
          <FaYoutube className="h-8 w-8 p-1 mx-0.5 border rounded-full hover:-mt-1" />
        </a>
        <a href="https://telegram.com/">
          {" "}
          <FaTelegram className="h-8 w-8 p-1 mx-0.5 border rounded-full hover:-mt-1" />
        </a>
      </div>

      <div className="border pl-8 py-2 rounded-xs bg-gray-700 text-white">
        <details>
          <summary className="font-semibold text-white py-2">
            “Why Shop With Us”
          </summary>
          We offer trusted products, secure payments, smooth ordering, and
          reliable delivery. With customer-first service and responsive support,
          we make online shopping simple, safe, and enjoyable every time.
        </details>
      </div>
      <div className="flex flex-row justify-between items-center  rounded-sm bg-gray-50 px-4 py-2 my-4">
        <p>100% Secure Payment:</p>
        <img
          className="h-16 w-16 border rounded-full"
          src={assets.phonepay}
          alt=""
        />
        <img
          className="h-16 w-16 border rounded-full"
          src={assets.amazonpay}
          alt=""
        />
        <img
          className="h-16 w-16 border rounded-full"
          src={assets.gpay}
          alt=""
        />
        <img
          className="h-16 w-16 border rounded-full"
          src={assets.mobikwik}
          alt=""
        />
        <img
          className="h-16 w-16 border rounded-full"
          src={assets.paytm}
          alt=""
        />
        <img
          className="h-16 w-16 border rounded-full mr-4"
          src={assets.cashdelivery}
          alt=""
        />

        <p>Shipping Partners:</p>
        <img className="h-16 w-24 " src={assets.bluedart} alt="" />
        <img className="h-16 w-20 " src={assets.delivery} alt="" />
        <img className="h-16 w-20 " src={assets.ecomexpress} alt="" />
        <img className="h-16 w-28 " src={assets.shadowfox} alt="" />
      </div>
      <p className="text-center font-bold my-4">
        © 2026 YourStoreName. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
