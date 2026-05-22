import React, { Suspense, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import Register from "./pages/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import { useAuthStore } from "./store/useAuthStore";
import Landing from "./pages/Landing";
import Lenis from "lenis";
import useUiStore from "./store/useUiStore";
import Loading from "./components/Loading";
import ProtectedRoute from "./components/layouts/ProtectedRoute";
import PublicLayout from "./components/layouts/PublicLayout";
import CustomerLayout from "./components/layouts/CustomerLayout";
import CustomerHome from "./pages/customer/CustomerHome";
import Category from "./pages/customer/Category";
import Restaurants from "./pages/customer/Restaurants";
import Offers from "./pages/customer/Offers";
import Menu from "./pages/customer/Menu";
import Restaurant from "./pages/customer/Restaurant";
import Cart from "./pages/customer/Cart";
import CustomerFooter from "./components/customer/CustomerFooter";
import { Scroll } from "./components/Scroll";
import CustomerProfile from "./pages/customer/CustomerProfile";
import FetchingLocationMap from "./components/FetchingLocationMap";
import PartnerDashboard from "./pages/partner/PartnerDashboard";
import PartnerLayout from "./components/layouts/PartnerLayout";
import PartnerProfile from "./pages/partner/PartnerProfile";
import PartnerMenu from "./pages/partner/PartnerMenu";
import PartnerOffers from "./pages/partner/PartnerOffers";
import PartnerOrders from "./pages/partner/PartnerOrders";
import ConfirmModal from "./components/modal/ConfirmModal";
import MenuItem from "./pages/customer/MenuItem";
import { useSocket } from "./hooks/useSocket";
import OrderStatusPage from "./pages/customer/OrderStatusPage";
import CustomerOrder from "./pages/customer/CustomerOrder";
import CustomerOrderPage from "./pages/customer/CustomerOrderPage";

const App = () => {
  useSocket();
  const {
    setShowHeaderMenu,
    fetchCurrentLocation,
    setMobileOpen,
    showClearCartConfirmation,
    setShowClearCartConfirmation,
    clearCart,
  } = useUiStore();
  const { user, checkAuth, isCheckingAuth } = useAuthStore();
  const [fetchingLocation, setFetchingLocation] = useState(false);

  // useEffect(() => {
  //   const lenis = new Lenis({
  //     duration: 1.2,
  //     easing: (t) => 1 - Math.pow(1 - t, 3),
  //     smooth: true,
  //     smoothTouch: false,
  //   });

  //   function raf(time) {
  //     lenis.raf(time);
  //     requestAnimationFrame(raf);
  //   }

  //   requestAnimationFrame(raf);

  //   return () => {
  //     lenis.destroy();
  //   };
  // }, []);

  useEffect(() => {
    const getLocation = async () => {
      setFetchingLocation(true);
      await fetchCurrentLocation();
      setFetchingLocation(false);
    };

    getLocation();
  }, [fetchCurrentLocation]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <Loading />;

  return (
    <div
      className={`overflow-x-hidden min-h-dvh`}
      onClick={() => {
        setShowHeaderMenu(false);
      }}
    >
      <Scroll />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={user ? <Home /> : <Landing />} />
            <Route
              path="/login"
              element={user ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path="/register"
              element={user ? <Navigate to="/" /> : <Register />}
            />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={user ? <Profile /> : <Login />} />
            <Route path="/cart" element={user ? <Cart /> : <Login />} />
          </Route>

          <Route
            path="/customer"
            element={
              <ProtectedRoute role="customer">
                <CustomerLayout />
              </ProtectedRoute>
            }
          >
            <Route path="" element={<CustomerHome />} />
            <Route path="categories" element={<Category />} />
            <Route path="restaurant" element={<Restaurants />} />
            <Route path="restaurant/:id" element={<Restaurant />} />
            <Route path="restaurant/:restaurantId/:id" element={<MenuItem />} />
            <Route path="offers" element={<Offers />} />
            <Route path="menu" element={<Menu />} />
            <Route path="cart" element={<Cart />} />
            <Route path="order" element={<CustomerOrder />} />
            <Route path="order/:id" element={<CustomerOrderPage />} />
            <Route path="order/:id/:status" element={<OrderStatusPage />} />
            <Route path="profile" element={<CustomerProfile />} />
          </Route>

          <Route
            path="/partner"
            element={
              <ProtectedRoute role="partner">
                <PartnerLayout />
              </ProtectedRoute>
            }
          >
            <Route path="" element={<PartnerDashboard />} />
            <Route path="profile" element={<PartnerProfile />} />
            <Route path="menu" element={<PartnerMenu />} />
            <Route path="orders" element={<PartnerOrders />} />
            <Route path="offers" element={<PartnerOffers />} />
          </Route>
        </Routes>
      </Suspense>

      <Toaster />
    </div>
  );
};

export default App;
