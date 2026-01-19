import React from "react";
import logo from "../assets/images/transparentLogo.png";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import rider from "../assets/animations/rider.json";
import Lottie from "lottie-react";

const PhoneTopBar = () => {
  const navigate = useNavigate();
  const location = useLocation().pathname;

  if (location === "/user-dashboard") return null;
  return (
    <div className="z-99 bg-(--primary) h-[10dvh]  w-full px-4 flex items-center relative">
      <img
        src={logo}
        alt="Cravings"
        className="w-24 object-cover object-center invert-100"
      />
      <motion.div className={`w-fit absolute -bottom-2 -left-2 ride-full-x  z-99`}>
        <Lottie animationData={rider} className="w-10" />
      </motion.div>
    </div>
  );
};

export default PhoneTopBar;
