import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/transparentLogo.png";
import { motion } from "motion/react";
import infinity from "../assets/animations/infinity.json";
import Lottie from "lottie-react";

const PublicFooter = ({ rounded = true }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ y: [50, 0], opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={`flex flex-col pt-16 bg-gray-50 ${rounded ? "rounded-t-[3rem]" : ""} px-8 sm:px-16 pb-8 border-t border-gray-200`}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-gray-200 pb-12">
        <div className="col-span-1 md:col-span-1 flex flex-col items-center sm:items-start">
          <img src={logo} alt="logo" className="w-32 mb-6" />
          <p className="text-gray-500 text-sm text-center sm:text-left leading-relaxed">
            Your favorite food, delivered fast and fresh. Experience the best
            culinary delights from top restaurants around you.
          </p>
        </div>

        <div className="flex flex-col items-center sm:items-start gap-4">
          <h3 className="font-bold text-gray-900 text-lg">Quick Links</h3>
          <Link
            to="/#services"
            className="text-gray-500 hover:text-orange-500 transition-colors"
          >
            <motion.span whileHover={{ x: 5 }} className="block">
              Services
            </motion.span>
          </Link>
          <Link
            to="/#menu"
            className="text-gray-500 hover:text-orange-500 transition-colors"
          >
            <motion.span whileHover={{ x: 5 }} className="block">
              Menu
            </motion.span>
          </Link>
          <Link
            to="/#testimonials"
            className="text-gray-500 hover:text-orange-500 transition-colors"
          >
            <motion.span whileHover={{ x: 5 }} className="block">
              Testimonials
            </motion.span>
          </Link>
        </div>

        <div className="flex flex-col items-center sm:items-start gap-4">
          <h3 className="font-bold text-gray-900 text-lg">Company</h3>
          <Link
            to="/about"
            className="text-gray-500 hover:text-orange-500 transition-colors"
          >
            <motion.span whileHover={{ x: 5 }} className="block">
              About Us
            </motion.span>
          </Link>
          <Link
            to="/contact"
            className="text-gray-500 hover:text-orange-500 transition-colors"
          >
            <motion.span whileHover={{ x: 5 }} className="block">
              Contact
            </motion.span>
          </Link>
          <Link
            to="/promo"
            className="text-gray-500 hover:text-orange-500 transition-colors"
          >
            <motion.span whileHover={{ x: 5 }} className="block">
              Promo
            </motion.span>
          </Link>
        </div>

        <div className="flex flex-col items-center sm:items-start gap-4">
          <h3 className="font-bold text-gray-900 text-lg">Legal</h3>
          <Link
            to="/terms"
            className="text-gray-500 hover:text-orange-500 transition-colors"
          >
            <motion.span whileHover={{ x: 5 }} className="block">
              Terms of Service
            </motion.span>
          </Link>
          <Link
            to="/privacy"
            className="text-gray-500 hover:text-orange-500 transition-colors"
          >
            <motion.span whileHover={{ x: 5 }} className="block">
              Privacy Policy
            </motion.span>
          </Link>
          <Link
            to="/cookie"
            className="text-gray-500 hover:text-orange-500 transition-colors"
          >
            <motion.span whileHover={{ x: 5 }} className="block">
              Cookie Policy
            </motion.span>
          </Link>
        </div>
      </div>

      <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-gray-500 text-sm">
          ©️ 2026 Cravings. All Rights Reserved
        </p>
        <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
          <p>An IdioticMinds Company</p>
          <Lottie animationData={infinity} loop className="w-8" />
        </div>
      </div>
    </motion.div>
  );
};

export default PublicFooter;
