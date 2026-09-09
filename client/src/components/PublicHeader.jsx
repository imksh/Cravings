import React, { useState, useEffect, useRef, memo } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import { motion, AnimatePresence } from "motion/react";
import transparentLogo from "../assets/images/transparentLogo.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import rider from "../assets/animations/rider.json";
const LottieLazy = React.lazy(() => import("lottie-react"));
import useWindowSize from "../hooks/useWindowSize";
import useUiStore from "../store/useUiStore";

const PublicHeader = () => {
  const { showHeaderMenu, setShowHeaderMenu } = useUiStore();
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const size = useWindowSize();
  const menuRef = useRef(null);
  const firstMenuItemRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY || 0;

      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setShowHeaderMenu(false);
        setShowHeader(false);
      } else if (currentScrollY < lastScrollY.current) {
        setShowHeader(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setShowHeaderMenu]);

  // keyboard accessibility: close on Escape and focus management
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setShowHeaderMenu(false);
    };

    if (showHeaderMenu) {
      document.addEventListener("keydown", onKey);
      setTimeout(() => firstMenuItemRef.current?.focus(), 50);
    }

    return () => document.removeEventListener("keydown", onKey);
  }, [showHeaderMenu, setShowHeaderMenu]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className={`fixed top-2 left-0 w-full z-99 flex flex-col justify-center pt-4 pb-2 transition-transform duration-300 ease-in-out ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {size.width > 500 && (
        <div
          className={`w-fit absolute -top-5 left-[8.5vw] ${
            size.width > 500 ? "ride-x" : "ride-phone-x"
          } `}
          aria-hidden
        >
          <React.Suspense fallback={null}>
            <LottieLazy
              animationData={rider}
              className="w-12 hover:scale-110 duration-100"
              loop
              autoplay
            />
          </React.Suspense>
        </div>
      )}
      <motion.div
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.3 }}
        className={`z-99 bg-white/70 backdrop-blur-md border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-gray-800 font-bold flex flex-col px-4 md:px-8 justify-center w-[95%] max-w-[1200px] mx-auto rounded-3xl`}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`flex justify-between items-center h-[70px] md:h-[80px] z-99 rounded-3xl w-full`}
        >
          <Link to="/" aria-label="Cravings home">
            <motion.button
              whileTap={{ scale: 0.8 }}
              className="flex items-center gap-2.5 cursor-pointer text-white hover:text-(--accent)"
            >
              <img
                src={transparentLogo}
                alt="Cravings logo"
                className="w-24 object-contain"
              />
            </motion.button>
          </Link>

          <div className="hidden md:flex list-none gap-6 items-center absolute left-[50%] -translate-x-[50%]">
            <Link to="/">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className={`cursor-pointer transition-colors ${
                  location === "/" ? "text-orange-600" : "text-gray-700 hover:text-orange-500"
                }`}
              >
                Home
              </motion.button>
            </Link>

            <Link to="/about">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className={`cursor-pointer transition-colors ${
                  location === "/about" ? "text-orange-600" : "text-gray-700 hover:text-orange-500"
                }`}
              >
                About
              </motion.button>
            </Link>
            <Link to="/contact">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className={`cursor-pointer transition-colors ${
                  location === "/contact" ? "text-orange-600" : "text-gray-700 hover:text-orange-500"
                }`}
              >
                Contact
              </motion.button>
            </Link>
          </div>

          <div className="hidden md:flex list-none gap-4 items-center">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className={`cursor-pointer font-semibold transition-colors ${
                location === "/login" ? "text-orange-600" : "text-gray-700 hover:text-orange-500"
              }`}
              onClick={() => navigate("/login")}
            >
              Login
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors shadow-md shadow-orange-500/20"
              onClick={() => navigate("/register")}
            >
              Register
            </motion.button>
          </div>

          <div className="flex md:hidden text-gray-800">
            <motion.button
              whileTap={{ scale: 0.8 }}
              onClick={(e) => {
                e.stopPropagation();
                setShowHeaderMenu(!showHeaderMenu);
              }}
              aria-label={showHeaderMenu ? "Close menu" : "Open menu"}
              aria-expanded={showHeaderMenu}
              aria-controls="public-header-menu"
              className="p-2"
            >
              {showHeaderMenu ? (
                <IoCloseSharp size={28} />
              ) : (
                <GiHamburgerMenu size={24} />
              )}
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {showHeaderMenu && (
            <motion.nav
              id="public-header-menu"
              ref={menuRef}
              className="flex  md:hidden flex-col items-baseline gap-3 mx-4 mb-4"
              role="menu"
              exit={{ opacity: 0, y: -100 }}
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setShowHeaderMenu(false);
                  navigate("/");
                }}
                ref={firstMenuItemRef}
                tabIndex={0}
                role="menuitem"
                className={`cursor-pointer w-full text-left py-2 transition-colors ${
                  location === "/" ? "text-orange-600" : "text-gray-700 hover:text-orange-500"
                }`}
              >
                Home
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setShowHeaderMenu(false);
                  navigate("/about");
                }}
                role="menuitem"
                className={`cursor-pointer w-full text-left py-2 transition-colors ${
                  location === "/about" ? "text-orange-600" : "text-gray-700 hover:text-orange-500"
                }`}
              >
                About
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setShowHeaderMenu(false);
                  navigate("/contact");
                }}
                role="menuitem"
                className={`cursor-pointer w-full text-left py-2 transition-colors ${
                  location === "/contact" ? "text-orange-600" : "text-gray-700 hover:text-orange-500"
                }`}
              >
                Contact
              </motion.button>

              <div className="md:hidden flex flex-col mt-4 gap-3 w-full border-t border-gray-200 pt-4">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer text-gray-800 font-semibold w-full py-3 rounded-xl border border-gray-200 hover:bg-gray-50"
                  onClick={() => {
                    navigate("/login");
                    setShowHeaderMenu(false);
                  }}
                >
                  Login
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer text-white font-semibold w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 shadow-md shadow-orange-500/20"
                  onClick={() => {
                    navigate("/register");
                    setShowHeaderMenu(false);
                  }}
                >
                  Register
                </motion.button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default memo(PublicHeader);
