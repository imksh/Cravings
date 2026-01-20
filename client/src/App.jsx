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
import PhoneBottomBar from "./components/PhoneBottomBar";
import PhoneTopBar from "./components/PhoneTopBar";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Landing from "./pages/Landing";
import Lenis from "lenis";
import useUiStore from "./store/useUiStore";
import { useAuthStore } from "./store/useAuthStore";
import Loading from "./components/Loading";
import UserHeader from "./components/UserHeader";

const App = () => {
  const { setShowHeaderMenu } = useUiStore();
  const { user, checkAuth, isCheckingAuth } = useAuthStore();
  const size = useWindowSize();
  const location = useLocation().pathname;

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
    checkAuth();
  }, []);

  if (isCheckingAuth) return <Loading />;

  return (
    <div
      className={`bg-gradient  overflow-x-hidden  ${
        size.width < 645 && user
          ? `mb-[10dvh] h-[90dvh] `
          : "pt-[13dvh] min-h-dvh"
      }`}
      onClick={() => {
        setShowHeaderMenu(false);
      }}
    >
      {!user ? (
        <Header />
      ) : size.width < 645 ? (
        <PhoneBottomBar />
      ) : (
        <UserHeader />
      )}
      <Routes>
        <Route path="/" element={user ? <Home /> : <Landing />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/register" element={user ? <Home /> : <Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={user ? <Profile /> : <Login />} />
        <Route path="/cart" element={user ? <Cart /> : <Login />} />
        <Route
          path="/user-dashboard"
          element={user ? <UserDashboard /> : <Login />}
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
