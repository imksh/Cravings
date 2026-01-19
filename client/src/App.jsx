import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import Register from "./pages/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";
import UserDashboard from "./pages/dashboards/UserDashboard";
import useWindowSize from "./hooks/useWindowSize";
import PhoneHeader from "./components/PhoneHeader";
import PhoneTopBar from "./components/PhoneTopBar";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Landing from "./pages/Landing";
import Lenis from "lenis";

const paths = ["/user-dashboard"];

const App = () => {
  const user = null;
  const size = useWindowSize();
  const location = useLocation().pathname;
  const [margint, setMarginT] = useState("");

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smooth: true,
      smoothTouch: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const flag = paths.includes(location);
    if (flag) {
      setMarginT("");
    } else {
      setMarginT("mt-[10dvh]");
    }
  }, [location]);

  return (
    <div
      className={`bg-gradient  overflow-x-hidden  ${
        size.width < 645 && user
          ? `mb-[10dvh] ${margint ? ` h-[90dvh]` : "h-[90dvh]"} `
          : "pt-[13dvh] min-h-dvh"
      }`}
    >
      {size.width < 645 && user && <PhoneTopBar />}
      {size.width < 645 && user ? <PhoneHeader /> : <Header />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
