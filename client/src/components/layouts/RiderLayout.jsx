import { Outlet, useNavigate } from "react-router-dom";
import RiderSidebar from "../rider/RiderSidebar";
import { useEffect, useState } from "react";
import socket from "../../config/socket";
import toast from "react-hot-toast";
import api from "../../config/api";
import IncomingOrderModal from "../rider/modal/IncomingOrderModal";

const RiderLayout = () => {
  const navigate = useNavigate();
  const [newOrder, setNewOrder] = useState(null);
  const [actionType, setActionType] = useState(null);
  const [isActionLoading, setIsActionLoading] = useState(false);

  useEffect(() => {
    const handleAssignedOrder = (order) => {
      toast.success(`New delivery assigned: ${order.orderId}`);
      setNewOrder(order);
    };

    socket.on("orderAssigned", handleAssignedOrder);
    socket.on("newOrder", handleAssignedOrder);

    return () => {
      socket.off("orderAssigned", handleAssignedOrder);
      socket.off("newOrder", handleAssignedOrder);
      setNewOrder(null);
    };
  }, []);

  const handleOrderAction = async (status) => {
    if (!newOrder?._id) return;

    try {
      setIsActionLoading(true);
      setActionType(status);

      await api.patch(`/rider/orders/${newOrder._id}/status`, { status });

      toast.success(
        status === "confirmed" ? "Order accepted" : "Order rejected",
      );
      setNewOrder(null);
      navigate("/rider/orders");
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
    <div className="min-h-dvh bg-[#f7f4ef] text-slate-900">
      <RiderSidebar />

      <div className="min-h-dvh md:pl-72">
        <main className="min-h-dvh pt-16 md:pt-0">
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

export default RiderLayout;
