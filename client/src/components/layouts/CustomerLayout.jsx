import { Outlet } from "react-router-dom";
import CustomerHeader from "../customer/CustomerHeader";
import CustomerFooter from "../customer/CustomerFooter";
import useUiStore from "../../store/useUiStore";
import ConfirmModal from "../modal/ConfirmModal";
import { useEffect } from "react";
import api from "../../config/api";

const CustomerLayout = () => {
  const {
    showClearCartConfirmation,
    setShowClearCartConfirmation,
    clearCart,
    fetchRestaurants,
    location,
    setActiveOrders,
  } = useUiStore();

  useEffect(() => {
    fetchRestaurants();
  }, [location]);

  useEffect(() => {
    const fetchActiveOrders = async () => {
      try {
        const response = await api.get("/customer/order/active");
        setActiveOrders(response.data.data);
      } catch (error) {
        console.error("Error fetching active orders:", error);
      }
    };

    fetchActiveOrders();
  }, []);

  return (
    <>
      <CustomerHeader />
      <div className="">
        <Outlet />
      </div>
      <CustomerFooter />

      {showClearCartConfirmation && (
        <ConfirmModal
          open={showClearCartConfirmation}
          onClose={() => setShowClearCartConfirmation(false)}
          onConfirm={() => {
            clearCart();
            setShowClearCartConfirmation(false);
          }}
          title="Are you sure you want to clear your cart?"
          description="Your current cart items are from a different restaurant. Do you want to clear the cart and add this item?"
        />
      )}
    </>
  );
};

export default CustomerLayout;
