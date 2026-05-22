import { Outlet } from "react-router-dom";
import PublicHeader from "../PublicHeader";
import PublicFooter from "../PublicFooter";

const RiderLayout = () => {
  return (
    <>
      <PublicHeader />
      <div className="mt-[13dvh]">
        <Outlet />
      </div>
      <PublicFooter />
    </>
  );
};

export default RiderLayout;
