import React, { Suspense, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
const Login = React.lazy(() => import("./pages/Login"));
const Home = React.lazy(() => import("./pages/Home"));
import { Toaster } from "react-hot-toast";
const Register = React.lazy(() => import("./pages/Register"));
const About = React.lazy(() => import("./pages/About"));
const Contact = React.lazy(() => import("./pages/Contact"));
const Profile = React.lazy(() => import("./pages/Profile"));
import { useAuthStore } from "./store/useAuthStore";
const Landing = React.lazy(() => import("./pages/Landing"));
const Promo = React.lazy(() => import("./pages/Promo"));
const Terms = React.lazy(() => import("./pages/Terms"));
const Privacy = React.lazy(() => import("./pages/Privacy"));
const Cookie = React.lazy(() => import("./pages/Cookie"));
import Lenis from "lenis";
import useUiStore from "./store/useUiStore";
import Loading from "./components/Loading";
import ProtectedRoute from "./components/layouts/ProtectedRoute";
import PublicLayout from "./components/layouts/PublicLayout";
import CustomerLayout from "./components/layouts/CustomerLayout";
const CustomerHome = React.lazy(() => import("./pages/customer/CustomerHome"));
const Category = React.lazy(() => import("./pages/customer/Category"));
const Restaurants = React.lazy(() => import("./pages/customer/Restaurants"));
const Offers = React.lazy(() => import("./pages/customer/Offers"));
const Menu = React.lazy(() => import("./pages/customer/Menu"));
const Restaurant = React.lazy(() => import("./pages/customer/Restaurant"));
const Cart = React.lazy(() => import("./pages/customer/Cart"));
import CustomerFooter from "./components/customer/CustomerFooter";
import { Scroll } from "./components/Scroll";
const CustomerProfile = React.lazy(() => import("./pages/customer/CustomerProfile"));
import FetchingLocationMap from "./components/FetchingLocationMap";
const PartnerDashboard = React.lazy(() => import("./pages/partner/PartnerDashboard"));
import PartnerLayout from "./components/layouts/PartnerLayout";
const PartnerProfile = React.lazy(() => import("./pages/partner/PartnerProfile"));
const PartnerMenu = React.lazy(() => import("./pages/partner/PartnerMenu"));
const PartnerOffers = React.lazy(() => import("./pages/partner/PartnerOffers"));
const PartnerOrders = React.lazy(() => import("./pages/partner/PartnerOrders"));
import ConfirmModal from "./components/modal/ConfirmModal";
const MenuItem = React.lazy(() => import("./pages/customer/MenuItem"));
import { useSocket } from "./hooks/useSocket";
const OrderStatusPage = React.lazy(() => import("./pages/customer/OrderStatusPage"));
const CustomerOrder = React.lazy(() => import("./pages/customer/CustomerOrder"));
const CustomerOrderPage = React.lazy(() => import("./pages/customer/CustomerOrderPage"));
const RiderDashboard = React.lazy(() => import("./pages/rider/RiderDashboard"));
import RiderLayout from "./components/layouts/RiderLayout";
const RiderOrders = React.lazy(() => import("./pages/rider/RiderOrders"));
const RiderEarnings = React.lazy(() => import("./pages/rider/RiderEarnings"));
const RiderProfile = React.lazy(() => import("./pages/rider/RiderProfile"));


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
            <Route path="/promo" element={<Promo />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/cookie" element={<Cookie />} />
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

          <Route
            path="/rider"
            element={
              <ProtectedRoute role="rider">
                <RiderLayout />
              </ProtectedRoute>
            }
          >
            <Route path="" element={<RiderDashboard />} />
            <Route path="orders" element={<RiderOrders />} />
            <Route path="earnings" element={<RiderEarnings />} />
            <Route path="profile" element={<RiderProfile />} />
          </Route>
        </Routes>
      </Suspense>

      <Toaster />
    </div>
  );
};

export default App;
