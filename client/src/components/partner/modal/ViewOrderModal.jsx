import React, { useState } from "react";
import {
  X,
  Clock,
  MapPin,
  Phone,
  Mail,
  User2,
  Flame,
  Bike,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Loader,
} from "lucide-react";
import toast from "react-hot-toast";

const ViewOrderModal = ({ isOpen, onClose, order, onOrderUpdate }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentAction, setCurrentAction] = useState(null);
  const [isViewMenuModalOpen, setIsViewMenuModalOpen] = useState(false);

  const capitalizeStatus = (status) =>
    status.charAt(0).toUpperCase() + status.slice(1);

  const getRelativeTime = (timestamp) => {
    const now = new Date();
    const createdAt = new Date(timestamp);
    const diffMs = now - createdAt;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  const statusColors = {
    placed: {
      bg: "bg-blue-50",
      text: "text-blue-600",
      border: "border-blue-100",
    },
    confirmed: {
      bg: "bg-cyan-50",
      text: "text-cyan-600",
      border: "border-cyan-100",
    },
    preparing: {
      bg: "bg-orange-50",
      text: "text-orange-600",
      border: "border-orange-100",
    },
    picked: {
      bg: "bg-violet-50",
      text: "text-violet-600",
      border: "border-violet-100",
    },
    delivered: {
      bg: "bg-emerald-50",
      text: "text-emerald-600",
      border: "border-emerald-100",
    },
    cancelled: {
      bg: "bg-red-50",
      text: "text-red-500",
      border: "border-red-100",
    },
  };

  const getNextStatus = (currentStatus) => {
    const statusFlow = {
      placed: "confirmed",
      confirmed: "preparing",
      preparing: "picked",
      picked: "delivered",
    };
    return statusFlow[currentStatus];
  };

  const updateOrderStatus = async (newStatus) => {
    try {
      setIsUpdating(true);
      setCurrentAction(newStatus);

      // TODO: Replace with actual API endpoint once backend is ready
      // const response = await api.patch(`/partner/orders/${order._id}`, {
      //   status: newStatus,
      // });

      // Mock update for now
      toast.success(`Order status updated to ${capitalizeStatus(newStatus)}`);

      // Call the parent callback to update the order
      if (onOrderUpdate) {
        onOrderUpdate({
          ...order,
          status: newStatus,
        });
      }

      // Close modal after successful update
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error) {
      console.error("Error updating order:", error);
      toast.error(
        error.response?.data?.message || "Failed to update order status",
      );
    } finally {
      setIsUpdating(false);
      setCurrentAction(null);
    }
  };

  const cancelOrder = async () => {
    if (!window.confirm("Are you sure you want to cancel this order?")) {
      return;
    }

    try {
      setIsUpdating(true);
      setCurrentAction("cancelled");

      // TODO: Replace with actual API endpoint once backend is ready
      // const response = await api.patch(`/partner/orders/${order._id}`, {
      //   status: "cancelled",
      // });

      toast.success("Order cancelled successfully");

      if (onOrderUpdate) {
        onOrderUpdate({
          ...order,
          status: "cancelled",
        });
      }

      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error) {
      console.error("Error cancelling order:", error);
      toast.error(error.response?.data?.message || "Failed to cancel order");
    } finally {
      setIsUpdating(false);
      setCurrentAction(null);
    }
  };

  if (!isOpen || !order) return null;

  const statusColor = statusColors[order.status] || statusColors.placed;
  const nextStatus = getNextStatus(order.status);
  const canProgress =
    order.status !== "delivered" && order.status !== "cancelled";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-[#e9dfd1] bg-white shadow-2xl">
        {/* HEADER */}
        <div className="sticky top-0 z-40 border-b border-[#f1e5dd] bg-white px-6 py-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black tracking-tight text-slate-900">
                {order.orderId || "#" + order._id?.slice(-6).toUpperCase()}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {getRelativeTime(order.createdAt)}
              </p>
            </div>

            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#f1e5dd] text-slate-500 transition hover:bg-slate-100"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* BODY */}
        <div className="space-y-6 px-6 py-6">
          {/* STATUS BADGE */}
          <div
            className={`inline-flex rounded-full border px-5 py-2 text-sm font-bold ${statusColor.bg} ${statusColor.text} ${statusColor.border}`}
          >
            {capitalizeStatus(order.status)}
          </div>

          {/* CUSTOMER SECTION */}
          <div className="space-y-4">
            <h3 className="text-lg font-black text-slate-900">
              Customer Details
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-[#f5ebe4] bg-[#fffaf7] p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                    <User2 size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
                      Name
                    </p>
                    <p className="mt-1 text-base font-bold text-slate-900">
                      {order.customer?.name || "Unknown"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-[#f5ebe4] bg-[#fffaf7] p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
                      Phone
                    </p>
                    <p className="mt-1 text-base font-bold text-slate-900">
                      {order.customer?.phone || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-[#f5ebe4] bg-[#fffaf7] p-4 sm:col-span-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
                      Email
                    </p>
                    <p className="mt-1 text-base font-bold text-slate-900">
                      {order.customer?.email || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ORDER ITEMS */}
          <div className="space-y-4">
            <h3 className="text-lg font-black text-slate-900">Order Items</h3>
            {order.items && order.items.length > 0 ? (
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-2xl border border-[#f5ebe4] bg-[#fffaf7] p-4"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900">
                        {item?.menu?.name || "Item"}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-slate-900">₹{item.price}</p>
                      <p className="text-sm text-slate-500">
                        ₹{(item.price * item.quantity).toFixed(2)} total
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500">No items in order</p>
            )}
          </div>

          {/* DELIVERY ADDRESS */}
          <div className="space-y-4">
            <h3 className="text-lg font-black text-slate-900">
              Delivery Address
            </h3>
            <div className="flex items-start gap-4 rounded-2xl border border-[#f5ebe4] bg-[#fffaf7] p-5">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                <MapPin size={20} />
              </div>
              <div className="flex-1">
                <p className="text-sm leading-7 text-slate-900">
                  {[
                    order.deliveryAddress?.address,
                    order.deliveryAddress?.city,
                    order.deliveryAddress?.pin,
                  ]
                    .filter(Boolean)
                    .join(", ") || "Address not available"}
                </p>
              </div>
            </div>
          </div>

          {/* PRICING BREAKDOWN */}
          <div className="space-y-4">
            <h3 className="text-lg font-black text-slate-900">
              Pricing Breakdown
            </h3>
            <div className="space-y-2 rounded-2xl border border-[#f5ebe4] bg-[#fffaf7] p-5">
              <div className="flex items-center justify-between">
                <p className="text-slate-600">Subtotal</p>
                <p className="font-semibold text-slate-900">
                  ₹{order.subtotal}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-slate-600">Delivery Fee</p>
                <p className="font-semibold text-slate-900">
                  ₹{order.deliveryFee}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-slate-600">Tax</p>
                <p className="font-semibold text-slate-900">₹{order.tax}</p>
              </div>
              <div className="border-t border-[#e9dfd1] pt-3">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-slate-900">Total</p>
                  <p className="text-2xl font-black text-orange-500">
                    ₹{order.total}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* PAYMENT INFO */}
          <div className="space-y-4">
            <h3 className="text-lg font-black text-slate-900">
              Payment Information
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-[#f5ebe4] bg-[#fffaf7] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
                  Method
                </p>
                <p className="mt-2 text-base font-bold text-slate-900 capitalize">
                  {order.paymentMethod === "cod"
                    ? "Cash on Delivery"
                    : order.paymentMethod?.toUpperCase()}
                </p>
              </div>

              <div className="rounded-2xl border border-[#f5ebe4] bg-[#fffaf7] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
                  Status
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <div
                    className={`h-2.5 w-2.5 rounded-full ${
                      order.paymentStatus === "paid"
                        ? "bg-emerald-500"
                        : order.paymentStatus === "failed"
                          ? "bg-red-500"
                          : "bg-orange-500"
                    }`}
                  />
                  <p className="text-base font-bold text-slate-900 capitalize">
                    {order.paymentStatus}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          {order.status !== "cancelled" && order.status !== "delivered" && (
            <div className="space-y-4">
              <h3 className="text-lg font-black text-slate-900">Actions</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {canProgress && nextStatus && (
                  <button
                    onClick={() => updateOrderStatus(nextStatus)}
                    disabled={isUpdating}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-orange-500 px-5 py-4 text-sm font-semibold text-white shadow-lg shadow-orange-200 transition disabled:opacity-50 hover:bg-orange-600"
                  >
                    {isUpdating && currentAction === nextStatus ? (
                      <>
                        <Loader size={16} className="animate-spin" />
                        Updating...
                      </>
                    ) : (
                      <>
                        {nextStatus === "confirmed" && (
                          <>
                            <CheckCircle2 size={16} />
                            Confirm Order
                          </>
                        )}
                        {nextStatus === "preparing" && (
                          <>
                            <Flame size={16} />
                            Start Preparing
                          </>
                        )}
                        {nextStatus === "picked" && (
                          <>
                            <Bike size={16} />
                            Dispatch Order
                          </>
                        )}
                        {nextStatus === "delivered" && (
                          <>
                            <CheckCircle2 size={16} />
                            Mark Delivered
                          </>
                        )}
                      </>
                    )}
                  </button>
                )}

                <button
                  onClick={cancelOrder}
                  disabled={isUpdating}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm font-semibold text-red-500 transition disabled:opacity-50 hover:bg-red-100"
                >
                  {isUpdating && currentAction === "cancelled" ? (
                    <>
                      <Loader size={16} className="animate-spin" />
                      Cancelling...
                    </>
                  ) : (
                    <>
                      <XCircle size={16} />
                      Cancel Order
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STATUS MESSAGE */}
          {order.status === "delivered" && (
            <div className="flex items-start gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
              <CheckCircle2 size={20} className="mt-0.5 text-emerald-600" />
              <p className="text-sm text-emerald-700">
                This order has been delivered successfully.
              </p>
            </div>
          )}

          {order.status === "cancelled" && (
            <div className="flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 p-5">
              <AlertCircle size={20} className="mt-0.5 text-red-600" />
              <p className="text-sm text-red-700">
                This order has been cancelled.
              </p>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="border-t border-[#f1e5dd] bg-slate-50 px-6 py-4">
          <button
            onClick={onClose}
            className="w-full rounded-2xl border border-[#f1e5dd] bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewOrderModal;
