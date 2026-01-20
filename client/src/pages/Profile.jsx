import React from "react";
import { useAuthStore } from "../store/useAuthStore";

const Profile = () => {
  const { logout } = useAuthStore();
  return (
    <div className="flex flex-col gap-5">
      Profile
      <button
        onClick={logout}
        className="text-white bg-blue-500 hover:bg-blue-700 px-8 py-3 rounded-2xl cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
