import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { motion, AnimatePresence } from "motion/react";

const LandingFood = ({ item }) => {
  const [curr, setCurr] = useState("");
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
    <AnimatePresence mode="wait">
      <motion.div
        key={item.id}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        onMouseEnter={() => setCurr(item.title)}
        className="relative w-full"
      >
        <motion.img
          animate={curr === item.title ? { x: [-15, 0, 15, 0] } : { x: 0 }}
          transition={{ duration: 0.3 }}
          src={`/images/food-${item?.image}.png`}
          alt=""
          className="w-30 max-h-23 object-center object-contain absolute -top-12 left-[50%] -translate-x-[50%]"
        />
        <div className="w-full p-4 pt-8 rounded-2xl shadow-2xl aspect-square flex flex-col items-center justify-center gap-2">
          <div className="flex justify-center items-center text-center">
            <img src="/images/avatarCombined.png" alt="" className="w-[40%]" />
            <p className="flex text-center gap-2 items-center text-[12px]">
              <FaStar size={20} color="yellow" />{" "}
              <span className="text-gray-500">
                {item?.rating} ({item?.reviews})
              </span>
            </p>
          </div>
          <h2 className="text-xl font-bold text-center  whitespace-nowrap">{item?.title}</h2>
          <p className="text-center text-gray-500 text-[12px]">
            {item?.description}
          </p>
          <h3 className="text-2xl font-bold text-center text-(--primary)">
            ₹{item?.price}
          </h3>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1 }}
            className="rounded-2xl border px-6 py-2 bg-black text-white hover:text-(--primary) hover:bg-white cursor-pointer mx-auto my-4"
          >
            Buy Now
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LandingFood;
