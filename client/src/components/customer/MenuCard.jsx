import { Clock3, Flame, Minus, Plus, ShoppingCart, Star } from "lucide-react";

import { useMemo } from "react";

import useUiStore from "../../store/useUiStore";
import { useNavigate } from "react-router-dom";

const MenuCard = ({ item }) => {
  const { cart, addToCart, removeFromCart } = useUiStore();
  const navigate = useNavigate();

  const itemInCart = useMemo(
    () =>
      cart.find((i) => i._id === item._id) || {
        quantity: 0,
      },
    [cart, item._id],
  );

  return (
    <div
      onClick={() =>
        navigate(`/customer/restaurant/${item?.restaurant}/${item?._id}`, {
          state: { menuItem: item },
        })
      }
      className="
        group overflow-hidden
        rounded-[2rem]
        border border-(--border)
        bg-white
        shadow-sm
        transition-all duration-500
        hover:-translate-y-1
        hover:shadow-2xl
      "
    >
      {/* IMAGE */}
      <div className="relative h-60 overflow-hidden bg-[#fafafa]">
        <img
          src={
            item?.images?.[0]?.url ||
            `https://placehold.co/600x400/orange/white?text=${item?.name}`
          }
          alt={item?.name}
          className="
            h-full w-full object-cover
            transition duration-700
            group-hover:scale-110
          "
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* TOP */}
        <div className="absolute left-4 right-4 top-4 flex items-start justify-between">
          {/* VEG/NON VEG */}
          <div className="rounded-xl bg-white/90 p-2 backdrop-blur">
            {item?.isVeg ? (
              <div className="flex h-5 w-5 items-center justify-center border-2 border-green-600">
                <div className="h-2.5 w-2.5 rounded-full bg-green-600" />
              </div>
            ) : (
              <div className="flex h-5 w-5 items-center justify-center border-2 border-red-600">
                <div className="h-2.5 w-2.5 rounded-full bg-red-600" />
              </div>
            )}
          </div>

          {/* RATING */}
          <div
            className="
              flex items-center gap-1
              rounded-full
              bg-emerald-500
              px-3 py-1.5
              text-sm font-bold
              text-white
              shadow-lg
            "
          >
            <Star size={14} fill="currentColor" />

            {item?.rating || 4.5}
          </div>
        </div>

        {/* BOTTOM */}
        <div className="absolute bottom-0 left-0 w-full p-5 text-white">
          <div className="flex items-end justify-between gap-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="truncate text-2xl font-black tracking-tight">
                  {item?.name}
                </h3>

                {item?.bestseller && (
                  <div
                    className="
                      inline-flex items-center gap-1
                      rounded-full
                      bg-orange-500
                      px-2.5 py-1
                      text-[11px]
                      font-bold
                      text-white
                    "
                  >
                    <Flame size={12} />
                    Bestseller
                  </div>
                )}
              </div>

              <div className="mt-2 flex items-center gap-2 text-sm text-white/80">
                <Clock3 size={14} />

                <span>{item?.deliveryTime || "20-30 mins"}</span>
              </div>
            </div>

            {/* PRICE */}
            <div className="rounded-2xl bg-white/10 px-4 py-2 backdrop-blur">
              <p className="text-xs font-medium text-white/60">Starting at</p>

              <p className="text-2xl font-black">₹{item?.price}</p>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5">
        {/* DESCRIPTION */}
        <p className="line-clamp-3 text-sm leading-7 text-(--text-secondary)">
          {item?.description ||
            "Freshly prepared with premium ingredients and authentic flavors."}
        </p>

        {/* FOOTER */}
        <div className="mt-6 flex items-center justify-between gap-4">
          {/* CATEGORY */}
          <div className="flex flex-wrap gap-2">
            {item?.category && (
              <span
                className="
                  rounded-full
                  border border-orange-100
                  bg-orange-50
                  px-3 py-1
                  text-xs
                  font-bold
                  text-(--primary)
                "
              >
                {item.category}
              </span>
            )}
          </div>

          {/* CART ACTION */}
          {itemInCart.quantity === 0 ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(item);
              }}
              className="
                inline-flex items-center gap-2
                rounded-2xl
                bg-(--primary)
                px-5 py-3
                text-sm font-bold
                text-white
                shadow-lg
                transition-all duration-300
                hover:scale-105
                active:scale-95
              "
            >
              <ShoppingCart size={17} />
              Add
            </button>
          ) : (
            <div
              className="
                flex items-center gap-4
                rounded-2xl
                border border-(--primary)
                bg-orange-50/50
                px-3 py-2
              "
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromCart(item);
                }}
                className="
                  rounded-xl
                  bg-white
                  p-2
                  text-(--primary)
                  shadow-sm
                  transition hover:scale-105
                "
              >
                <Minus size={15} />
              </button>

              <span className="min-w-[20px] text-center text-lg font-black text-(--text-primary)">
                {itemInCart.quantity}
              </span>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(item);
                }}
                className="
                  rounded-xl
                  bg-(--primary)
                  p-2
                  text-white
                  shadow-sm
                  transition hover:scale-105
                "
              >
                <Plus size={15} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* HOVER RING */}
      <div
        className="
          pointer-events-none absolute inset-0
          rounded-[2rem]
          ring-0 ring-(--primary)/20
          transition-all duration-500
          group-hover:ring-4
        "
      />
    </div>
  );
};

export default MenuCard;
