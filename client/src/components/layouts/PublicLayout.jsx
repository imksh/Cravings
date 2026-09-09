import { Outlet } from "react-router-dom";
import PublicHeader from "../PublicHeader";

const PublicLayout = () => {
  return (
    <div className="bg-gradient min-h-dvh flex flex-col">
      <PublicHeader />
      <div className="flex-1 pt-[40px]">
        <Outlet />
      </div>
      
    </div>
  );
};

export default PublicLayout;
