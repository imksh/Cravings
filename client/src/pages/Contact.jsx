import React, { useState } from "react";
import { toast } from "react-hot-toast";
import Lottie from "lottie-react";
import celebrate from "../assets/animations/celebrate.json";
import api from "../config/Api";
import transparentLogo from "../assets/images/transparentLogo.png";
import { motion } from "motion/react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((item) => ({ ...item, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await api.post("/public/new-contact", data);

      toast.success("We have recieved your message");
      handleReset(e);
      setShowAnimation(true);
    } catch (error) {
      console.log("Error in login: ", error);
      toast.error(error?.response?.data?.message || "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    setData({
      fullName: "",
      email: "",
      phone: "",
      message: "",
    });

    setShowAnimation(false);
  };

  return (
    <div className="flex flex-col  items-center justify-center h-full min-h-[90dvh]  w-full py-8 hide-scrollbar">
      <img src={transparentLogo} className="w-30" />
      <p className="my-5"></p>
      <form
        className="w-[90%] md:w-[40%] px-4 py-8 md:px-16 rounded-2xl flex flex-col gap-2 shadow-2xl bg-white"
        onSubmit={(e) => handleSubmit(e)}
        onReset={(e) => handleReset(e)}
      >
        <h2 className="text-center font-bold my-2 text-xl md:text-3xl text-(--color-primary)">
          Contact
        </h2>

        <div className="w-full flex flex-col mt-4 gap-4">
          <div className="w-full  flex flex-col">
            <input
              type="text"
              name="fullName"
              id="fullName"
              value={data.fullName}
              onChange={(e) => handleChange(e)}
              className="border p-4  rounded-xl border-gray-300 disabled:bg-gray-200 disabled:cursor-not-allowed   w-full"
              required
              disabled={isLoading}
              placeholder="Full Name"
            />
          </div>
          <div className="w-full  flex flex-col">
            <input
              type="email"
              name="email"
              id="email"
              value={data.email}
              onChange={(e) => handleChange(e)}
              className="border p-4  rounded-xl border-gray-300 disabled:bg-gray-200 disabled:cursor-not-allowed   w-full"
              required
              disabled={isLoading}
              placeholder="Email"
            />
          </div>

          <div className="w-full  flex flex-col">
            <input
              type="tel"
              name="phone"
              id="phone"
              value={data.phone}
              onChange={(e) => handleChange(e)}
              className="border p-4  rounded-xl border-gray-300 disabled:bg-gray-200 disabled:cursor-not-allowed   w-full"
              required
              disabled={isLoading}
              placeholder="Phone Number"
            />
          </div>

          <div className="w-full  flex flex-col">
            <textarea
              name="message"
              id="message"
              value={data.message}
              onChange={(e) => handleChange(e)}
              className="border p-4  rounded-xl border-gray-300 disabled:bg-gray-200 disabled:cursor-not-allowed   w-full"
              required
              disabled={isLoading}
              placeholder="Message"
            />
          </div>
        </div>

        <div className="flex justify-around w-full mt-8 mb-4 gap-4 md:gap-8  pt-4 px-4">
          <motion.button
            className={`w-[50%] py-4 bg-blue-500 hover:bg-blue-700 text-white cursor-pointer  mx-auto rounded-lg hover:scale-105 disabled:scale-100 disabled:bg-gray-400 disabled:cursor-not-allowed items-center justify-center flex `}
            type="submit"
            disabled={isLoading}
          >
            {!isLoading ? (
              "Submit"
            ) : (
              <motion.div
                className="flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              >
                <AiOutlineLoading3Quarters className="w-5 h-5 text-white" />
              </motion.div>
            )}
          </motion.button>
        </div>
      </form>

      {showAnimation && (
        <>
          <Lottie
            animationData={celebrate}
            loop
            className="fixed top-[50%] -translate-y-[50%] left-0 -translate-x-[50%] scale-180"
          />
          <Lottie
            animationData={celebrate}
            loop
            className="fixed top-[50%] -translate-y-[50%] right-0 translate-x-[50%] scale-180"
          />
        </>
      )}
    </div>
  );
};

export default Contact;
