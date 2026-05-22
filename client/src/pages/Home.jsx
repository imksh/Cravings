import React, { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  useEffect(() => {
    if (user.role === "admin") {
      navigate("/admin");
    }
    if (user.role === "customer") {
      navigate("/customer");
    }
    if (user.role === "partner") {
      navigate("/partner");
    }

    if (user.role === "rider") {
      navigate("/rider");
    }
  }, []);

  return (
    <div>
      <Loading />
    </div>
  );
};

export default Home;
