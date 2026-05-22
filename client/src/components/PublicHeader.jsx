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
      className={`fixed top-0 left-0 w-full z-99 min-h-[13dvh] flex flex-col justify-end   header-gradient transition-transform duration-300 ease-in-out ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {size.width > 500 && (
        <div
          className={`w-fit absolute -top-2.5 left-[8.5vw] ${
            size.width > 500 ? "ride-x" : "ride-phone-x"
          } `}
          aria-hidden
        >
          <React.Suspense fallback={null}>
            <LottieLazy
              animationData={rider}
              className="w-10 hover:scale-110 duration-100"
              loop
              autoplay
            />
          </React.Suspense>
        </div>
      )}
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4 }}
        className={`z-99 bg-(--primary) text-black font-bold flex flex-col px-4 md:px-16 justify-center w-[90%] md:w-[85%] mx-auto  fixed top-5  left-[50%] -translate-x-[50%] rounded-4xl `}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`flex   justify-between  items-center h-[10dvh] z-99 bg-(--primary) rounded-4xl w-full`}
        >
          <Link to="/" aria-label="Cravings home">
            <motion.button
              whileTap={{ scale: 0.8 }}
              className="flex items-center gap-2.5 cursor-pointer text-white hover:text-(--accent)"
            >
              <img
                src={transparentLogo}
                alt="Cravings logo"
                className="w-24 object-cover object-center invert-100"
              />
            </motion.button>
          </Link>

          <div className="hidden md:flex list-none gap-3 items-center  my-auto absolute left-[50%] -translate-x-[50%]">
            <Link to="/">
              <motion.button
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.9 }}
                className={`cursor-pointer  hover:text-(--accent) ${
                  location === "/" ? "text-(--secondary)" : "text-white"
                }`}
              >
                Home
              </motion.button>
            </Link>

            <Link to="/about">
              <motion.button
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.9 }}
                className={`cursor-pointer  hover:text-(--accent) ${
                  location === "/about" ? "text-(--secondary)" : "text-white"
                }`}
              >
                About
              </motion.button>
            </Link>
            <Link to="/contact">
              <motion.button
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.9 }}
                className={`cursor-pointer hover:text-(--accent) ${
                  location === "/contact" ? "text-(--secondary)" : "text-white"
                }`}
              >
                Contact
              </motion.button>
            </Link>
          </div>

          <div className="hidden md:flex list-none gap-3 items-center  my-auto">
            <motion.button
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.9 }}
              className={`cursor-pointer  hover:text-(--accent) ${
                location === "/login" ? "text-(--secondary)" : "text-white"
              }`}
              onClick={() => navigate("/login")}
            >
              Login
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.9 }}
              className={`cursor-pointer  hover:text-(--accent) ${
                location === "/register" ? "text-(--secondary)" : "text-white"
              }`}
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
                setShowHeaderMenu(!showHeaderMenu);
              }}
              aria-label={showHeaderMenu ? "Close menu" : "Open menu"}
              aria-expanded={showHeaderMenu}
              aria-controls="public-header-menu"
            >
              {showHeaderMenu ? (
                <IoCloseSharp size={30} />
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
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setShowHeaderMenu(false);
                  navigate("/");
                }}
                ref={firstMenuItemRef}
                tabIndex={0}
                role="menuitem"
                className={`cursor-pointer hover:text-(--accent) w-full flex justify-baseline ${
                  location === "/" ? "text-(--secondary)" : "text-white"
                }`}
              >
                Home
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setShowHeaderMenu(false);
                  navigate("/about");
                }}
                role="menuitem"
                className={`cursor-pointer  hover:text-(--accent) w-full flex justify-baseline ${
                  location === "/about" ? "text-(--secondary)" : "text-white"
                }`}
              >
                About
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setShowHeaderMenu(false);
                  navigate("/contact");
                }}
                role="menuitem"
                className={`cursor-pointer hover:text-(--accent) w-full flex justify-baseline ${
                  location === "/contact" ? "text-(--secondary)" : "text-white"
                }`}
              >
                Contact
              </motion.button>

              <div className="md:hidden flex  my-2 list-none gap-3 items-center">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.9 }}
                  className="cursor-pointer text-white px-4 py-2 rounded-lg bg-(--secondary) hover:bg-(--accent)"
                  onClick={() => {
                    navigate("/login");
                    setShowHeaderMenu(false);
                  }}
                >
                  Login
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.9 }}
                  className="cursor-pointer text-white px-4 py-2 rounded-lg bg-(--secondary) hover:bg-(--accent)"
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
