import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";

import {
  CheckCircle2,
  Home,
  Package,
  Clock3,
  MapPin,
  XCircle,
  RefreshCcw,
  AlertTriangle,
  ReceiptText,
  Wallet,
  CookingPot,
  ArrowRight,
  LoaderCircle,
} from "lucide-react";

import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import api from "../../config/api";

const OrderStatusPage = () => {
  const navigate = useNavigate();

  const { status, id } = useParams();

  const location = useLocation();

  const stateOrder =
    location?.state?.order || null;

  const [orderData, setOrderData] =
    useState(stateOrder);

  const [isLoading, setIsLoading] =
    useState(false);

  const isFailed =
    status === "failed" ||
    status === "cancelled";

  const isSuccess = !isFailed;

  useEffect(() => {
    const fetchOrder =
      async () => {
        if (orderData || !id || id == "null") return;

        try {
          setIsLoading(true);

          const res = await api.get(
            `/customer/order/${id}`
          );

          setOrderData(
            res.data.order
          );
        } catch (error) {
          console.log(
            "Error fetching order:",
            error
          );
        } finally {
          setIsLoading(false);
        }
      };

    fetchOrder();
  }, [id, orderData]);

  const order = {
    id:
      orderData?.orderId ||
      (orderData?._id
        ? `CRV-${orderData._id
            .slice(-8)
            .toUpperCase()}`
        : "CRV-PENDING"),

    amount:
      Number(
        orderData?.total
      ) || 0,

    itemCount: Array.isArray(
      orderData?.items
    )
      ? orderData.items.reduce(
          (sum, item) =>
            sum +
            (Number(
              item?.quantity
            ) || 0),
          0
        )
      : 0,

    paymentMethod:
      orderData?.paymentMethod ||
      "cod",

    eta: "25-35 mins",

    address:
      [
        orderData
          ?.deliveryAddress
          ?.address,

        orderData
          ?.deliveryAddress
          ?.city,

        orderData
          ?.deliveryAddress
          ?.pin,
      ]
        .filter(Boolean)
        .join(", ") ||
      "Address unavailable",
  };

  const paymentLabel =
    order.paymentMethod ===
    "cod"
      ? "Cash on Delivery"
      : order.paymentMethod?.toUpperCase();

  

  const config = isSuccess
    ? {
        title:
          "Order Confirmed",

        subtitle:
          "Your order has been accepted by the restaurant and is now being prepared.",

        gradient:
          "from-[#0ea5a5] via-[#16a34a] to-[#65a30d]",

        softBg:
          "bg-emerald-100/70",

        iconBg:
          "bg-white/20",

        primary:
          "text-emerald-600",

        button:
          "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-200",

        pulse:
          "bg-emerald-300/30",

        icon:
          CheckCircle2,
      }
    : {
        title:
          "Order Failed",

        subtitle:
          "We could not complete your order this time.",

        gradient:
          "from-[#dc2626] via-[#ef4444] to-[#f97316]",

        softBg:
          "bg-rose-100/70",

        iconBg:
          "bg-white/15",

        primary:
          "text-red-600",

        button:
          "bg-red-500 hover:bg-red-600 shadow-red-200",

        pulse:
          "bg-red-300/20",

        icon: XCircle,
      };

  const Icon = config.icon;

 

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f8f2]">
        <div className="flex flex-col items-center gap-4">
          <LoaderCircle
            size={42}
            className="animate-spin text-(--primary)"
          />

          <p className="text-sm font-semibold text-slate-600">
            Loading order...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f7f8f2] px-4 py-8 sm:px-6 sm:py-10">
      {/* BACKGROUND */}
      <div
        className={`absolute -left-20 top-6 h-72 w-72 rounded-full ${config.pulse} blur-3xl`}
      />

      <div
        className={`absolute bottom-0 right-0 h-96 w-96 rounded-full ${config.pulse} blur-3xl`}
      />

      {/* CARD */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.92,
          y: 40,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        transition={{
          duration: 0.45,
          ease: "easeOut",
        }}
        className="relative z-10 mx-auto w-full max-w-4xl overflow-hidden rounded-[2.2rem] border border-[#e9e2d8] bg-[#fffef9] shadow-[0_35px_90px_rgba(15,23,42,0.1)]"
      >
        <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
          {/* LEFT */}
          <div
            className={`relative overflow-hidden bg-linear-to-br ${config.gradient} px-6 py-10 text-white sm:px-9 sm:py-12`}
          >
            <div className="absolute -right-10 -top-10 h-56 w-56 rounded-full bg-white/10 blur-3xl" />

            <div className="absolute -bottom-16 -left-10 h-44 w-44 rounded-full bg-black/10 blur-3xl" />

            <div className="relative z-10">
              {/* ICON */}
              <motion.div
                initial={{
                  scale: 0,
                  rotate: isSuccess
                    ? -20
                    : 20,
                }}
                animate={{
                  scale: 1,
                  rotate: 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 180,
                  damping: 12,
                }}
                className={`relative flex h-28 w-28 items-center justify-center rounded-full ${config.iconBg} backdrop-blur`}
              >
                {isSuccess ? (
                  <div className="absolute inset-0 animate-ping rounded-full bg-white/20" />
                ) : (
                  <motion.div
                    animate={{
                      scale: [
                        1,
                        1.08,
                        1,
                      ],
                    }}
                    transition={{
                      repeat:
                        Infinity,
                      duration: 1.5,
                    }}
                    className="absolute inset-0 rounded-full border-4 border-white/20"
                  />
                )}

                <Icon
                  size={64}
                  className="relative z-10"
                />
              </motion.div>

              {/* TITLE */}
              <h1 className="mt-6 text-4xl font-black tracking-tight">
                {config.title}
              </h1>

              {/* SUBTITLE */}
              <p className="mt-3 max-w-md text-sm leading-7 text-white/90 sm:text-base">
                {config.subtitle}
              </p>

              {/* SUCCESS ETA */}
              {isSuccess && (
                <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold">
                  <Clock3 size={16} />

                  {order.eta}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-5 p-6 sm:p-8">
            {/* ORDER ID */}
            <motion.div
              initial={{
                opacity: 0,
                y: 18,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.3,
              }}
              className="rounded-3xl border border-[#ece3d7] bg-white p-5"
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                Order Reference
              </p>

              <p className="mt-2 text-2xl font-black tracking-tight text-slate-900">
                {order.id}
              </p>
            </motion.div>

            {/* SUCCESS CONTENT */}
            {isSuccess && (
              <>
                {/* GRID */}
                <div className="grid gap-4 sm:grid-cols-2">
                  {/* AMOUNT */}
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 18,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: 0.4,
                    }}
                    className="rounded-3xl border border-[#ece3d7] bg-white p-5"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                        <Wallet
                          size={20}
                        />
                      </div>

                      <div>
                        <p className="text-sm text-slate-500">
                          Total
                        </p>

                        <h3 className="text-xl font-black text-slate-900">
                          ₹{" "}
                          {
                            order.amount
                          }
                        </h3>
                      </div>
                    </div>
                  </motion.div>

                  {/* ITEMS */}
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 18,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: 0.5,
                    }}
                    className="rounded-3xl border border-[#ece3d7] bg-white p-5"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                        <Package
                          size={20}
                        />
                      </div>

                      <div>
                        <p className="text-sm text-slate-500">
                          Items
                        </p>

                        <h3 className="text-xl font-black text-slate-900">
                          {
                            order.itemCount
                          }
                        </h3>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* PAYMENT */}
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 18,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.6,
                  }}
                  className="rounded-3xl border border-[#ece3d7] bg-white p-5"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600">
                      <ReceiptText
                        size={20}
                      />
                    </div>

                    <div>
                      <p className="text-sm text-slate-500">
                        Payment
                        Method
                      </p>

                      <h3 className="text-lg font-black text-slate-900">
                        {
                          paymentLabel
                        }
                      </h3>
                    </div>
                  </div>
                </motion.div>

                {/* ADDRESS */}
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 18,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.7,
                  }}
                  className="rounded-3xl border border-[#ece3d7] bg-white p-5"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                      <MapPin
                        size={20}
                      />
                    </div>

                    <div>
                      <p className="text-sm text-slate-500">
                        Delivery
                        Address
                      </p>

                      <h3 className="mt-1 text-base font-bold text-slate-900">
                        {
                          order.address
                        }
                      </h3>
                    </div>
                  </div>
                </motion.div>
              </>
            )}

            {/* FAILED CONTENT */}
            {isFailed && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 18,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.4,
                }}
                className="rounded-[2rem] border border-red-100 bg-red-50 p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-red-500 shadow-sm">
                    <AlertTriangle
                      size={28}
                    />
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-slate-900">
                      Order could
                      not be placed
                    </h3>

                    <ul className="mt-4 space-y-2 text-sm text-slate-600">
                      <li>
                        • Restaurant
                        unavailable
                      </li>

                      <li>
                        • Payment
                        issue
                      </li>

                      <li>
                        • Item out
                        of stock
                      </li>

                      <li>
                        • Network
                        interruption
                      </li>
                    </ul>

                    <div className="mt-5 rounded-2xl bg-white p-4 text-sm leading-6 text-slate-600">
                      Any deducted
                      amount will be
                      refunded
                      automatically.
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ACTIONS */}
            <motion.div
              initial={{
                opacity: 0,
                y: 18,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.9,
              }}
              className="grid gap-3 pt-1 sm:grid-cols-2"
            >
              <button
                onClick={() =>
                  navigate("/")
                }
                className={`inline-flex items-center justify-center gap-3 rounded-[1.2rem] px-5 py-4 text-sm font-bold text-white shadow-[0_12px_30px_rgba(15,23,42,0.12)] transition hover:scale-[1.01] ${config.button}`}
              >
                <Home size={18} />

                Back to Home
              </button>

              {isSuccess ? (
                <button
                  onClick={() =>
                    navigate(
                      "/customer/orders"
                    )
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-[1.2rem] border border-[#e9dfd1] bg-white px-5 py-4 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  View Orders

                  <ArrowRight
                    size={16}
                  />
                </button>
              ) : (
                <button
                  onClick={() =>
                    navigate(-1)
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-[1.2rem] border border-[#e9dfd1] bg-white px-5 py-4 text-sm font-bold text-slate-700 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
                >
                  <RefreshCcw
                    size={16}
                  />

                  Retry Checkout
                </button>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderStatusPage;