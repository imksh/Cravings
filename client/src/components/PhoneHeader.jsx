import React from "react";
import { FaHome } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { IoPersonCircleSharp } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { motion } from "motion/react";
import { useNavigate, useLocation } from "react-router-dom";

const PhoneHeader = () => {
  const navigate = useNavigate();
  const location = useLocation().pathname;
  return (
    <div className="fixed bottom-0 h-[10dvh] flex items-center bg-slate-200 shadow-2xl w-full px-2 justify-around ">
      <motion.button
        className={`${location === "/" ? "text-(--primary)" : ""}`}
        onClick={() => navigate("/")}
      >
        <FaHome size={28} />
      </motion.button>
      <motion.button
        className={`${location === "/user-dashboard" ? "text-(--primary)" : ""}`}
        onClick={() => navigate("/user-dashboard")}
      >
        <MdDashboard size={28} />
      </motion.button>
      <motion.button
        className={`${location === "/cart" ? "text-(--primary)" : ""}`}
        onClick={() => navigate("/cart")}
      >
        <FaCartShopping size={28} />
      </motion.button>
      <motion.button
        className={`${location === "/profile" ? "text-(--primary)" : ""}`}
        onClick={() => navigate("/profile")}
      >
        <IoPersonCircleSharp size={28} />
      </motion.button>
    </div>
  );
};

export default PhoneHeader;
