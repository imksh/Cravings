import React, { useEffect, useState } from "react";

import { MapPin, ShoppingBag, Package, ReceiptText, Store } from "lucide-react";

import { useNavigate } from "react-router-dom";

import LiveOrderTrackingMap from "../LiveOrderTrackingMap";

const ActiveOrder = ({ order }) => {
  const navigate = useNavigate();
  const [activeMenuIndex, setActiveMenuIndex] = useState(0);

  const menu = Array.isArray(order?.items)
    ? order.items
        .map((item) => {
          if (!item.menu) return null;

          return {
            name: item.menu.name,
            price: item.menu.price,
            quantity: item.quantity,
            description: item.menu.description,
            image:
              item.menu?.images?.[0]?.url ||
              `https://placehold.co/600x400/ff6b35/white?text=${item?.menu?.name || "Menu"}&font=roboto`,
          };
        })
        .filter(Boolean)
    : [];

  useEffect(() => {
    if (menu.length < 2) return undefined;

    const timer = window.setInterval(() => {
      setActiveMenuIndex((currentIndex) => (currentIndex + 1) % menu.length);
    }, 3500);

    return () => window.clearInterval(timer);
  }, [menu.length]);

  if (!order) return null;

  const safeActiveMenuIndex = menu.length ? activeMenuIndex % menu.length : 0;

  const activeMenu = menu[safeActiveMenuIndex] || menu[0];

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

  return (
    <div className="overflow-hidden rounded-[2.2rem] border border-[#f1e5dd] bg-white">
      <div className="grid min-w-0 lg:grid-cols-2">
        <div className="relative">
          <div className="absolute left-4 top-4 z-10 flex gap-2 md:gap-4 w-full pr-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-orange-600 backdrop-blur">
              <div className="h-2 w-2 animate-pulse rounded-full bg-orange-500" />
              {order.status}
            </div>

            <div className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900/90 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white backdrop-blur">
              #{order.orderId}
            </div>

            <button
              onClick={() => navigate(`/customer/order/${order._id}`)}
              className="rounded-2xl bg-orange-600/90 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white backdrop-blur ml-auto"
            >
              View
            </button>
          </div>

          {/* IMAGE */}
          <div className="relative overflow-hidden">
            <img
              src={activeMenu?.image}
              className="h-56 w-full object-cover object-center"
              alt={activeMenu?.name}
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-transparent" />

            {/* IMAGE CONTENT */}
            <div className="absolute bottom-0 left-0 w-full p-5">
              <div className="flex items-end justify-between gap-4">
                <div className="min-w-0">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white backdrop-blur">
                    Quantity: {activeMenu?.quantity}
                  </div>

                  <h3 className="mt-3 truncate text-3xl font-black tracking-tight text-white">
                    {activeMenu?.name}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-sm text-white/80">
                    {activeMenu?.description ||
                      "Freshly prepared and delivered hot."}
                  </p>
                </div>

                {/* PRICE */}
                <div className="shrink-0 rounded-[1.5rem] bg-white/15 px-4 py-3 text-center text-white backdrop-blur">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/70">
                    Price
                  </p>

                  <h3 className="mt-1 text-2xl font-black">
                    ₹{activeMenu?.price}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* CONTENT */}
          <div className="space-y-2 p-1">
            {/* MENU SWITCHER */}
            {menu.length > 1 ? (
              <div className="flex items-center justify-center">
                <div className="flex flex-wrap items-center justify-center gap-2 rounded-[1.6rem] border border-[#f1e5dd] bg-white p-2 shadow-sm">
                  {menu.map((item, index) => (
                    <button
                      key={`${item?.name || "menu"}-${index}`}
                      type="button"
                      onClick={() => setActiveMenuIndex(index)}
                      className={`flex aspect-square min-w-[20px] items-center justify-center rounded-full px-2 md:px-4 text-sm font-black transition ${
                        index === safeActiveMenuIndex
                          ? "bg-(--primary) text-white shadow-lg shadow-orange-200"
                          : "bg-[#fffaf6] text-slate-600 hover:bg-orange-50"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {/* ADDRESS */}
            <div className="rounded-[1.7rem] border border-[#f1e5dd] bg-white p-5 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                  <MapPin size={20} />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                    Delivery Address
                  </p>

                  <p className="mt-2 text-sm leading-7 text-slate-700 line-clamp-3">
                    {address}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-[4fr_2fr] gap-3">
              {/* TOTAL */}
              <div className="rounded-[1.7rem] border border-[#f1e5dd] bg-white p-4 shadow-sm relative">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
                    <Store size={20} />
                  </div>

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                      Restaurant
                    </p>

                    <h3 className="mt-1 text-xl font-black text-slate-900">
                      {order.restaurant?.name}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="rounded-[1.7rem] border border-[#f1e5dd] bg-white p-4 shadow-sm relative">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                    <ReceiptText size={20} />
                  </div>

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                      Total
                    </p>

                    <h3 className="mt-1 text-xl font-black text-slate-900">
                      ₹{order.total}
                    </h3>

                    {order.paymentStatus === "pending" && (
                      <div className=" text-[12px] text-slate-400">Pending</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="z-50 bg-white p-4 flex justify-center items-center">
          <LiveOrderTrackingMap
            userLocation={{
              lat: order.deliveryAddress?.geoLocation?.coordinates[1],
              lng: order.deliveryAddress?.geoLocation?.coordinates[0],
            }}
            restaurantLocation={{
              lat: order.restaurantLocation?.coordinates[1],
              lng: order.restaurantLocation?.coordinates[0],
            }}
            riderLocation={
              order.riderLocation
                ? {
                    lat: order.riderLocation?.coordinates[1],
                    lng: order.riderLocation?.coordinates[0],
                  }
                : null
            }
            height="300px"
          />
        </div>
      </div>
    </div>
  );
};

export default ActiveOrder;
