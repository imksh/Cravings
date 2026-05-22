import React from "react";
import { Star } from "lucide-react";

const CustomerDishCard = ({ dish, onSelect }) => {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="group overflow-hidden rounded-3xl border border-(--border) bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-2xl"
    >
      <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-linear-to-br from-[#fff7f1] via-white to-[#fff1e8] p-6">
        <img
          src={dish.image}
          alt={dish.title}
          className="w-36 object-contain transition duration-500 group-hover:scale-110"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-(--primary) shadow-sm backdrop-blur">
          {dish.badge}
        </span>
      </div>

      <div className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-(--text-primary)">
              {dish.title}
            </h3>
            <p className="mt-1 text-sm leading-6 text-(--text-secondary)">
              {dish.description}
            </p>
          </div>
          <div className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700">
            <Star size={14} fill="currentColor" />
            {dish.rating}
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-(--border) pt-3">
          <span className="text-xl font-extrabold text-(--text-primary)">
            ₹{dish.price}
          </span>
          <span className="text-sm font-medium text-(--text-secondary)">
            {dish.time}
          </span>
        </div>
      </div>
    </button>
  );
};

export default CustomerDishCard;
