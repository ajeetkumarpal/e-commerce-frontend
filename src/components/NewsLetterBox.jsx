import React, { useState } from "react";
import { toast } from "react-toastify";

const NewsLetterBox = () => {
  const [email, setEmail] = useState("");
  const submitHandler = (e) => {
    toast.success("subscribe success!");
    e.preventDefault();
    setEmail("");
  };
  return (
    <div className="flex flex-col justify-center items-center py-8">
      <p className="text-xl font-semibold text-center my-3">
        Subscribe now & get 20% off
      </p>
      <p className="text-center text-gray-700">
        Lorem ipsum dolor sit amet consectetur adipisicing. upiditate dolore,
        iure it.
      </p>
      <form
        onSubmit={submitHandler}
        className="flex justify-center my-8 box-border "
      >
        <input
          className="h-12 w-132  border border-black px-2"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          value={email}
          placeholder="Enter your email"
          required
        />
        <button
          className="h-12 w-35 bg-black text-white px-4 py-2 text-sm"
          type="submit"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsLetterBox;
