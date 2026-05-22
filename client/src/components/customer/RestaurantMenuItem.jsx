import {
  Flame,
  Minus,
  Plus,
  ShoppingCart,
  Sparkles,
  Star,
} from "lucide-react";

import { useMemo, useState } from "react";

import useUiStore from "../../store/useUiStore";

const FALLBACK_IMAGE =
  "https://placehold.co/800x600/f97316/ffffff?text=No+Image";

export const RestaurantMenuItem = ({
  item,
}) => {
  const [imageFailed, setImageFailed] =
    useState(false);

  const {
    cart,
    addToCart,
    removeFromCart,
  } = useUiStore();

  /* CART ITEM */

  const cartItem = useMemo(
    () =>
      cart.find(
        (cartItem) =>
          cartItem._id === item._id,
      ) || {
        quantity: 0,
      },
    [cart, item._id],
  );

  const quantity = cartItem.quantity;

  /* IMAGE */

  const imageSrc = useMemo(() => {
    return (
      item?.images?.[0]?.url ||
      item?.image?.url ||
      item?.image ||
      FALLBACK_IMAGE
    );
  }, [item]);

  /* DATA */

  const rating = Number.isFinite(
    Number(item?.rating),
  )
    ? Number(item.rating)
    : 4.5;

  const price = Number.isFinite(
    Number(item?.price),
  )
    ? Number(item.price)
    : null;

  const category =
    item?.category?.trim();

  return (
    <article
      className="
        group overflow-hidden
        rounded-3xl
        border border-(--border)
        bg-white
        shadow-sm
        transition-all duration-300
        hover:-translate-y-0.5
        hover:shadow-xl
      "
    >
      <div className="grid gap-0 lg:grid-cols-[1fr_320px]">
        {/* CONTENT */}
        <div
          className="
            order-2 flex flex-col justify-between
            p-5 sm:p-6 lg:order-1 lg:p-7
          "
        >
          <div className="space-y-4">
            {/* TOP */}
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                {/* BADGES */}
                <div className="flex flex-wrap items-center gap-2">
                  {/* VEG/NON VEG */}
                  <span
                    className={`
                      inline-flex h-5 w-5 shrink-0
                      items-center justify-center
                      rounded-sm border-2
                      ${
                        item?.isVeg
                          ? "border-emerald-600"
                          : "border-red-600"
                      }
                    `}
                  >
                    <span
                      className={`
                        h-2.5 w-2.5 rounded-full
                        ${
                          item?.isVeg
                            ? "bg-emerald-600"
                            : "bg-red-600"
                        }
                      `}
                    />
                  </span>

                  {/* CATEGORY */}
                  {category && (
                    <span
                      className="
                        rounded-full
                        bg-slate-100
                        px-2.5 py-1
                        text-xs font-semibold
                        text-slate-600
                      "
                    >
                      {category}
                    </span>
                  )}

                  {/* BESTSELLER */}
                  {item?.bestseller && (
                    <span
                      className="
                        inline-flex items-center gap-1
                        rounded-full
                        bg-orange-50
                        px-2.5 py-1
                        text-xs font-semibold
                        text-(--primary)
                      "
                    >
                      <Flame size={12} />
                      Bestseller
                    </span>
                  )}

                  {/* SPICY */}
                  {item?.spicy && (
                    <span
                      className="
                        inline-flex items-center gap-1
                        rounded-full
                        bg-rose-50
                        px-2.5 py-1
                        text-xs font-semibold
                        text-rose-600
                      "
                    >
                      <Sparkles size={12} />
                      Spicy
                    </span>
                  )}
                </div>

                {/* NAME */}
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <h3
                    className="
                      text-xl font-bold tracking-tight
                      text-(--text-primary)
                      sm:text-2xl
                    "
                  >
                    {item?.name ||
                      "Menu item"}
                  </h3>

                  {/* RATING */}
                  <div
                    className="
                      inline-flex items-center gap-1
                      rounded-full
                      bg-emerald-50
                      px-2.5 py-1
                      text-sm font-semibold
                      text-emerald-700
                    "
                  >
                    <Star
                      size={14}
                      fill="currentColor"
                    />

                    <span>
                      {rating.toFixed(1)}
                    </span>
                  </div>
                </div>

                {/* EXTRA */}
                <div
                  className="
                    mt-3 flex flex-wrap
                    items-center gap-3
                    text-sm text-(--text-secondary)
                  "
                >
                  {item?.prepTime && (
                    <span
                      className="
                        rounded-full
                        bg-slate-100
                        px-2.5 py-1
                        font-medium
                        text-slate-600
                      "
                    >
                      {item.prepTime}
                    </span>
                  )}

                  {item?.calories && (
                    <span
                      className="
                        rounded-full
                        bg-slate-100
                        px-2.5 py-1
                        font-medium
                        text-slate-600
                      "
                    >
                      {item.calories} cal
                    </span>
                  )}
                </div>
              </div>

              {/* PRICE */}
              <div className="text-right">
                <p
                  className="
                    text-xs font-semibold uppercase
                    tracking-widest
                    text-(--text-secondary)
                  "
                >
                  Price
                </p>

                <p
                  className="
                    mt-1 text-2xl font-extrabold
                    tracking-tight
                    text-(--text-primary)
                  "
                >
                  {price !== null
                    ? `₹${price}`
                    : "-"}
                </p>
              </div>
            </div>

            {/* DESCRIPTION */}
            {item?.description && (
              <p
                className="
                  line-clamp-3 max-w-3xl
                  text-sm leading-7
                  text-(--text-secondary)
                  sm:text-[15px]
                "
              >
                {item.description}
              </p>
            )}
          </div>

          {/* ACTIONS */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {quantity === 0 ? (
              <button
                type="button"
                onClick={() =>
                  addToCart(item)
                }
                className="
                  inline-flex items-center gap-2
                  rounded-2xl
                  bg-(--primary)
                  px-5 py-3
                  text-sm font-semibold
                  text-white
                  shadow-sm
                  transition-all
                  hover:-translate-y-0.5
                  hover:bg-[#e85a28]
                "
              >
                <ShoppingCart
                  size={18}
                />

                Add to cart
              </button>
            ) : (
              <div
                className="
                  inline-flex items-center
                  rounded-2xl
                  border border-orange-200
                  bg-orange-50/60
                  p-1 shadow-sm
                "
              >
                {/* REMOVE */}
                <button
                  type="button"
                  onClick={() =>
                    removeFromCart(item)
                  }
                  className="
                    inline-flex h-10 w-10
                    items-center justify-center
                    rounded-xl
                    text-(--primary)
                    transition
                    hover:bg-white
                    hover:shadow-sm
                  "
                >
                  <Minus size={16} />
                </button>

                {/* QUANTITY */}
                <span
                  className="
                    min-w-10 px-3
                    text-center text-base
                    font-bold
                    text-(--text-primary)
                  "
                >
                  {quantity}
                </span>

                {/* ADD */}
                <button
                  type="button"
                  onClick={() =>
                    addToCart(item)
                  }
                  className="
                    inline-flex h-10 w-10
                    items-center justify-center
                    rounded-xl
                    bg-(--primary)
                    text-white
                    transition
                    hover:scale-105
                  "
                >
                  <Plus size={16} />
                </button>
              </div>
            )}

            {/* TEXT */}
            {quantity > 0 && (
              <p
                className="
                  text-sm font-medium
                  text-(--text-secondary)
                "
              >
                {quantity} item
                {quantity > 1
                  ? "s"
                  : ""}{" "}
                selected
              </p>
            )}
          </div>
        </div>

        {/* IMAGE */}
        <div
          className="
            order-1 relative h-56 overflow-hidden
            bg-slate-100
            lg:order-2 lg:min-h-full
          "
        >
          <img
            src={
              imageFailed
                ? FALLBACK_IMAGE
                : imageSrc
            }
            alt={
              item?.name ||
              "Menu item"
            }
            className="
              h-full w-full object-cover
              transition-transform duration-500
              group-hover:scale-105
            "
            onError={() =>
              setImageFailed(true)
            }
            loading="lazy"
          />

          <div
            className="
              absolute inset-0
              bg-linear-to-t
              from-black/25
              via-black/0
              to-transparent
            "
          />

          {/* FLOATING BADGE */}
          {item?.bestseller && (
            <div
              className="
                absolute left-4 top-4
                inline-flex items-center gap-1
                rounded-full
                bg-white/90
                px-3 py-1.5
                text-xs font-semibold
                text-(--text-primary)
                shadow-sm backdrop-blur
              "
            >
              <Flame
                size={12}
                className="text-(--primary)"
              />

              Chef's pick
            </div>
          )}

          {/* CART FLOAT */}
          {quantity > 0 && (
            <div
              className="
                absolute bottom-4 right-4
                rounded-2xl
                bg-white/95
                px-4 py-2
                shadow-xl backdrop-blur
              "
            >
              <p
                className="
                  text-sm font-black
                  text-(--primary)
                "
              >
                {quantity} in cart
              </p>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};