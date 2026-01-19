import { useState, useEffect } from "react";
import { TbChartTreemap } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { FaCartShopping } from "react-icons/fa6";
import { TbTransactionRupee } from "react-icons/tb";
import { RiCustomerService2Fill } from "react-icons/ri";
import { ImProfile } from "react-icons/im";
import { motion } from "motion/react";
import dashboardImg from "../../assets/images/dashboard.png";

const data = [
  { key: "overview", icon: TbChartTreemap, name: "Overview" },
  { key: "profile", icon: ImProfile, name: "Profile" },
  { key: "orders", icon: FaCartShopping, name: "Orders" },
  { key: "transactions", icon: TbTransactionRupee, name: "Transactions" },
  { key: "help", icon: RiCustomerService2Fill, name: "Help Desk" },
];

const UserSidebar = ({ active, setActive, show }) => {
  const [curr, setCurr] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setCurr("");
    }, 500);
  }, [curr]);

  return (
    <div className="py-3">
      <motion.div
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 1 }}
        className="text-xl font-bold shadow-lg p-5 flex items-center gap-2"
        onMouseEnter={() => {
          setCurr("dashboard");
        }}
        onMouseLeave={() => {
          setCurr("");
        }}
      >
        <motion.img
          animate={
            curr === "dashboard"
              ? { x: [], y: [0, -5, 0, 5, 0] }
              : { x: 0, y: 0 }
          }
          transition={{ duration: 0.3 }}
          src={dashboardImg}
          alt="dashboard image"
          className=" h-8 w-auto"
        />{" "}
        {show && <span className="whitespace-nowrap">User Dashboard</span>}
      </motion.div>

      <div className="flex flex-col  ">
        {data.map((item, key) => (
          <motion.button
            key={key}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 1 }}
            className={`cursor-pointer whitespace-nowrap flex gap-3 items-center hover:bg-(--accent) px-6 py-5 hover:text-white ${
              active === item.key ? "bg-(--primary) text-white" : ""
            }`}
            onClick={() => setActive(item.key)}
            onMouseEnter={() => {
              setCurr(item.key);
            }}
            onMouseLeave={() => {
              setCurr("");
            }}
          >
            <motion.div
              animate={
                curr === item.key
                  ? { x: [], y: [0, -5, 0, 5, 0] }
                  : { x: 0, y: 0 }
              }
              transition={{ duration: 0.3 }}
            >
              <item.icon size={24} />
            </motion.div>
            {show && item.name}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default UserSidebar;
