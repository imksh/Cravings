import { useState, useEffect, useRef } from "react";
import Lottie from "lottie-react";
import { motion } from "motion/react";
import { FaSearch } from "react-icons/fa";
import { IoCalendarOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";

import PublicFooter from "../components/PublicFooter";

//Lottie
import pizza from "../assets/animations/pizza.json";
import pizzaOpening from "../assets/animations/pizzaOpening.json";
import delivery from "../assets/animations/delivery.json";
import lazy from "../assets/animations/lazy.json";

//images
import heroSm1 from "../assets/images/landing/hero-sm-1.png";
import heroSm2 from "../assets/images/landing/hero-sm-2.png";
import heroSm3 from "../assets/images/landing/hero-sm-3.png";

import howDeliver1 from "../assets/images/landing/how-deliver-1.png";
import howDeliver2 from "../assets/images/landing/how-deliver-2.png";
import howDeliver3 from "../assets/images/landing/how-deliver-3.png";
import Footer from "../components/PublicFooter";
import LandingFood from "../components/LandingFood";
import Testimonials from "../components/Testimonials";
import useWindowSize from "../hooks/useWindowSize";
import { useNavigate } from "react-router-dom";
import api from "../config/api";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Landing = () => {
  const size = useWindowSize();
  const [search, setSearch] = useState("");
  const [curr, setCurr] = useState("");
  const pizzaRef = useRef();
  const [currMenu, setCurrMenu] = useState("");
  const [menuItems, setMenuItems] = useState([]);
  const [menuTabs, setMenuTabs] = useState([]);
  const [isLoadingMenu, setIsLoadingMenu] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await api.get("/public/menu?limit=50");
        if (res.data?.data) {
          const items = res.data.data;
          setMenuItems(items);
          const categories = [...new Set(items.map((i) => i.category))];
          setMenuTabs(categories);
          if (categories.length > 0) setCurrMenu(categories[0]);
        }
      } catch (error) {
        console.error("Error fetching menu:", error);
      } finally {
        setIsLoadingMenu(false);
      }
    };
    fetchMenu();
  }, []);

  useEffect(() => {
    if (!curr) return;
    const timer = setTimeout(() => {
      setCurr("");
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [curr]);

  return (
    <div className="overflow-auto hide-scrollbar bg-gradient">
      <div className="px-[7.5%] gap-8 sm:gap-0  grid grid-cols-1 grid-rows-[1fr_3fr] md:grid-rows-1 sm:grid-cols-2 justify-between items-center min-h-dvh">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.2,
          }}
          className="flex flex-col gap-1 order-2 md:order-1 "
        >
          <div className="flex items-center relative w-fit">
            <h2 className="text-2xl md:text-6xl font-extrabold ">
              If you <span className="text-(--primary)">Lazy</span>,
            </h2>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute right-0 translate-x-full"
            >
              <Lottie animationData={lazy} className="w-32 sm:w-40 " />
            </motion.div>
          </div>
          <h2 className="text-2xl md:text-6xl font-extrabold ">
            Call us Baby.
          </h2>

          <div className="flex items-center relative my-4">
            <div className="absolute p-4 bg-(--primary) text-white rounded-full left-1">
              <motion.div
                animate={
                  curr === "search"
                    ? { x: [5, 0, -5, 0], y: [5, 0, -5, 0], scale: 1.2 }
                    : { x: 0, y: 0 }
                }
                whileTap={{ scale: 0.9 }}
                className=""
              >
                <FaSearch />
              </motion.div>
            </div>
            <input
              type="text"
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Restaurant, Food..."
              className="border border-slate-300 w-full md:w-[60%] p-4 rounded-4xl bg-white  outline-(--primary) pl-16"
              onMouseEnter={() => setCurr("search")}
            />
          </div>
          <div className="flex gap-5 my-4  mx-auto sm:mx-0">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-(--primary) text-white p-4 md:px-10 rounded-xl hover:bg-(--accent) cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Get Started
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="border border-(--primary) p-4 md:px-10 rounded-xl hover:bg-(--secondary) hover:text-white cursor-pointer"
              onClick={() => navigate("/about")}
            >
              About us
            </motion.button>
          </div>
          <div className="flex sm:gap-12 justify-around sm:justify-start">
            <div
              onMouseEnter={() => setCurr("reviews")}
              className="flex flex-col items-center justify-center text-center"
            >
              <motion.img
                animate={
                  curr === "reviews"
                    ? { y: [5, 0, -5, 0], scale: 1.2 }
                    : { x: 0, y: 0 }
                }
                src={heroSm1}
                alt=""
                className="w-8 p-1"
              />
              <p>10K Reviews</p>
              <p>(4.8)</p>
            </div>
            <div
              onMouseEnter={() => setCurr("restro")}
              className="flex flex-col items-center justify-center text-center"
            >
              <motion.img
                animate={
                  curr === "restro"
                    ? { y: [5, 0, -5, 0], scale: 1.2 }
                    : { x: 0, y: 0 }
                }
                src={heroSm2}
                alt=""
                className="w-8"
              />
              <p>200+ </p>
              <p>Restaurants</p>
            </div>
            <div
              onMouseEnter={() => setCurr("food-hero")}
              className="flex flex-col items-center justify-center text-center"
            >
              <motion.img
                animate={
                  curr === "food-hero"
                    ? { y: [5, 0, -5, 0], scale: 1.2 }
                    : { x: 0, y: 0 }
                }
                src={heroSm3}
                alt=""
                className="w-8"
              />
              <p>1000+</p>
              <p>Food Items</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 100, rotateY: size.width > 645 ? 180 : 0 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.2,
          }}
          className="flex items-center sm:justify-baseline justify-center relative  order-1 md:order-2"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative md:absolute -left-8 md:-left-16 translate-y-1/2 md:translate-y-0"
          >
            <Lottie
              animationData={delivery}
              loop
              className="w-80 sm:w-100 md:w-120 lg:w-150"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* How we deliver section */}
      <motion.div
        id="services"
        initial={{ scale: 0.7, opacity: 0.5 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        viewport={{ once: true, amount: 0.2, margin: "-50px" }}
        className="px-[7.5%] flex flex-col justify-center items-center text-center mt-16"
      >
        <h2 className="text-xl sm:text-4xl font-extrabold  max-w-[500px]">
          How we can serve you and Deliver your favorite{" "}
          <span className="text-(--primary)">Food</span>
        </h2>

        <p className=" text-slate-500 mt-4 max-w-[400px]">
          We always provide the best service for you and deliver your favorite
          food to your destination
        </p>
        <div className="grid grid-cols-1 gap-12 sm:flex justify-around w-full mt-16">
          <div
            onMouseEnter={() => setCurr("deliver-1")}
            className="flex flex-col justify-center items-center"
          >
            <motion.img
              initial={{ opacity: 1 }}
              animate={
                curr === "deliver-1"
                  ? { x: [-100, 0], opacity: [0.2, 1, 1] }
                  : { x: 0 }
              }
              transition={{ duration: 1 }}
              src={howDeliver1}
              alt=""
              className="w-60 min-h-60 object-contain"
            />
            <h2 className="font-bold text-lg">Deliver your food</h2>
            <p className="text-[12px] text-slate-500">
              Deliver your best order <br /> to your destination
            </p>
          </div>
          <div
            onMouseEnter={() => setCurr("deliver-2")}
            className="flex flex-col justify-center items-center"
          >
            <motion.img
              initial={{ opacity: 1 }}
              animate={
                curr === "deliver-2"
                  ? { y: [-100, 0], opacity: [0.2, 1, 1] }
                  : { y: 0 }
              }
              transition={{ duration: 1 }}
              src={howDeliver2}
              alt=""
              className="w-60  min-h-60 object-contain"
            />
            <h2 className="font-bold text-lg">Order has arrived</h2>
            <p className="text-[12px] text-slate-500">
              Your best order has arrived <br /> at your destination
            </p>
          </div>
          <div
            onMouseEnter={() => setCurr("deliver-3")}
            className="flex flex-col justify-center items-center"
          >
            <motion.img
              initial={{ opacity: 1 }}
              animate={
                curr === "deliver-3"
                  ? { x: [100, 0], opacity: [0.2, 1, 1] }
                  : { x: 0 }
              }
              transition={{ duration: 1 }}
              src={howDeliver3}
              alt=""
              className="w-60  min-h-60 object-contain"
            />
            <h2 className="font-bold text-lg">Order ready serve</h2>
            <p className="text-[12px] text-slate-500">
              Your order has arrived and <br /> ready to be served well
            </p>
          </div>
        </div>
      </motion.div>

      {/* Pizza Section */}
      <motion.div
        initial={{ scale: 0.6 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        viewport={{
          once: true,
          amount: 0.3,
          margin: size.width > 500 ? "-200px" : "-50px",
        }}
        onViewportEnter={() => {
          const anim = pizzaRef.current;

          if (!anim) return;

          setTimeout(() => {
            anim.play();
          }, 500);

          const totalFrames = anim.getDuration(true);
          const stopFrame = totalFrames * 0.45;

          setTimeout(() => {
            anim.goToAndStop(stopFrame, true);
          }, 2000);
        }}
        className="px-[7.5%] relative mt-36 w-full"
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1, ease: "easeInOut" }}
          viewport={{ once: true }}
          className="absolute -top-15 sm:-top-5 w-full left-0"
        >
          <h2 className="text-2xl sm:text-4xl font-extrabold mt-2 mx-auto w-full text-center ">
            Crafted With <span className="text-(--primary)">Care</span>,
          </h2>
          <h2 className="text-2xl sm:text-4xl font-extrabold mt-2 mx-auto w-full text-center  ">
            Delivered With <span className="text-(--primary)">Love</span>
          </h2>
        </motion.div>
        <Lottie
          animationData={pizzaOpening}
          lottieRef={pizzaRef}
          loop={false}
          autoplay={false}
          className="w-60 sm:w-100 md:w-150 mx-auto"
        />
      </motion.div>

      {/* Menu */}
      <motion.div
        id="menu"
        initial={{ scale: 0.7, opacity: 0.5 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        viewport={{ once: true, amount: 0.2, margin: "-10px" }}
        className="px-[7.5%] my-16 "
      >
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h2 className="text-3xl font-bold ">
            Our Best <span className="text-(--primary)">Menu</span>
          </h2>
          <div className="flex flex-wrap pt-8 md:pt-0 gap-4 sm:gap-6 md:gap-4 lg:gap-8 justify-center md:justify-end">
            {menuTabs.map((item, indx) => (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                key={indx}
                className={`border py-2 px-4 sm:px-8 md:px-4 lg:px-8 rounded-2xl border-slate-300 cursor-pointer  ${
                  item === currMenu
                    ? "bg-black text-white"
                    : "text-gray-400 bg-slate-200"
                }`}
                onClick={() => setCurrMenu(item)}
              >
                {item}
              </motion.button>
            ))}
          </div>
        </div>
        <div className="grid  sm:grid-cols-2 lg:grid-cols-4 gap-24 sm:gap-12 mt-20 p-8">
          {isLoadingMenu ? (
            <div className="col-span-full flex justify-center items-center py-20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                <AiOutlineLoading3Quarters className="w-10 h-10 text-orange-500" />
              </motion.div>
            </div>
          ) : (
            menuItems
              .filter((i) => i.category === currMenu)
              .map((item) => (
                <div key={item._id}>
                  <LandingFood item={item} />
                </div>
              ))
          )}
        </div>
      </motion.div>

      <motion.div
        id="testimonials"
        initial={{ scale: 0.7, opacity: 0.5 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        viewport={{ once: true, amount: 0.2, margin: "-10px" }}
        className="px-[7.5%] my-16 "
      >
        <Testimonials />
      </motion.div>

      <motion.div
        initial={{ scale: 0.7, opacity: 0.5 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        viewport={{ once: true, amount: 0.2, margin: "-10px" }}
        className="mt-16 md:pb-0 bg-(--primary)  pb-0 grid grid-cols-1 sm:grid-cols-2 px-[7.5%]"
      >
        <div className="text-white w-fit order-2 sm:order-1 relative flex justify-between flex-col pt-24">
          <div>
            <h2 className="text-2xl sm:text-4xl">
              Get the Best promos order now before the ran out!
            </h2>
            <p className="text-gray-300 text-[12px] my-2">
              Get the best promos from us just for you and we always provide the
              best service for you. Order no at Cravings
            </p>
          </div>
          <img
            src="/images/roll.png"
            alt=""
            className="w-40 h-40 object-cover object-top mx-auto sm:mx-0 sm:ml-16 "
          />
        </div>
        <div className="flex flex-col gap-4 pt-16 sm:py-28 sm:order-2 order-1">
          <div className="relative flex items-center w-full sm:w-[80%] mx-auto text-white">
            <IoCalendarOutline className="absolute left-4 " size={20} />
            <input
              type="date"
              placeholder="Date"
              className=" border border-white/20 outline-(--primary) rounded-4xl placeholder:text-white bg-white/10 p-3 w-full pl-12 "
            />
          </div>
          <div className="relative flex items-center w-full sm:w-[80%] mx-auto text-white">
            <IoPersonOutline className="absolute left-4 " size={20} />
            <input
              type="text"
              placeholder="Name"
              className=" border border-white/20 outline-(--primary) rounded-4xl placeholder:text-white bg-white/10 p-3 w-full pl-12 "
            />
          </div>
          <div className="relative flex items-center w-full sm:w-[80%] mx-auto text-white">
            <MdOutlineEmail className="absolute left-4 " size={20} />
            <input
              type="text"
              placeholder="Name"
              className=" border border-white/20 outline-(--primary) rounded-4xl placeholder:text-white bg-white/10 p-3 w-full pl-12 "
            />
          </div>
          <div className="relative flex items-center w-full sm:w-[80%] mx-auto text-white">
            <FiPhone className="absolute left-4 " size={20} />
            <input
              type="text"
              placeholder="Name"
              className=" border border-white/20 outline-(--primary) rounded-4xl placeholder:text-white bg-white/10 p-3 w-full pl-12 "
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="rounded-2xl border border-black px-6 py-2 bg-black text-white hover:text-white hover:bg-(--primary) hover:border-white cursor-pointer w-fit my-4 mx-auto"
          >
            Book Now
          </motion.button>
        </div>
      </motion.div>

      <PublicFooter rounded={false} />
    </div>
  );
};

export default Landing;
