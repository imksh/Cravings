import React, { useEffect, useState } from "react";

import {
  ArrowLeft,
  Clock3,
  LoaderCircle,
  Minus,
  Plus,
  ShoppingCart,
  Star,
  UtensilsCrossed,
  Flame,
  Leaf,
} from "lucide-react";

import { useLocation, useNavigate, useParams } from "react-router-dom";

import api from "../../config/api";
import toast from "react-hot-toast";

const MenuItem = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const location = useLocation();

  const navigationData = location.state?.menuItem;

  const [menuItem, setMenuItem] = useState(navigationData || null);

  const [isLoading, setIsLoading] = useState(!navigationData);

  const [quantity, setQuantity] = useState(1);

  const [selectedImage, setSelectedImage] = useState(0);

  /* -------------------------------- FETCH -------------------------------- */

  useEffect(() => {
    if (navigationData) return;

    const fetchMenuItem = async () => {
      try {
        setIsLoading(true);

        const res = await api.get(`/menu/${id}`);

        setMenuItem(res.data.data);
      } catch (error) {
        console.log("Error fetching menu item:", error);

        toast.error("Failed to fetch menu item");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenuItem();
  }, [id, navigationData]);

  /* ----------------------------- LOADING UI ----------------------------- */

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fffaf6]">
        <div className="flex flex-col items-center gap-4">
          <LoaderCircle size={40} className="animate-spin text-(--primary)" />

          <p className="font-medium text-slate-500">Loading menu item...</p>
        </div>
      </div>
    );
  }

  if (!menuItem) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#fffaf6]">
        <UtensilsCrossed size={52} className="text-slate-300" />

        <h2 className="text-2xl font-black text-slate-800">
          Menu item not found
        </h2>

        <button
          onClick={() => navigate(-1)}
          className="rounded-2xl bg-(--primary) px-5 py-3 font-semibold text-white"
        >
          Go Back
        </button>
      </div>
    );
  }

  const images =
    menuItem.images?.length > 0
      ? menuItem.images
      : [
          {
            url: "https://placehold.co/1000x700?text=No+Image",
          },
        ];

  const increaseQty = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQty = () => {
    if (quantity <= 1) return;

    setQuantity((prev) => prev - 1);
  };

  const totalPrice = menuItem.price * quantity;

  return (
    <div className="min-h-screen bg-[#fffaf6] pb-24">
      {/* HEADER */}
      <div className="sticky top-0 z-40 border-b border-[#f1e5dd] bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate(-1)}
            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#f1e5dd] bg-white text-slate-700 transition hover:border-orange-200 hover:bg-orange-50 hover:text-(--primary)"
          >
            <ArrowLeft size={20} />
          </button>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-500">
              Menu Item
            </p>

            <h1 className="text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
              {menuItem.name}
            </h1>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-6 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
        {/* LEFT */}
        <div className="space-y-5">
          {/* MAIN IMAGE */}
          <div className="overflow-hidden rounded-3xl border border-[#f1e5dd] bg-white shadow-md hover:shadow-xl transition-shadow">
            <div className="relative h-96 sm:h-125 overflow-hidden bg-linear-to-br from-[#f7f4f1] to-[#ede7e0] group">
              <img
                src={images[selectedImage]?.url}
                alt={menuItem.name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* OVERLAY TAGS */}
              <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                <div className="rounded-full bg-white/90 px-4 py-2 text-xs font-bold text-slate-800 backdrop-blur">
                  {menuItem.category}
                </div>

                {menuItem.isVeg ? (
                  <div className="flex items-center gap-1 rounded-full bg-emerald-500 px-4 py-2 text-xs font-bold text-white shadow-lg">
                    <Leaf size={13} />
                    Veg
                  </div>
                ) : (
                  <div className="rounded-full bg-red-500 px-4 py-2 text-xs font-bold text-white shadow-lg">
                    Non Veg
                  </div>
                )}
              </div>

              {/* AVAILABILITY */}
              <div className="absolute bottom-5 left-5">
                <div
                  className={`rounded-full px-4 py-2 text-xs font-bold shadow-xl ${
                    menuItem.isAvailable
                      ? "bg-emerald-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {menuItem.isAvailable ? "Available" : "Unavailable"}
                </div>
              </div>
            </div>

            {/* THUMBNAILS */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto p-4 bg-white border-t border-[#f1e5dd]">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-28 w-28 shrink-0 overflow-hidden rounded-xl border-3 transition-all hover:shadow-md ${
                      selectedImage === index
                        ? "border-(--primary) shadow-lg ring-2 ring-(--primary) ring-offset-2"
                        : "border-transparent hover:border-[#f1e5dd]"
                    }`}
                  >
                    <img
                      src={img.url}
                      alt=""
                      className="h-full w-full object-cover transition-transform hover:scale-110"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          {/* TITLE & INFO */}
          <div className="space-y-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 leading-tight">
                {menuItem.name}
              </h2>

              <p className="mt-3 text-slate-600 leading-relaxed text-sm sm:text-base">
                {menuItem.description}
              </p>
            </div>

            {/* RATING BADGE */}
            <div className="inline-flex items-center gap-3 rounded-full bg-linear-to-r from-yellow-50 to-amber-50 border border-yellow-100 px-5 py-3 shadow-sm">
              <div className="flex items-center gap-1">
                <Star
                  size={18}
                  className="fill-yellow-400 text-yellow-400 shrink-0"
                />
                <span className="font-black text-slate-900 text-lg">
                  {menuItem.rating?.toFixed(1) || "0.0"}
                </span>
              </div>

              <div className="h-4 w-px bg-yellow-200"></div>

              <p className="text-sm font-semibold text-slate-600">
                {menuItem.totalReviews}{" "}
                {menuItem.totalReviews === 1 ? "review" : "reviews"}
              </p>
            </div>
          </div>

          {/* PRICE SECTION */}
          <div className="rounded-2xl bg-linear-to-br from-orange-50 via-amber-50 to-orange-50 border border-orange-200 p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Price
            </p>

            <div className="flex items-baseline gap-3">
              <h3 className="text-5xl sm:text-6xl font-black text-(--primary) leading-none">
                ₹{menuItem.price}
              </h3>

              {menuItem.mrp > menuItem.price && (
                <p className="text-2xl font-bold text-slate-300 line-through">
                  ₹{menuItem.mrp}
                </p>
              )}
            </div>

            {/* OFFER BADGE */}
            {menuItem.mrp > menuItem.price && (
              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-2 text-sm font-bold text-red-700 shadow-sm">
                <Flame size={16} className="shrink-0" />
                <span>Save ₹{menuItem.mrp - menuItem.price}</span>
              </div>
            )}
          </div>

          {/* DETAILS CARDS */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#f1e5dd] bg-white p-5 shadow-sm hover:shadow-md hover:border-orange-200 transition-all">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-linear-to-br from-orange-100 to-orange-50 text-(--primary) ring-2 ring-orange-200 shrink-0">
                  <Clock3 size={28} className="stroke-[1.5]" />
                </div>

                <div className="flex-1">
                  <p className="text-xs uppercase font-bold tracking-wide text-slate-500">
                    Prep Time
                  </p>

                  <h3 className="text-2xl font-black text-slate-900 mt-1">
                    {menuItem.preparationTime}
                    <span className="text-sm font-semibold text-slate-500 ml-1">
                      min
                    </span>
                  </h3>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#f1e5dd] bg-white p-5 shadow-sm hover:shadow-md hover:border-orange-200 transition-all">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-linear-to-br from-orange-100 to-orange-50 text-(--primary) ring-2 ring-orange-200 shrink-0">
                  <UtensilsCrossed size={28} className="stroke-[1.5]" />
                </div>

                <div className="flex-1">
                  <p className="text-xs uppercase font-bold tracking-wide text-slate-500">
                    Category
                  </p>

                  <h3 className="text-2xl font-black text-slate-900 mt-1">
                    {menuItem.category}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* QUANTITY */}
          <div className="rounded-2xl border border-[#f1e5dd] bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-5">
              <div>
                <p className="text-xs uppercase font-bold tracking-wide text-slate-500">
                  Quantity
                </p>

                <h3 className="mt-2 text-4xl font-black text-slate-900">
                  {quantity}
                </h3>
              </div>

              <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-2">
                <button
                  onClick={decreaseQty}
                  className="flex h-14 w-14 items-center justify-center rounded-lg border border-[#f1e5dd] bg-white text-slate-700 transition-all hover:border-orange-200 hover:bg-orange-50 hover:text-(--primary) active:scale-95"
                  aria-label="Decrease quantity"
                >
                  <Minus size={22} className="stroke-2" />
                </button>

                <button
                  onClick={increaseQty}
                  className="flex h-14 w-14 items-center justify-center rounded-lg bg-(--primary) text-white shadow-lg shadow-orange-200 transition-all hover:scale-110 active:scale-95 font-bold"
                  aria-label="Increase quantity"
                >
                  <Plus size={22} className="stroke-2" />
                </button>
              </div>
            </div>
          </div>

          {/* TOTAL & CTA */}
          <div className="rounded-2xl border-2 border-orange-200 bg-linear-to-r from-orange-50 to-amber-50 p-6 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div>
                <p className="text-xs uppercase font-bold tracking-wider text-slate-500">
                  Total Amount
                </p>

                <h2 className="mt-3 text-5xl sm:text-6xl font-black tracking-tight text-slate-900 leading-none">
                  ₹{totalPrice}
                </h2>
              </div>

              <button
                disabled={!menuItem.isAvailable}
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-(--primary) px-8 py-4 text-base font-bold text-white shadow-2xl shadow-orange-300 transition-all hover:shadow-orange-400 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 disabled:shadow-none min-h-16 sm:min-h-auto"
              >
                <ShoppingCart size={24} className="stroke-[1.5]" />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
