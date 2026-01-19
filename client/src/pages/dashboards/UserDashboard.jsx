import { useState, useEffect, useRef } from "react";
import UserSidebar from "../../components/userDashboard/UserSidebar";
import UserOverview from "../../components/userDashboard/UserOverview";
import UserProfile from "../../components/userDashboard/UserProfile";
import UserOrders from "../../components/userDashboard/UserOrders";
import UserTranscation from "../../components/userDashboard/UserTranscation";
import UserHealpdesk from "../../components/userDashboard/UserHealpdesk";
import { motion, AnimatePresence } from "motion/react";
import useWindowSize from "../../hooks/useWindowSize";
import UserTopBar from "../../components/userDashboard/UserTopBar";

const UserDashboard = () => {
  const [active, setActive] = useState("overview");
  const [show, setShow] = useState(false);
  const [contentWidth, setContentWidth] = useState(0);
  const size = useWindowSize();
  const sideBarRef = useRef(null);
  useEffect(() => {
    if (!sideBarRef.current) return;
    const rect = sideBarRef.current.getBoundingClientRect();
    setContentWidth(size.width - rect.width);
  }, [size.width]);

  return (
    <div
      ref={sideBarRef}
      className={
        size.width > 645
          ? "flex w-full h-[87dvh] overflow-hidden"
          : "flex w-full h-[80dvh] flex-col"
      }
    >
      {size.width > 645 ? (
        <AnimatePresence>
          <motion.div
            initial={{ width: "5%" }}
            whileHover={{ width: "20%" }}
            transition={{ duration: 0.5 }}
            className={`shadow-lg min-w-[70px] shrink-0 overflow-auto hide-scrollbar border-r border-slate-300 bg-slate-100`}
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
          >
            <UserSidebar active={active} setActive={setActive} show={show} />
          </motion.div>
        </AnimatePresence>
      ) : (
        <UserTopBar active={active} setActive={setActive} show={show} />
      )}

      <div className={`grow  col-span-6 overflow-auto`}>
        {active === "overview" && <UserOverview />}
        {active === "profile" && <UserProfile />}
        {active === "orders" && <UserOrders />}
        {active === "transactions" && <UserTranscation />}
        {active === "help" && <UserHealpdesk />}
      </div>
    </div>
  );
};

export default UserDashboard;
