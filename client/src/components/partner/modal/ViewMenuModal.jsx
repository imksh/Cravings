import React, { useState } from "react";
import {
  X,
  Star,
  Flame,
  Leaf,
  Clock3,
  IndianRupee,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  ImageIcon,
} from "lucide-react";
import toast from "react-hot-toast";

const ViewMenuModal = ({
  open,
  onClose,
  item,
  onEdit = () => {
    toast.success("Not Available Yet!");
  },
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!open || !item) return null;

  const images =
    item.images && item.images.length > 0
      ? item.images
      : [
          {
            url: `https://via.placeholder.com/600x400?text=${item.name || "No Image"}`,
          },
        ];

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1,
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1,
    );
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      {/* OVERLAY */}
      <button type="button" onClick={onClose} className="absolute inset-0" />

      {/* MODAL */}
      <div className="relative z-10 max-h-[95vh] w-full max-w-4xl overflow-hidden rounded-[2rem] border border-[#f1e5dd] bg-white shadow-2xl">
        {/* CLOSE */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/90 text-slate-600 shadow-lg transition hover:bg-red-50 hover:text-red-500"
        >
          <X size={20} />
        </button>

        <div className="grid max-h-[95vh] overflow-y-auto lg:grid-cols-[1.1fr_1fr]">
          {/* LEFT - IMAGES SECTION */}
          <div className="flex flex-col bg-[#faf7f4]">
            {/* MAIN IMAGE */}
            <div className="relative h-80 overflow-hidden lg:h-full">
              <img
                src={images[selectedImageIndex]?.url}
                alt={`${item.name} - ${selectedImageIndex + 1}`}
                className="h-full w-full object-cover"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />

              {/* BADGES */}
              <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                <div
                  className={`rounded-full px-4 py-2 text-xs font-bold text-white ${
                    item.isVeg ? "bg-emerald-500" : "bg-red-500"
                  }`}
                >
                  {item.isVeg ? "Veg" : "Non Veg"}
                </div>

                <div className="rounded-full bg-black/50 px-4 py-2 text-xs font-bold text-white backdrop-blur-md">
                  {item.category}
                </div>
              </div>

              {/* IMAGE COUNTER */}
              <div className="absolute right-5 top-5 rounded-full bg-black/50 px-3 py-1 text-xs font-bold text-white backdrop-blur-md">
                {selectedImageIndex + 1}/{images.length}
              </div>

              {/* IMAGE NAVIGATION */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-700 transition hover:bg-white"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-700 transition hover:bg-white"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            {/* IMAGE THUMBNAILS */}
            {images.length > 1 && (
              <div className="border-t border-[#f1e5dd] bg-white/50 p-4">
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative flex-shrink-0 overflow-hidden rounded-lg border-2 transition ${
                        selectedImageIndex === idx
                          ? "border-orange-500 shadow-lg"
                          : "border-transparent hover:border-orange-200"
                      }`}
                    >
                      <img
                        src={img.url}
                        alt={`Thumbnail ${idx + 1}`}
                        className="h-16 w-16 object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT CONTENT */}
          <div className="flex flex-col bg-white">
            {/* NAME & DESCRIPTION */}
            <div className="border-b border-[#f1e5dd] px-6 py-6">
              <h1 className="text-3xl font-black tracking-tight text-slate-900">
                {item.name}
              </h1>

              <p className="mt-3 leading-7 text-slate-600">
                {item.description}
              </p>

              {/* AVAILABILITY STATUS */}
              <div className="mt-4">
                {item.isAvailable || item.available ? (
                  <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-600">
                    <CheckCircle2 size={14} />
                    Available
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-xs font-bold text-red-500">
                    <AlertCircle size={14} />
                    Out of Stock
                  </div>
                )}
              </div>
            </div>

            {/* CONTENT */}
            <div className="flex-1 space-y-6 overflow-y-auto px-6 py-6">
              {/* PRICING CARD */}
              <div className="rounded-[2rem] border-2 border-orange-200 bg-orange-50/50 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-600">
                  Pricing
                </p>

                <div className="mt-4 flex items-end justify-between">
                  <div>
                    {item.mrp && item.mrp !== item.price && (
                      <div className="flex items-center gap-1 text-sm font-semibold text-slate-500 line-through">
                        <IndianRupee size={14} />
                        {item.mrp}
                      </div>
                    )}

                    <div className="mt-2 flex items-center gap-1 text-3xl font-black tracking-tight text-orange-600">
                      <IndianRupee size={28} />
                      {item.price}
                    </div>
                  </div>

                  <div className="flex h-16 w-16 items-center justify-center rounded-[1rem] bg-orange-500 text-white shadow-lg">
                    <IndianRupee size={28} />
                  </div>
                </div>
              </div>

              {/* KEY INFO */}
              <div className="grid gap-3">
                {/* PREPARATION TIME */}
                {item.preparationTime && (
                  <div className="flex items-start gap-4 rounded-2xl border border-[#f1e5dd] bg-white p-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                      <Clock3 size={20} />
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500">
                        Prep Time
                      </p>

                      <p className="mt-1 text-sm font-bold text-slate-900">
                        {item.preparationTime} mins
                      </p>
                    </div>
                  </div>
                )}

                {/* FOOD TYPE */}
                <div className="flex items-start gap-4 rounded-2xl border border-[#f1e5dd] bg-white p-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                    {item.isVeg ? <Leaf size={20} /> : <Flame size={20} />}
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500">
                      Type
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-900">
                      {item.isVeg ? "Vegetarian" : "Non-Vegetarian"}
                    </p>
                  </div>
                </div>

                {/* CATEGORY */}
                <div className="flex items-start gap-4 rounded-2xl border border-[#f1e5dd] bg-white p-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                    <ImageIcon size={20} />
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500">
                      Category
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-900">
                      {item.category}
                    </p>
                  </div>
                </div>
              </div>

              {/* IMAGES INFO */}
              {images.length > 0 && (
                <div className="rounded-2xl border border-[#f1e5dd] bg-white p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500">
                    Photos
                  </p>

                  <p className="mt-3 text-sm font-semibold text-slate-900">
                    {images.length} Image{images.length !== 1 ? "s" : ""}{" "}
                    Available
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {selectedImageIndex + 1} of {images.length} shown
                  </p>
                </div>
              )}
            </div>

            {/* FOOTER */}
            <div className="border-t border-[#f1e5dd] bg-white px-6 py-5">
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-2xl border border-[#f1e5dd] bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
                >
                  Close
                </button>

                <button
                  onClick={onEdit}
                  className="rounded-2xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-orange-200 transition hover:bg-orange-600"
                >
                  Edit Item
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMenuModal;
