import React, { useContext, useState } from "react";
import loginApi from "../services/login";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/CreateShopContext";

const Login = () => {
  const navigate = useNavigate();
  const [statusForm, setStatusForm] = useState("register");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserLoggedIn } = useContext(ShopContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    const result = await loginApi(formData, statusForm);
    console.log(result.data.message);
    if (result.data.success) {
      setStatusForm("login");
      if (statusForm === "login") {
        localStorage.setItem("userName", `${result.data.name} !`);
        setUserLoggedIn(`${result.data.name} !`);

        navigate("/");
      }
      toast.success(result.data.message);
    } else {
      toast.error(result.data.message);
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-col w-2/5 my-16 mx-auto"
    >
      <p className="text-3xl my-4 font-semibold text-center">
        {statusForm === "register" ? "register" : "login"}
      </p>
      {statusForm === "register" && (
        <input
          type="text"
          name="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="Name"
          className="my-1.5 py-1.5 rounded-xs px-4 border border-gray-400"
        />
      )}
      <input
        type="email"
        name="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        placeholder="email"
        className=" my-1.5 py-1.5 rounded-xs px-4 border border-gray-400"
      />
      <input
        type="password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        placeholder="Password"
        className="mt-1.5   py-1.5 rounded-xs px-4 border border-gray-400"
      />
      <div className="flex justify-between items-center my-0.5">
        <p className="text-sm">Forgot your password?</p>
        <button
          type="button"
          onClick={() =>
            setStatusForm(`${statusForm === "register" ? "login" : "register"}`)
          }
          className="text-sm"
        >
          {statusForm === "register" ? "login" : "create your account"} Here
        </button>
      </div>
      <button className="h-12  my-8 w-32 hover:bg-black bg-gray-600 text-center text-white font-semibold">
        {statusForm === "register" ? "register" : "login"}
      </button>
    </form>
  );
};

export default Login;
