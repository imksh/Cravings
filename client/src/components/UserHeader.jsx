import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import { motion, AnimatePresence } from "motion/react";
import transparentLogo from "../assets/images/transparentLogo.png";
import { Link, useNavigate } from "react-router-dom";

const UserHeader = () => {
  const [show, setShow] = useState();
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-0 w-full z-99  min-h-[13dvh] flex flex-col justify-end bg-slate-50">
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4 }}
        className={`z-99 bg-(--primary) text-black font-bold flex flex-col px-4 md:px-16 justify-center w-[90%] md:w-[85%] mx-auto  fixed top-5  left-[50%] -translate-x-[50%] rounded-4xl `}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`flex   justify-between  items-center h-[10dvh] z-99 bg-(--primary) rounded-4xl w-full`}
        >
          <Link to="/">
            <motion.button
              whileTap={{ scale: 0.8 }}
              className="flex items-center gap-2.5 cursor-pointer text-white hover:text-(--accent)"
            >
              <img
                src={transparentLogo}
                alt=""
                className="w-24 object-cover object-center invert-100"
              />
            </motion.button>
          </Link>

          <div className="hidden md:flex list-none gap-3 items-center  my-auto absolute left-[50%] -translate-x-[50%]">
            <Link to="/">
              <motion.button
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.9 }}
                className="cursor-pointer text-white hover:text-(--accent)"
              >
                Home
              </motion.button>
            </Link>

            <Link to="/about">
              <motion.button
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.9 }}
                className="cursor-pointer text-white hover:text-(--accent)"
              >
                About
              </motion.button>
            </Link>
            <Link to="/contact">
              <motion.button
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.9 }}
                className="cursor-pointer text-white hover:text-(--accent)"
              >
                Contact
              </motion.button>
            </Link>
          </div>

          <div className="hidden md:flex list-none gap-3 items-center  my-auto">
            <motion.button
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.9 }}
              className="cursor-pointer text-white hover:text-(--accent)"
              onClick={() => navigate("/login")}
            >
              Login
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.9 }}
              className="cursor-pointer text-white hover:text-(--accent)"
              onClick={() => navigate("/register")}
            >
              Register
            </motion.button>
          </div>

          <div className="flex md:hidden text-white">
            <motion.button
              whileTap={{ scale: 0.8 }}
              onClick={(e) => {
                e.stopPropagation();
                setShow(!show);
              }}
            >
              {show ? (
                <IoCloseSharp size={30} />
              ) : (
                <GiHamburgerMenu size={24} />
              )}
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {show && (
            <motion.div
              className="flex  md:hidden flex-col items-baseline gap-3 mx-4 mb-4"
              exit={{ opacity: 0, y: -100 }}
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link to="/">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setShow(false);
                  }}
                  className="cursor-pointer text-white hover:text-(--accent) w-full flex justify-baseline"
                >
                  Home
                </motion.button>
              </Link>
              <Link to="/home">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setShow(false);
                  }}
                  className="cursor-pointer text-white hover:text-(--accent) w-full flex justify-baseline"
                >
                  Login
                </motion.button>
              </Link>
              <Link to="/about">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setShow(false);
                  }}
                  className="cursor-pointer text-white hover:text-(--accent) w-full flex justify-baseline"
                >
                  About
                </motion.button>
              </Link>
              <Link to="/contact">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setShow(false);
                  }}
                  className="cursor-pointer text-white hover:text-(--accent) w-full flex justify-baseline"
                >
                  Contact
                </motion.button>
              </Link>
              <div className="md:hidden flex  my-2 list-none gap-3 items-center">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.9 }}
                  className="cursor-pointer text-white px-4 py-2 rounded-lg bg-(--secondary) hover:bg-(--accent)"
                  onClick={() => navigate("/login")}
                >
                  Login
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.9 }}
                  className="cursor-pointer text-white px-4 py-2 rounded-lg bg-(--secondary) hover:bg-(--accent)"
                  onClick={() => navigate("/register")}
                >
                  Register
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default UserHeader;
