import React, { useMemo, useState } from "react";

import {
  ArrowRight,
  Clock3,
  MapPin,
  Minus,
  Percent,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  X,
  Check,
  CreditCard,
  Banknote,
  Star,
} from "lucide-react";

import useUiStore from "../../store/useUiStore";
import { useAuthStore } from "../../store/useAuthStore";
import toast from "react-hot-toast";
import api from "../../config/api";
import { useNavigate } from "react-router-dom";
import AddAddressModal from "../../components/customer/modal/AddAddressModal";
import { calculateETA } from "../../utils/calculateETA";

const CartItemCard = ({ item, onIncrease, onDecrease, onRemove }) => {
  return (
    <div
      className="
        group flex flex-col gap-5
        rounded-4xl
        border border-(--border)
        bg-white
        p-5
        shadow-sm
        transition-all duration-300
        hover:-translate-y-0.5
        hover:shadow-xl
        sm:flex-row
      "
    >
      {/* IMAGE */}
      <div
        className="
          relative h-32 w-full overflow-hidden
          rounded-3xl bg-[#fafafa]
          sm:w-36
        "
      >
        <img
          src={
            item?.images?.[0]?.url ||
            item?.image ||
            `https://placehold.co/300x300/orange/white?text=${item?.name}`
          }
          alt={item?.name}
          className="
            h-full w-full object-cover
            transition duration-500
            group-hover:scale-105
          "
        />
      </div>

      {/* CONTENT */}
      <div className="flex flex-1 flex-col justify-between">
        {/* TOP */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3
              className="
                line-clamp-1
                text-xl font-black
                tracking-tight
                text-(--text-primary)
              "
            >
              {item?.name}
            </h3>

            <p className="mt-2 text-sm text-(--text-secondary)">
              {item?.restaurant?.name || "Restaurant"}
            </p>

            <p
              className="
                mt-4 text-2xl
                font-extrabold
                tracking-tight
                text-(--text-primary)
              "
            >
              ₹{item?.price}
            </p>
          </div>

          {/* REMOVE */}
          <button
            onClick={() => onRemove(item)}
            className="
              rounded-2xl
              bg-red-50
              p-3
              text-red-500
              transition-all
              hover:scale-105
              hover:bg-red-100
            "
          >
            <Trash2 size={18} />
          </button>
        </div>

        {/* QUANTITY */}
        <div className="mt-5 flex items-center justify-between">
          {/* COUNTER */}
          <div
            className="
              flex items-center gap-4
              rounded-2xl
              border border-orange-200
              bg-orange-50/50
              px-4 py-3
            "
          >
            <button
              onClick={() => onDecrease(item)}
              className="
                rounded-xl
                bg-white
                p-2
                text-(--primary)
                shadow-sm
                transition hover:scale-105
              "
            >
              <Minus size={16} />
            </button>

            <span
              className="
                min-w-6
                text-center
                text-lg font-black
                text-(--text-primary)
              "
            >
              {item.quantity}
            </span>

            <button
              onClick={() => onIncrease(item)}
              className="
                rounded-xl
                bg-(--primary)
                p-2
                text-white
                shadow-sm
                transition hover:scale-105
              "
            >
              <Plus size={16} />
            </button>
          </div>

          {/* TOTAL */}
          <p
            className="
              text-2xl font-black
              tracking-tight
              text-(--primary)
            "
          >
            ₹{item.price * item.quantity}
          </p>
        </div>
      </div>
    </div>
  );
};

const Cart = () => {
  const {
    cart,
    addToCart,
    removeFromCart,
    location,
    cartRestaurant,
    clearCart,
    setShowClearCartConfirmation,
  } = useUiStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState("");
  const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [selectedAddress, setSelectedAddress] = useState(
    user?.customer?.addresses?.[0] || null,
  );

  const eta = useMemo(() => {
    return calculateETA(
      {
        lat: cartRestaurant?.geoLocation?.coordinates[1],
        lon: cartRestaurant?.geoLocation?.coordinates[0],
      },
      {
        lat: selectedAddress?.geoLocation?.coordinates[1],
        lon: selectedAddress?.geoLocation?.coordinates[0],
      },
    );
  }, [cartRestaurant, selectedAddress]);

  const subtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cart]);

  const deliveryFee = subtotal > 499 ? 0 : 49;

  const taxes = Math.round(subtotal * 0.05);

  const coupons = {
    CRAVINGS120: { discount: 120, minOrder: 500 },
    SAVE50: { discount: 50, minOrder: 300 },
    WELCOME100: { discount: 100, minOrder: 400 },
  };

  const handleApplyCoupon = () => {
    setCouponError("");

    if (!couponCode.trim()) {
      setCouponError("Please enter a coupon code");
      return;
    }

    const upperCode = couponCode.toUpperCase().trim();

    if (!coupons[upperCode]) {
      setCouponError("Invalid coupon code");
      return;
    }

    const coupon = coupons[upperCode];

    if (subtotal < coupon.minOrder) {
      setCouponError(
        `Minimum order of ₹${coupon.minOrder} required for this coupon`,
      );
      return;
    }

    setAppliedCoupon({ code: upperCode, ...coupon });
    setCouponCode("");
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    setCouponError("");
  };

  const createOrder = async () => {
    try {
      if (
        !selectedAddress ||
        !selectedAddress.geoLocation ||
        !selectedAddress.geoLocation.coordinates
      ) {
        toast.error("Please select a valid delivery address.");
        return;
      }

      if (paymentMethod === "online") {
        toast.success(
          "Online payment is currently unavailable. Please select Cash on Delivery.",
        );
        return;
      }
      const orderData = {
        restaurantId: cartRestaurant._id,
        items: cart.map((item) => ({
          menuItemId: item._id,
          quantity: item.quantity,
          price: item.price,
        })),
        address: {
          address:
            selectedAddress?.address || location?.name || "Current location",
          city: selectedAddress?.city || location?.city || "",
          pin: selectedAddress?.pin || location?.pin || "",
          geoLocation: selectedAddress?.geoLocation,
        },
        paymentMethod,
        subtotal,
        deliveryFee,
        tax: taxes,
        total:
          subtotal +
          deliveryFee +
          taxes -
          (appliedCoupon ? appliedCoupon.discount : 0),
      };
      console.log("Order data:", orderData);
      const res = await api.post("/customer/order", orderData);
      console.log("Order created:", res.data);
      toast.success("Order placed successfully!");
      // Clear cart and reset state after successful order
      clearCart();
      setAppliedCoupon(null);
      setPaymentMethod("cod");
      navigate(`/customer/order/${res.data.order._id}/success`, {
        state: {
          order: res.data.order,
        },
      });
    } catch (error) {
      console.log("Error in creating order", error);
      toast.error("Failed to create order. Please try again.");

      navigate(`/customer/order/null/failed`);
    }
  };

  const discount = appliedCoupon ? appliedCoupon.discount : 0;

  const total = subtotal + deliveryFee + taxes - discount;

  /* EMPTY CART */

  if (cart.length === 0) {
    return (
      <main
        className="
          flex min-h-screen
          items-center justify-center
          bg-[#fffdf9]
          px-4
        "
      >
        <div className="max-w-md text-center">
          <div
            className="
              mx-auto flex h-28 w-28
              items-center justify-center
              rounded-full
              bg-orange-50
              text-(--primary)
            "
          >
            <ShoppingBag size={42} />
          </div>

          <h1
            className="
              mt-8 text-3xl
              font-extrabold tracking-tight
            "
          >
            Your cart is empty
          </h1>

          <p
            className="
              mt-4 leading-7
              text-(--text-secondary)
            "
          >
            Looks like you haven’t added anything yet. Explore restaurants and
            find something delicious.
          </p>

          <button
            className="
              mt-8 inline-flex items-center
              gap-2 rounded-2xl
              bg-(--primary)
              px-6 py-4
              font-semibold
              text-white
              transition hover:scale-105
            "
          >
            Browse restaurants
            <ArrowRight size={18} />
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fffdf9]">
      {/* HEADER */}
      <section className="border-b border-(--border) bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <p
            className="
              text-sm font-medium
              text-(--primary)
            "
          >
            Your order
          </p>

          <h1
            className="
              mt-2 text-4xl
              font-black tracking-tight
            "
          >
            Cart summary
          </h1>

          <p
            className="
              mt-3 text-base
              text-(--text-secondary)
            "
          >
            Review your items before checkout.
          </p>

          {/* RESTAURANT INFO + CLEAR CART */}
          {cartRestaurant && (
            <div className="mt-6 flex items-center gap-4">
              <img
                src={
                  cartRestaurant.image?.url ||
                  cartRestaurant.coverImage?.url ||
                  `https://placehold.co/120x120/cccccc/ffffff?text=${encodeURIComponent(
                    cartRestaurant.name || "Restaurant",
                  )}`
                }
                alt={cartRestaurant.name}
                className="h-16 w-16 rounded-2xl object-cover"
              />

              <div className="flex-1 min-w-0">
                <p className="text-lg font-semibold text-(--text-primary) truncate">
                  {cartRestaurant.name}
                </p>
                <p className="mt-1 text-sm text-(--text-secondary) line-clamp-1">
                  {cartRestaurant.address}
                </p>
                <div className="mt-2 flex items-center gap-3 text-sm text-(--text-secondary)">
                  <div className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-1">
                    <Star size={14} fill="currentColor" />
                    <span>{cartRestaurant.rating ?? 0}</span>
                  </div>
                  <div className="text-sm">
                    {cartRestaurant.isOpen ? "Open" : "Closed"}
                  </div>
                </div>
              </div>

              <div className="ml-4 shrink-0">
                <button
                  onClick={() => setShowClearCartConfirmation(true)}
                  className="rounded-2xl bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-100 transition"
                >
                  Clear cart
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CONTENT */}
      <section
        className="
          mx-auto grid max-w-7xl
          gap-8 px-4 py-10
          lg:grid-cols-[1fr_400px]
        "
      >
        {/* LEFT */}
        <div className="space-y-6">
          {cart.map((item) => (
            <CartItemCard
              key={item._id}
              item={item}
              onIncrease={addToCart}
              onDecrease={removeFromCart}
              onRemove={removeFromCart}
            />
          ))}
        </div>

        {/* RIGHT */}
        <div
          className="
            sticky top-24 h-fit
            rounded-4xl
            border border-(--border)
            bg-white
            p-6
            shadow-sm
          "
        >
          {/* DELIVERY */}
          <div className="rounded-3xl bg-orange-50 p-5">
            <div className="flex items-start gap-4">
              <div
                className="
                  rounded-2xl
                  bg-white
                  p-3
                  text-(--primary)
                "
              >
                <MapPin size={20} />
              </div>

              <div className="flex-1">
                <p
                  className="
                    font-bold
                    text-(--text-primary)
                  "
                >
                  Choose delivery address
                </p>

                <select
                  value={selectedAddress?.title || ""}
                  onChange={(e) => {
                    const addr = user?.customer?.addresses?.find(
                      (a) => a.title === e.target.value,
                    );
                    setSelectedAddress(addr);
                  }}
                  className="
                    mt-3 w-full
                    rounded-2xl
                    border border-(--border)
                    bg-white
                    px-4
                    py-3
                    text-sm
                    outline-none
                    focus:border-(--primary)
                  "
                >
                  {user?.customer?.addresses?.map((addr) => (
                    <option key={addr.title} value={addr.title}>
                      {addr.title} - {addr.address}
                    </option>
                  ))}
                </select>

                {selectedAddress && (
                  <p
                    className="
                      mt-3 text-sm leading-6
                      text-(--text-secondary)
                    "
                  >
                    {selectedAddress.address}
                  </p>
                )}
              </div>
            </div>

            <div
              className="
                mt-5 flex items-center
                gap-2 text-sm
                font-semibold
                text-emerald-700
              "
            >
              <Clock3 size={16} />
              Estimated delivery in {eta} - {Number(eta) + 5} mins
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setIsAddAddressModalOpen(true)}
                className="mt-5 text-sm font-medium text-(--primary) hover:underline "
              >
                <Plus size={16} className="inline-block" />
                Add new address
              </button>
            </div>
          </div>

          {/* COUPON */}
          <div className="mt-6 space-y-4">
            {appliedCoupon ? (
              <div
                className="
                  rounded-3xl
                  border border-dashed
                  border-emerald-300
                  bg-emerald-50
                  p-5
                "
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div
                      className="
                        rounded-full
                        bg-emerald-500
                        p-2
                        text-white
                        mt-0.5
                      "
                    >
                      <Check size={16} />
                    </div>
                    <div>
                      <p
                        className="
                          font-bold
                          text-emerald-700
                        "
                      >
                        {appliedCoupon.code}
                      </p>

                      <p
                        className="
                          mt-1 text-sm
                          text-emerald-600
                        "
                      >
                        ₹{appliedCoupon.discount} discount applied
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleRemoveCoupon}
                    className="
                      rounded-full
                      bg-emerald-100
                      p-2
                      text-emerald-600
                      hover:bg-emerald-200
                      transition
                    "
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm font-semibold text-(--text-secondary)">
                  Have a coupon? Apply here
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => {
                      setCouponCode(e.target.value);
                      setCouponError("");
                    }}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleApplyCoupon();
                      }
                    }}
                    className="
                      flex-1 rounded-2xl
                      border border-(--border)
                      bg-white
                      px-4 py-3
                      text-sm
                      placeholder-gray-400
                      text-(--text-primary)
                      outline-none
                      transition
                      focus:border-(--primary)
                      focus:ring-2
                      focus:ring-orange-100
                    "
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="
                      rounded-2xl
                      bg-(--primary)
                      px-4 py-3
                      font-semibold
                      text-white
                      text-sm
                      transition
                      hover:bg-[#e85a28]
                      active:scale-95
                    "
                  >
                    Apply
                  </button>
                </div>

                {couponError && (
                  <p className="text-xs font-medium text-red-500">
                    {couponError}
                  </p>
                )}

                <p className="text-xs text-(--text-secondary)">
                  Try: CRAVINGS120, SAVE50, or WELCOME100
                </p>
              </div>
            )}
          </div>

          {/* PAYMENT METHOD */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-(--text-secondary) mb-3">
              Payment method
            </h3>

            <div className="space-y-2">
              {/* COD */}
              <button
                onClick={() => setPaymentMethod("cod")}
                className={`
                  w-full rounded-2xl border-2 p-4 text-left
                  transition-all duration-200
                  ${
                    paymentMethod === "cod"
                      ? "border-(--primary) bg-orange-50"
                      : "border-(--border) bg-white hover:border-(--border)"
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`
                      flex h-5 w-5 items-center justify-center
                      rounded-full border-2
                      ${
                        paymentMethod === "cod"
                          ? "border-(--primary) bg-(--primary)"
                          : "border-(--border)"
                      }
                    `}
                  >
                    {paymentMethod === "cod" && (
                      <div className="h-2 w-2 rounded-full bg-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-(--text-primary)">
                      Cash on Delivery
                    </p>
                    <p className="text-xs text-(--text-secondary) mt-0.5">
                      Pay securely with cash upon delivery
                    </p>
                  </div>
                  <Banknote
                    size={20}
                    className={
                      paymentMethod === "cod"
                        ? "text-(--primary)"
                        : "text-(--text-secondary)"
                    }
                  />
                </div>
              </button>

              {/* Online Payment */}
              <button
                onClick={() => setPaymentMethod("online")}
                className={`
                  w-full rounded-2xl border-2 p-4 text-left
                  transition-all duration-200
                  ${
                    paymentMethod === "online"
                      ? "border-(--primary) bg-orange-50"
                      : "border-(--border) bg-white hover:border-(--border)"
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`
                      flex h-5 w-5 items-center justify-center
                      rounded-full border-2
                      ${
                        paymentMethod === "online"
                          ? "border-(--primary) bg-(--primary)"
                          : "border-(--border)"
                      }
                    `}
                  >
                    {paymentMethod === "online" && (
                      <div className="h-2 w-2 rounded-full bg-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-(--text-primary)">
                      Online Payment
                    </p>
                    <p className="text-xs text-(--text-secondary) mt-0.5">
                      Credit, debit card, UPI, wallets
                    </p>
                  </div>
                  <CreditCard
                    size={20}
                    className={
                      paymentMethod === "online"
                        ? "text-(--primary)"
                        : "text-(--text-secondary)"
                    }
                  />
                </div>
              </button>
            </div>
          </div>

          {/* BILL */}
          <div className="mt-6">
            <h2
              className="
                text-xl font-black
                tracking-tight
              "
            >
              Bill details
            </h2>

            <div className="mt-5 space-y-4">
              <div className="flex items-center justify-between text-(--text-secondary)">
                <span>Subtotal</span>

                <span>₹{subtotal}</span>
              </div>

              <div className="flex items-center justify-between text-(--text-secondary)">
                <span>Delivery fee</span>

                <span>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</span>
              </div>

              <div className="flex items-center justify-between text-(--text-secondary)">
                <span>Taxes & charges</span>

                <span>₹{taxes}</span>
              </div>

              {discount > 0 && (
                <div className="flex items-center justify-between font-semibold text-emerald-700">
                  <span>Discount</span>

                  <span>- ₹{discount}</span>
                </div>
              )}

              <div className="border-t border-dashed border-(--border) pt-4">
                <div className="flex items-center justify-between">
                  <span
                    className="
                      text-lg font-black
                    "
                  >
                    Total
                  </span>

                  <span
                    className="
                      text-3xl font-black
                      tracking-tight
                      text-(--primary)
                    "
                  >
                    ₹{total}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* TRUST */}
          <div
            className="
              mt-6 flex items-start gap-4
              rounded-3xl bg-[#fafafa]
              p-5
            "
          >
            <div
              className="
                rounded-2xl
                bg-white
                p-3
                text-emerald-600
              "
            >
              <ShieldCheck size={20} />
            </div>

            <div>
              <p className="font-bold">Safe & secure checkout</p>

              <p
                className="
                  mt-1 text-sm leading-6
                  text-(--text-secondary)
                "
              >
                Your payment and order details are securely encrypted.
              </p>
            </div>
          </div>

          {/* PAYMENT METHOD BADGE */}
          <div className="mt-6 rounded-2xl bg-blue-50 p-4 border border-blue-100">
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
              Payment method selected
            </p>
            <p className="mt-2 font-semibold text-blue-900">
              {paymentMethod === "cod"
                ? "💵 Cash on Delivery"
                : "💳 Online Payment"}
            </p>
          </div>

          {/* CHECKOUT */}
          <button
            onClick={createOrder}
            className="
              mt-6 flex w-full
              items-center justify-center
              gap-2 rounded-2xl
              bg-(--primary)
              px-6 py-4
              font-bold
              text-white
              shadow-lg
              transition-all
              hover:scale-[1.02]
              hover:bg-[#e85a28]
            "
          >
            Proceed to checkout
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {isAddAddressModalOpen && (
        <AddAddressModal
          open={isAddAddressModalOpen}
          onClose={() => setIsAddAddressModalOpen(false)}
        />
      )}
    </main>
  );
};

export default Cart;
