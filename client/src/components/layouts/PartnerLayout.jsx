import { Outlet, useNavigate } from "react-router-dom";
import PartnerSidebar from "../partner/PartnerSidebar";
import { useEffect, useState } from "react";
import socket from "../../config/socket";
import toast from "react-hot-toast";
import api from "../../config/api";
import IncomingOrderModal from "../partner/modal/IncomingOrderModal";

const PartnerLayout = () => {
  const navigate = useNavigate();
  const [newOrder, setNewOrder] = useState(null);
  const [actionType, setActionType] = useState(null);
  const [isActionLoading, setIsActionLoading] = useState(false);

  useEffect(() => {
    const handleNewOrder = (order) => {
      toast.success(`New order received: ${order.orderId}`);
      setNewOrder(order);
    };

    socket.on("newOrder", handleNewOrder);

    return () => {
      socket.off("newOrder", handleNewOrder);
      setNewOrder(null);
    };
  }, []);

  const handleOrderAction = async (status) => {
    if (!newOrder?._id) return;

    try {
      setIsActionLoading(true);
      setActionType(status);

      await api.patch(`/partner/orders/${newOrder._id}/status`, {
        status,
      });

      toast.success(
        status === "confirmed" ? "Order accepted" : "Order rejected",
      );
      setNewOrder(null);
      navigate("/partner/orders");
    } catch (error) {
      console.error("Error updating incoming order:", error);
      toast.error(
        error.response?.data?.message || "Failed to update order status",
      );
    } finally {
      setIsActionLoading(false);
      setActionType(null);
    }
  };

  return (
    <div className="min-h-dvh bg-gray-50">
      <PartnerSidebar />
      <div className="min-h-dvh md:pl-72 overflow-hidden">
        <main className="min-h-[calc(100dvh-0px)] pt-16 md:pt-0">
          <Outlet />
        </main>
      </div>

      <IncomingOrderModal
        isOpen={Boolean(newOrder)}
        order={newOrder}
        isLoading={isActionLoading}
        actionType={actionType}
        onAccept={() => handleOrderAction("confirmed")}
        onReject={() => handleOrderAction("cancelled")}
        onClose={() => setNewOrder(null)}
      />
    </div>
  );
};

export default PartnerLayout;
