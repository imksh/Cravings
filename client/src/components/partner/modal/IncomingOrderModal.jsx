import React from "react";
import {
  CheckCircle2,
  Clock3,
  MapPin,
  ReceiptText,
  Sparkles,
  X,
  XCircle,
} from "lucide-react";

const IncomingOrderModal = ({
  isOpen,
  order,
  onClose,
  onAccept,
  onReject,
  isLoading = false,
  actionType = null,
}) => {
  if (!isOpen || !order) return null;

  const itemsCount = Array.isArray(order.items)
    ? order.items.reduce((sum, item) => sum + (item.quantity || 0), 0)
    : 0;

  const address = [
    order.deliveryAddress?.address,
    order.deliveryAddress?.city,
    order.deliveryAddress?.pin,
  ]
    .filter(Boolean)
    .join(", ");

  const itemPreview = Array.isArray(order.items)
    ? order.items.slice(0, 3).map((item) => item?.menu?.name || "Item")
    : [];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 px-4 py-6 backdrop-blur-sm">
      <div className="mx-auto my-auto flex max-h-[calc(100dvh-3rem)] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-white/20 bg-[#fffdf8] shadow-[0_30px_90px_rgba(15,23,42,0.28)]">
        

        <div className="flex items-start justify-between gap-4 bg-slate-900 px-6 py-6 text-white">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-white/80">
              <Sparkles size={12} />
              Incoming order
            </div>
            <h2 className="mt-4 text-3xl font-black tracking-tight">
              {order.orderId || "New Order"}
            </h2>
            <p className="mt-2 text-sm leading-6 text-white/75">
              Review the incoming order and choose whether to accept it into the
              kitchen or reject it.
            </p>
          </div>

          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition hover:bg-white/10"
          >
            <X size={18} />
          </button>
        </div>

        <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-6 py-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-[#f1e5dd] bg-white p-4 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                Total
              </p>
              <p className="mt-3 text-2xl font-black text-slate-900">
                ₹{order.total || 0}
              </p>
            </div>

            <div className="rounded-3xl border border-[#f1e5dd] bg-white p-4 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                Items
              </p>
              <p className="mt-3 text-2xl font-black text-slate-900">
                {itemsCount}
              </p>
            </div>

            <div className="rounded-3xl border border-[#f1e5dd] bg-white p-4 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                Payment
              </p>
              <p className="mt-3 text-lg font-black capitalize text-slate-900">
                {order.paymentMethod === "cod"
                  ? "Cash on Delivery"
                  : order.paymentMethod?.toUpperCase() || "N/A"}
              </p>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[1.75rem] border border-[#f1e5dd] bg-white p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                    Delivery Address
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {address || "Address unavailable"}
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-[#fff8f1] p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <ReceiptText size={16} className="text-orange-500" />
                  Order items preview
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {itemPreview.length > 0 ? (
                    itemPreview.map((itemName) => (
                      <span
                        key={itemName}
                        className="rounded-full border border-[#f1e5dd] bg-white px-3 py-1 text-xs font-semibold text-slate-600"
                      >
                        {itemName}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-slate-500">
                      No item details available
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-[#f1e5dd] bg-orange-50 p-5">
              <div className="flex items-center gap-3 text-slate-700">
                <Clock3 size={18} className="text-orange-500" />
                <span className="text-sm font-semibold">
                  Action required now
                </span>
              </div>

             

              <div className="mt-6 space-y-3">
                <button
                  onClick={onAccept}
                  disabled={isLoading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 py-4 text-sm font-semibold text-white shadow-lg shadow-emerald-200 transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading && actionType === "confirmed" ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Accepting...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={18} />
                      Accept Order
                    </>
                  )}
                </button>

                <button
                  onClick={onReject}
                  disabled={isLoading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-red-100 bg-white px-5 py-4 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading && actionType === "cancelled" ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-red-200 border-t-red-500" />
                      Rejecting...
                    </>
                  ) : (
                    <>
                      <XCircle size={18} />
                      Reject Order
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomingOrderModal;
