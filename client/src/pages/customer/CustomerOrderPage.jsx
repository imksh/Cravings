import React, { useEffect, useState } from "react";
import {
  MapPin,
  Bike,
  Clock3,
  ShoppingBag,
  AlertCircle,
  ChevronLeft,
  Store,
  CreditCard,
  CheckCircle2,
  Loader,
} from "lucide-react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import api from "../../config/api";
import { toast } from "react-hot-toast";
import LiveOrderTrackingMap from "../../components/LiveOrderTrackingMap";

const capitalizeStatus = (status) => {
  return status.charAt(0).toUpperCase() + status.slice(1);
};

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

const statusSteps = [
  "placed",
  "confirmed",
  "preparing",
  "ready",
  "picked",
  "delivered",
];

const CustomerOrderPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id: orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // Initialize order from navigation state or fetch from API
  useEffect(() => {
    if (location.state?.order) {
      setOrder(location.state.order);
      setLoading(false);
    } else {
      fetchOrderFromApi();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  const fetchOrderFromApi = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get(`/customer/order/${orderId}`);
      setOrder(response.data.data);
    } catch (err) {
      console.error("Error fetching order:", err);
      setError(err.response?.data?.message || "Failed to fetch order details");
      toast.error("Failed to load order");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchOrderFromApi();
    setRefreshing(false);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#faf7f4] text-slate-900">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <Loader className="mx-auto mb-4 animate-spin" size={40} />
            <p className="text-slate-600">Loading order details...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error || !order) {
    return (
      <main className="min-h-screen bg-[#faf7f4] text-slate-900">
        <header className="sticky top-0 z-30 border-b border-[#f1e5dd] bg-white/90 backdrop-blur-xl">
          <div className="flex items-center gap-4 px-4 py-5 sm:px-6 lg:px-8">
            <button
              onClick={() => navigate("/customer/order")}
              className="flex items-center gap-2 rounded-lg border border-[#f1e5dd] bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-500"
            >
              <ChevronLeft size={16} />
              Back
            </button>
            <h1 className="text-2xl font-black text-slate-900">
              Order Details
            </h1>
          </div>
        </header>

        <div className="flex items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-red-100 bg-red-50 p-6 text-center">
            <AlertCircle className="mx-auto mb-4 text-red-500" size={40} />
            <h2 className="text-xl font-bold text-red-900">Order Not Found</h2>
            <p className="mt-2 text-red-700">{error}</p>
            <button
              onClick={() => navigate("/customer/order")}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-red-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
            >
              <ChevronLeft size={16} />
              Back to Orders
            </button>
          </div>
        </div>
      </main>
    );
  }

  const currentStatusIndex = statusSteps.indexOf(
    order.status === "cancelled" ? "placed" : order.status,
  );

  return (
    <main className="min-h-screen bg-[#faf7f4] text-slate-900">
      {/* HEADER */}
      <header className="sticky top-0 z-30 border-b border-[#f1e5dd] bg-white/90 backdrop-blur-xl">
        <div className="flex items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/customer/order")}
              className="flex items-center gap-2 rounded-lg border border-[#f1e5dd] bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-500"
            >
              <ChevronLeft size={16} />
              Back
            </button>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-500">
                Order Details
              </p>
              <h1 className="mt-1 text-2xl font-black text-slate-900">
                {order.orderId || "#" + order._id.slice(-6).toUpperCase()}
              </h1>
            </div>
          </div>

          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-2 rounded-lg border border-[#f1e5dd] bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-500 disabled:opacity-50"
          >
            Refresh
          </button>
        </div>
      </header>

      <section className="space-y-8 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {/* STATUS TIMELINE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-[2rem] border border-[#f1e5dd] bg-white p-6 order-2 md:order-1">
            <h2 className="mb-6 text-lg font-bold text-slate-900">
              Order Status
            </h2>

            {order.status === "cancelled" ? (
              <div className="rounded-xl border border-red-100 bg-red-50 p-6 text-center">
                <AlertCircle className="mx-auto mb-3 text-red-500" size={32} />
                <p className="text-lg font-bold text-red-900">
                  Order Cancelled
                </p>
                <p className="mt-2 text-sm text-red-700">
                  This order has been cancelled.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {statusSteps.map((status, index) => (
                  <div key={status} className="flex items-start gap-4">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full font-bold ${
                        index <= currentStatusIndex
                          ? "bg-emerald-500 text-white"
                          : "bg-slate-200 text-slate-500"
                      }`}
                    >
                      {index < currentStatusIndex ? "✓" : index + 1}
                    </div>
                    <div className="flex-1">
                      <p
                        className={`font-semibold ${
                          index <= currentStatusIndex
                            ? "text-slate-900"
                            : "text-slate-500"
                        }`}
                      >
                        {capitalizeStatus(status)}
                      </p>
                      <p className="text-sm text-slate-500">
                        {status === order.status && "Current step"}
                        {index < currentStatusIndex && "Completed"}
                        {index > currentStatusIndex && "Pending"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 flex items-center gap-3 rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-600">
              <Clock3 size={16} />
              <span>
                Ordered {getRelativeTime(order.createdAt)} •{" "}
                {new Date(order.createdAt).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
          <div className="order-1 md:order-2 rounded-[2rem]">
            <LiveOrderTrackingMap
              userLocation={{
                lat: order.deliveryAddress?.geoLocation?.coordinates[1],

                lng: order.deliveryAddress?.geoLocation?.coordinates[0],
              }}
              restaurantLocation={{
                lat: order.restaurantLocation?.coordinates[1],

                lng: order.restaurantLocation?.coordinates[0],
              }}
              height="350px"
            />
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* LEFT COLUMN - ORDER & ITEMS */}
          <div className="space-y-6 lg:col-span-2">
            {/* RESTAURANT INFO */}
            <div className="rounded-[2rem] border border-[#f1e5dd] bg-white p-6">
              <h2 className="mb-4 text-lg font-bold text-slate-900">
                Restaurant
              </h2>
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                  <Store size={32} />
                </div>
                <div>
                  <p className="text-lg font-bold text-slate-900">
                    {order.restaurant?.name || "Restaurant"}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    {order.restaurant?.address || "Address not available"}
                  </p>
                </div>
              </div>
            </div>

            {/* ORDER ITEMS */}
            <div className="rounded-[2rem] border border-[#f1e5dd] bg-white p-6">
              <h2 className="mb-4 text-lg font-bold text-slate-900">
                Order Items
              </h2>
              <div className="space-y-4">
                {order.items && order.items.length > 0 ? (
                  order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between border-b border-[#f1e5dd] pb-4 last:border-0"
                    >
                      <div className="flex-1">
                        <p className="font-semibold text-slate-900">
                          {item.menu?.name || "Item"}
                        </p>
                        <p className="text-sm text-slate-500">
                          Qty: {item.quantity || 1}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-slate-900">
                          ₹
                          {(
                            (item.price || 0) * (item.quantity || 1)
                          ).toLocaleString("en-IN")}
                        </p>
                        <p className="text-xs text-slate-500">
                          ₹{(item.price || 0).toLocaleString("en-IN")} each
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-500">No items in order</p>
                )}
              </div>
            </div>

            {/* DELIVERY ADDRESS */}
            <div className="rounded-[2rem] border border-[#f1e5dd] bg-white p-6">
              <h2 className="mb-4 text-lg font-bold text-slate-900">
                Delivery Address
              </h2>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">
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
          </div>

          {/* RIGHT COLUMN - SUMMARY & PAYMENT */}
          <div className="space-y-6">
            {/* PRICE BREAKDOWN */}
            <div className="rounded-[2rem] border border-[#f1e5dd] bg-white p-6">
              <h2 className="mb-4 text-lg font-bold text-slate-900">
                Price Breakdown
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Subtotal</span>
                  <span className="font-semibold text-slate-900">
                    ₹{(order.subtotal || 0).toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Delivery Fee</span>
                  <span className="font-semibold text-slate-900">
                    ₹{(order.deliveryFee || 0).toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Tax</span>
                  <span className="font-semibold text-slate-900">
                    ₹{(order.tax || 0).toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="border-t border-[#f1e5dd] pt-3">
                  <div className="flex justify-between font-bold">
                    <span className="text-slate-900">Total</span>
                    <span className="text-2xl text-orange-500">
                      ₹{(order.total || 0).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* PAYMENT INFO */}
            <div className="rounded-[2rem] border border-[#f1e5dd] bg-white p-6">
              <h2 className="mb-4 text-lg font-bold text-slate-900">Payment</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3 rounded-lg bg-slate-50 px-4 py-3">
                  <div
                    className={`h-2.5 w-2.5 rounded-full ${
                      order.paymentStatus === "paid"
                        ? "bg-emerald-500"
                        : order.paymentStatus === "failed"
                          ? "bg-red-500"
                          : "bg-orange-500"
                    }`}
                  />
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase">
                      Status
                    </p>
                    <p className="font-bold text-slate-900 capitalize">
                      {order.paymentStatus}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-lg bg-slate-50 px-4 py-3">
                  <CreditCard size={20} className="text-orange-500" />
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase">
                      Method
                    </p>
                    <p className="font-bold text-slate-900 uppercase">
                      {order.paymentMethod || "COD"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="space-y-2">
              <button className="w-full rounded-2xl border border-orange-200 bg-orange-50 px-6 py-3 font-semibold text-orange-600 transition hover:bg-orange-100">
                Contact Support
              </button>
              <button
                onClick={() => navigate("/customer/order")}
                className="w-full rounded-2xl bg-orange-500 px-6 py-3 font-semibold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600"
              >
                Back to Orders
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CustomerOrderPage;
