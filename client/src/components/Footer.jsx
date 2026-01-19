import React from "react";
import logo from "../assets/images/transparentLogo.png";
import { motion } from "motion/react";
import infinity from "../assets/animations/infinity.json";
import Lottie from "lottie-react";

const Footer = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ y: [100, 0], opacity: 1 }}
      transition={{ duration: 1 }}
      className="flex flex-col"
    >
      <div className="grid grid-cols-1 gap-2 sm:gap-0 sm:grid-cols-[70%_30%] border-b border-slate-300 py-6 sm:px-4">
        <img src={logo} alt="logo" className="w-20 mx-auto sm:mx-0" />
        <div className="grid grid-cols-2 sm:flex justify-between items-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1 }}
            className="hover:text-(--primary) cursor-pointer"
          >
            Srvices
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1 }}
            className="hidden sm:flex hover:text-(--primary) cursor-pointer"
          >
            Menu
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1 }}
            className="hover:text-(--primary) cursor-pointer"
          >
            Testimonial
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1 }}
            className="hover:text-(--primary) cursor-pointer"
          >
            Promo
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1 }}
            className="hover:text-(--primary) cursor-pointer"
          >
            Contact
          </motion.button>
        </div>
      </div>
      <div className="py-4 px-2 sm:p-4 items-center sm:items-baseline gap-2 sm:gap-0 flex flex-col sm:flex-row justify-between">
        <p>©️ 2026 Cravings. All Rights Reserved</p>
        <div className="flex items-center gap-2">
          <Lottie animationData={infinity} loop className="w-10" />
          <p>An IdioticMinds Company</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Footer;
