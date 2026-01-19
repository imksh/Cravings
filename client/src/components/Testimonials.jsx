import { useState, useEffect } from "react";
import avtar from "../assets/images/avtar.png";
import Lottie from "lottie-react";
import LottieBurger from "../assets/animations/burger.json";
import { FaStar } from "react-icons/fa";
import { motion, AnimatePresence } from "motion/react";

const data = [
  {
    id: 1,
    name: "Raffialdo Bayu",
    role: "College Student",
    avatar: "/avatars/user-1.png",
    rating: 4.9,
    totalReviews: "240k Reviews",
    message:
      "The burgers are really delicious. The texture is very crunchy on the tongue, the tomato sauce tastes amazing, and the melted cheese makes everything even better. Definitely one of my favorite meals.",
  },
  {
    id: 2,
    name: "Ananya Sharma",
    role: "Software Engineer",
    avatar: "/avatars/user-2.png",
    rating: 4.8,
    totalReviews: "180k Reviews",
    message:
      "Fast delivery and great packaging. The food arrived hot and fresh. The flavors were perfectly balanced and the portion size was totally worth the price.",
  },
  {
    id: 3,
    name: "Rahul Mehta",
    role: "Startup Founder",
    avatar: "/avatars/user-3.png",
    rating: 5.0,
    totalReviews: "310k Reviews",
    message:
      "I’ve tried many food delivery apps, but this one stands out. The quality is consistent every time, and the taste feels like restaurant-level food at home.",
  },
  {
    id: 4,
    name: "Priya Verma",
    role: "Content Creator",
    avatar: "/avatars/user-4.png",
    rating: 4.7,
    totalReviews: "150k Reviews",
    message:
      "Loved the variety of dishes available. Ordering is smooth, delivery is quick, and the food presentation is always impressive.",
  },
];

const Testimonials = () => {
  const [indx, setIndx] = useState(0);
  const total = 4;

  useEffect(() => {
    const interval = setInterval(() => {
      setIndx((prev) => (prev + 1) % total);
    }, 4000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 sm:gap-0  my-28 ">
      <div className="flex items-center  mx-auto sm:mx-0 sm:pl-16 relative w-fit">
        <img
          src="/images/burger.png"
          alt=""
          className="w-50 sm:w-80 rounded-full border border-(--primary)"
        />
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className=" absolute z-40 right-0 translate-x-[50%] top-0 w-fit"
        >
          <Lottie
            animationData={LottieBurger}
            loop
            className=" w-28  sm:w-40"
          />
        </motion.div>
      </div>

      <div className="mb-2 sm:mb-0 text-center sm:text-left sm:w-[80%] mx-auto">
        <h2 className="font-bold">
          <span className="text-2xl sm:text-4xl">
            What our customer <br />{" "}
          </span>
          <span className="text-xl sm:text-3xl">
            say about <span className="text-(--primary)">Cravings</span>
          </span>
        </h2>
        <AnimatePresence mode="wait">
          <motion.div
            key={indx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {/* user */}
            <div className="flex gap-6 items-center my-4">
              <div className="w-12 h-12 bg-(--primary) flex justify-center items-center rounded-full">
                <img src={avtar} alt="" className="w-6" />
              </div>

              <div>
                <h3 className="font-bold text-xl">{data[indx].name}</h3>
                <p className="text-gray-500 text-[12px]">{data[indx].role}</p>
              </div>
            </div>

            {/* message */}
            <p className="text-gray-500 my-4">{data[indx].message}</p>

            {/* rating */}
            <div className="flex items-center gap-2 justify-center sm:justify-start text-[12px]">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} size={18} color="orange" />
              ))}
              <span className="text-gray-500">
                {data[indx].rating} ({data[indx].totalReviews})
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Testimonials;

