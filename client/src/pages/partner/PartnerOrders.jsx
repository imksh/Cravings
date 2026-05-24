import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Bike,
  CheckCircle2,
  Clock3,
  Flame,
  MapPin,
  Phone,
  Search,
  ShoppingBag,
  AlertCircle,
  User2,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Loader,
  Clock,
} from "lucide-react";
import api from "../../config/api";
import { toast } from "react-hot-toast";
import ViewOrderModal from "../../components/partner/modal/ViewOrderModal";

const filters = [
  "All",
  "placed",
  "confirmed",
  "preparing",
  "picked",
  "delivered",
  "cancelled",
];

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
  placed: "bg-blue-50 text-blue-600 border-blue-100",
  confirmed: "bg-cyan-50 text-cyan-600 border-cyan-100",
  preparing: "bg-orange-50 text-orange-600 border-orange-100",
  picked: "bg-violet-50 text-violet-600 border-violet-100",
  delivered: "bg-emerald-50 text-emerald-600 border-emerald-100",
  cancelled: "bg-red-50 text-red-500 border-red-100",
};

const capitalizeStatus = (status) => {
  return status.charAt(0).toUpperCase() + status.slice(1);
};

const PartnerOrders = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [stats, setStats] = useState({
    total: 0,
    preparing: 0,
    delivered: 0,
    revenue: 0,
  });
  const itemsPerPage = 10;
  const orderState = {
    pending: ["accepted", "rejected", "cancelled"],

    accept: [
      "accepted",
      "confirmed",
      "preparing",
      "ready",
      "picked",
      "on_the_way",
      "delivered",
      "cancelled",
      "rejected",
    ],

    preparing: [
      "preparing",
      "ready",
      "picked",
      "on_the_way",
      "delivered",
      "cancelled",
      "rejected",
    ],

    ready: [
      "ready",
      "picked",
      "on_the_way",
      "delivered",
      "cancelled",
      "rejected",
    ],

    picked: ["picked", "on_the_way", "delivered", "cancelled", "rejected"],

    on_the_way: ["delivered"],

    delivered: [],

    cancelled: [],

    rejected: [],
  };

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Fetch orders from API
  const fetchOrders = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get("/partner/orders", {
        params: {
          page,
          limit: itemsPerPage,
        },
      });

      const data = response.data.data || [];
      setOrders(data);
      setCurrentPage(page);
      setTotalPages(Math.ceil(response.data.pagination.total / itemsPerPage));

      // Calculate stats
      const totalOrders = response.data.pagination.total;
      const preparingCount = data.filter(
        (o) => o.status === "preparing",
      ).length;
      const deliveredCount = data.filter(
        (o) => o.status === "delivered",
      ).length;
      const totalRevenue = data.reduce((sum, o) => sum + (o.total || 0), 0);

      setStats({
        total: totalOrders,
        preparing: preparingCount,
        delivered: deliveredCount,
        revenue: totalRevenue,
      });
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError(err.response?.data?.message || "Failed to fetch orders");
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  // Fetch on mount
  useEffect(() => {
    fetchOrders(1);
  }, []);

  // Filter and search
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const searchMatch =
        order.customer?.name
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        order.orderId?.toLowerCase().includes(searchQuery.toLowerCase());

      const filterMatch =
        activeFilter === "All"
          ? true
          : order.status === activeFilter.toLowerCase();

      return searchMatch && filterMatch;
    });
  }, [searchQuery, activeFilter, orders]);

  const updateOrderStatus = async (orderId, status) => {
    try {
      await api.patch(`/partner/orders/${orderId}/status`, {
        status,
      });
      toast.success(`${orderId} marked as ${capitalizeStatus(status)}`);
      // Update local state
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status } : order,
        ),
      );
    } catch (err) {
      console.error("Error updating order status:", err);
      toast.error("Failed to update order status");
    }
  };

  return (
    <main className="min-h-screen bg-[#faf7f4] text-slate-900">
      <div className="">
        {/* HEADER */}
        <header className="sticky top-0 z-30 border-b border-[#f1e5dd] bg-white/90 backdrop-blur-xl">
          <div className="flex flex-col gap-5 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-500">
                Restaurant Orders
              </p>

              <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900">
                Order Management
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Track customer orders, preparation progress, riders, and
                delivery status in real-time.
              </p>
            </div>

            <button className="inline-flex items-center gap-2 rounded-2xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-xl shadow-orange-200 transition hover:bg-orange-600">
              <ShoppingBag size={18} />
              Live Orders
            </button>
          </div>
        </header>

        <section className="space-y-8 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {/* STATS */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-[2rem] border border-[#f1e5dd] bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-slate-500">
                Total Orders
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900">
                {stats.total}
              </h2>
            </div>

            <div className="rounded-[2rem] border border-[#f1e5dd] bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-slate-500">Preparing</p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900">
                {stats.preparing}
              </h2>
            </div>

            <div className="rounded-[2rem] border border-[#f1e5dd] bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-slate-500">Delivered</p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900">
                {stats.delivered}
              </h2>
            </div>

            <div className="rounded-[2rem] border border-[#f1e5dd] bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-slate-500">Revenue</p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900">
                ₹{stats.revenue.toLocaleString("en-IN")}
              </h2>
            </div>
          </div>

          {/* FILTERS */}
          <div className="rounded-[2rem] border border-[#f1e5dd] bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              {/* SEARCH */}
              <div className="flex flex-1 items-center gap-3 rounded-2xl border border-[#f1e5dd] bg-[#faf7f4] px-4 py-3">
                <Search size={18} className="text-orange-500" />

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search orders..."
                  className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                />
              </div>

              {/* FILTERS */}
              <div className="flex flex-wrap gap-2">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                      activeFilter === filter
                        ? "bg-orange-500 text-white shadow-lg shadow-orange-200"
                        : "border border-[#f1e5dd] bg-white text-slate-600 hover:border-orange-200 hover:bg-orange-50 hover:text-orange-500"
                    }`}
                  >
                    {filter === "All" ? "All" : capitalizeStatus(filter)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ERROR STATE */}
          {error && (
            <div className="rounded-[2rem] border border-red-100 bg-red-50 p-6">
              <div className="flex items-start gap-4">
                <AlertCircle className="mt-1 text-red-500" size={20} />
                <div>
                  <h3 className="font-semibold text-red-900">
                    Failed to load orders
                  </h3>
                  <p className="mt-2 text-sm text-red-700">{error}</p>
                  <button
                    onClick={() => fetchOrders(1)}
                    className="mt-4 inline-flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* LOADING STATE */}
          {loading && (
            <div className="space-y-5">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse rounded-[2rem] border border-[#f1e5dd] bg-white p-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="h-8 w-32 rounded-lg bg-slate-200" />
                      <div className="h-6 w-24 rounded-full bg-slate-200" />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-6 w-full rounded bg-slate-200" />
                      <div className="h-6 w-full rounded bg-slate-200" />
                      <div className="h-6 w-full rounded bg-slate-200" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ORDERS */}
          {!loading && (
            <>
              <div className="space-y-5">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <div
                      key={order._id}
                      className="overflow-hidden rounded-[2rem] border border-[#f1e5dd] bg-white shadow-sm transition hover:shadow-xl"
                    >
                      <div className="grid gap-6 p-6 lg:grid-cols-[1fr_auto] lg:items-center">
                        {/* LEFT */}
                        <div>
                          {/* TOP */}
                          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                            <div>
                              <div className="flex flex-wrap items-center gap-3">
                                <h2 className="text-2xl font-black tracking-tight text-slate-900">
                                  {order.orderId ||
                                    "#" + order._id.slice(-6).toUpperCase()}
                                </h2>

                                <div
                                  className={`rounded-full border px-4 py-2 text-xs font-bold ${
                                    statusColors[order.status]
                                  }`}
                                >
                                  {capitalizeStatus(order.status)}
                                </div>
                              </div>

                              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                                <div className="flex items-center gap-2">
                                  <Clock3 size={16} />
                                  {getRelativeTime(order.createdAt)}
                                </div>

                                <div className="flex items-center gap-2">
                                  <ShoppingBag size={16} />
                                  {order.items?.length || 0} Items
                                </div>
                              </div>
                            </div>

                            <div className="rounded-[1.5rem] bg-orange-50 px-5 py-4 text-center">
                              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500">
                                Order Amount
                              </p>

                              <h3 className="mt-2 text-3xl font-black tracking-tight text-slate-900">
                                ₹{order.total}
                              </h3>
                            </div>
                          </div>

                          {/* CUSTOMER */}
                          <div className="mt-6 grid gap-4  lg:grid-cols-3">
                            <div className="rounded-2xl border border-[#f5ebe4] bg-[#fffaf7] p-4">
                              <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                                  <User2 size={20} />
                                </div>

                                <div>
                                  <p className="text-sm font-bold text-slate-900">
                                    {order.customer?.name || "Unknown"}
                                  </p>

                                  <p className="mt-1 text-xs text-slate-500">
                                    Customer
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
                                  <p className="text-sm font-bold text-slate-900">
                                    {order.customer?.phone ||
                                      order.customer?.email ||
                                      "N/A"}
                                  </p>

                                  <p className="mt-1 text-xs text-slate-500">
                                    Contact
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="rounded-2xl border border-[#f5ebe4] bg-[#fffaf7] p-4">
                              <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                                  <Bike size={20} />
                                </div>

                                <div>
                                  <p className="text-sm font-bold text-slate-900">
                                    {order.status === "picked"
                                      ? "Assigned"
                                      : "Waiting"}
                                  </p>

                                  <p className="mt-1 text-xs text-slate-500">
                                    Delivery
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* ADDRESS */}
                          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-[#f5ebe4] bg-[#fffaf7] p-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                              <MapPin size={20} />
                            </div>

                            <div>
                              <p className="text-sm font-bold text-slate-900">
                                Delivery Address
                              </p>

                              <p className="mt-2 text-sm leading-7 text-slate-500">
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

                        {/* RIGHT ACTIONS */}
                        <div className="grid grid-cols-2 gap-3 lg:w-[210px]">
                          <button
                            onClick={() =>
                              updateOrderStatus(order._id, "confirmed")
                            }
                            disabled={orderState.accept?.includes(order.status)}
                            className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-[#f1e5dd] bg-white px-4 py-5 text-xs font-semibold text-slate-600 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-500
                            disabled:cursor-not-allowed disabled:bg-green-300 "
                          >
                            <CheckCircle2 size={18} />
                            {orderState.accept?.includes(order.status)
                              ? "Accepted"
                              : "Accept"}
                          </button>

                          <button
                            onClick={() =>
                              updateOrderStatus(order._id, "preparing")
                            }
                            disabled={orderState.preparing?.includes(
                              order.status,
                            )}
                            className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-[#f1e5dd] bg-white px-4 py-5 text-xs font-semibold text-slate-600 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-500 disabled:cursor-not-allowed disabled:bg-orange-300"
                          >
                            <Flame size={18} />
                            Preparing
                          </button>

                          <button
                            onClick={() =>
                              updateOrderStatus(order._id, "ready")
                            }
                            disabled={
                              orderState.ready?.includes(order.status) ||
                              order.status === "cancelled"
                            }
                            className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-[#f1e5dd] bg-white px-4 py-5 text-xs font-semibold text-slate-600 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-500 disabled:cursor-not-allowed disabled:bg-orange-300"
                          >
                            <Clock size={18} />
                            Ready
                          </button>

                          <button
                            onClick={() =>
                              updateOrderStatus(order._id, "cancelled")
                            }
                            disabled={
                              orderState.cancelled?.includes(order.status) ||
                              order.status === "cancelled"
                            }
                            className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-red-100 bg-red-50 px-4 py-5 text-xs font-semibold text-red-500 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:bg-red-300"
                          >
                            <XCircle size={18} />
                            Cancel
                          </button>
                        </div>
                      </div>

                      {/* FOOTER */}
                      <div className="flex flex-col gap-4 border-t border-[#f5ebe4] bg-[#fffdfb] px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex items-center gap-3 text-sm text-slate-500">
                          <div
                            className={`h-2.5 w-2.5 rounded-full ${
                              order.paymentStatus === "paid"
                                ? "bg-emerald-500"
                                : order.paymentStatus === "failed"
                                  ? "bg-red-500"
                                  : "bg-orange-500"
                            }`}
                          />
                          Payment:
                          <span className="font-bold text-slate-900 capitalize">
                            {order.paymentStatus}
                          </span>
                        </div>

                        <button
                          onClick={() => {
                            setSelectedOrder(order);
                            setIsModalOpen(true);
                          }}
                          className="inline-flex items-center gap-2 rounded-2xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600"
                        >
                          View Full Order
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center rounded-[2rem] border border-dashed border-[#f1e5dd] bg-white px-6 py-20 text-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-[2rem] bg-orange-50 text-orange-500">
                      <Search size={32} />
                    </div>

                    <h2 className="mt-6 text-2xl font-black tracking-tight text-slate-900">
                      No orders found
                    </h2>

                    <p className="mt-3 max-w-md text-sm leading-7 text-slate-500">
                      Try changing filters or wait for incoming customer orders.
                    </p>
                  </div>
                )}
              </div>

              {/* PAGINATION */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between rounded-[2rem] border border-[#f1e5dd] bg-white p-6">
                  <p className="text-sm text-slate-600">
                    Page <span className="font-bold">{currentPage}</span> of{" "}
                    <span className="font-bold">{totalPages}</span>
                  </p>

                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        currentPage > 1 && fetchOrders(currentPage - 1)
                      }
                      disabled={currentPage === 1}
                      className="flex items-center gap-2 rounded-lg border border-[#f1e5dd] bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition disabled:opacity-50 hover:border-orange-200 hover:bg-orange-50 hover:text-orange-500"
                    >
                      <ChevronLeft size={16} />
                      Previous
                    </button>

                    <div className="flex gap-1">
                      {[...Array(totalPages)].map((_, i) => (
                        <button
                          key={i + 1}
                          onClick={() => fetchOrders(i + 1)}
                          className={`h-10 w-10 rounded-lg text-sm font-semibold transition ${
                            currentPage === i + 1
                              ? "bg-orange-500 text-white"
                              : "border border-[#f1e5dd] bg-white text-slate-600 hover:border-orange-200 hover:bg-orange-50 hover:text-orange-500"
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() =>
                        currentPage < totalPages && fetchOrders(currentPage + 1)
                      }
                      disabled={currentPage === totalPages}
                      className="flex items-center gap-2 rounded-lg border border-[#f1e5dd] bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition disabled:opacity-50 hover:border-orange-200 hover:bg-orange-50 hover:text-orange-500"
                    >
                      Next
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </section>
      </div>

      {/* VIEW ORDER MODAL */}
      <ViewOrderModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedOrder(null);
        }}
        order={selectedOrder}
        onOrderUpdate={(updatedOrder) => {
          // Update the order in the list
          setOrders(
            orders.map((o) => (o._id === updatedOrder._id ? updatedOrder : o)),
          );
        }}
      />
    </main>
  );
};

export default PartnerOrders;
