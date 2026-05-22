import React, { useEffect, useMemo, useState } from "react";
import {
  Clock3,
  Flame,
  Heart,
  MapPin,
  Search,
  ShoppingCart,
  Star,
  Sparkles,
  SlidersHorizontal,
} from "lucide-react";

import { useLocation, useNavigate, useParams } from "react-router-dom";

import api from "../../config/api";

import { calculateETA } from "../../utils/calculateETA";

import useUiStore from "../../store/useUiStore";

import { RestaurantMenuItem } from "../../components/customer/RestaurantMenuItem";
import { formatDistance } from "../../utils/formatDistance";

const Restaurant = () => {
  const { id } = useParams();

  const location = useLocation();
  const navigate = useNavigate();

  const {
    location: uiLocation,
    likeRestaurant,
    likedRestaurants,
    cart,
  } = useUiStore();

  const [restaurant, setRestaurant] = useState(
    location.state?.restaurant || null,
  );

  const [menu, setMenu] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [vegOnly, setVegOnly] = useState(false);

  const [sortBy, setSortBy] = useState("popular");

  const fetchData = async () => {
    try {
      setLoading(true);

      const [restaurantRes, menuRes] = await Promise.all([
        api.get(`/public/restaurant/${id}`),
        api.get(`/public/restaurant/${id}/menu`),
      ]);

      setRestaurant(restaurantRes.data.data);

      setMenu(menuRes.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const filteredMenu = useMemo(() => {
    let filtered = [...menu];

    /* SEARCH */

    if (search.trim()) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    /* VEG FILTER */

    if (vegOnly) {
      filtered = filtered.filter((item) => item.isVeg);
    }

    /* SORTING */

    if (sortBy === "price-low") {
      filtered.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "price-high") {
      filtered.sort((a, b) => b.price - a.price);
    }

    if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  }, [menu, search, vegOnly, sortBy]);

  const isLiked = useMemo(() => {
    return likedRestaurants.some((r) => r._id === restaurant._id);
  }, [likedRestaurants, restaurant]);

  const restaurantItemInCart = useMemo(
    () =>
      cart.find((i) => i.restaurant === restaurant._id) || {
        quantity: 0,
      },
    [cart, restaurant._id],
  );

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fffdf9]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-(--border) border-t-(--primary)" />
          <p className="font-semibold text-(--text-secondary)">
            Loading restaurant...
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#fffdf9]">
      {/* HERO */}
      <section className="border-b border-(--border) bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 lg:py-8">
          <div className="overflow-hidden rounded-[2rem] border border-(--border) bg-white shadow-sm">
            {/* COVER */}
            <div className="relative h-[420px] overflow-hidden">
              <img
                src={restaurant?.coverImage?.url || restaurant?.image?.url}
                alt={restaurant?.name}
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

              {/* TOP ACTIONS */}
              <div className="absolute right-5 top-5 flex items-center gap-3">
                <button
                  onClick={() => likeRestaurant(restaurant)}
                  className="rounded-full bg-white/90 p-3 backdrop-blur transition hover:scale-105"
                >
                  {isLiked ? (
                    <Heart
                      size={20}
                      fill="currentColor"
                      className="text-red-500"
                    />
                  ) : (
                    <Heart size={20} className="text-(--primary)" />
                  )}
                </button>

                <button
                  onClick={() => navigate("/customer/cart")}
                  className="rounded-full bg-white/90 p-3 backdrop-blur transition hover:scale-105 relative"
                >
                  <ShoppingCart size={20} />
                  {restaurantItemInCart.quantity > 0 && (
                    <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                      {restaurantItemInCart.quantity}
                    </span>
                  )}
                </button>
              </div>

              {/* CONTENT */}
              <div className="absolute bottom-0 left-0 w-full p-6 text-white lg:p-10">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                  {/* LEFT */}
                  <div className="max-w-4xl">
                    <div className="flex items-center gap-5">
                      <img
                        src={restaurant?.image?.url}
                        alt={restaurant?.name}
                        className="h-24 w-24 rounded-3xl border-4 border-white/20 object-cover shadow-xl"
                      />

                      <div>
                        <div className="mb-2 flex items-center gap-2">
                          {restaurant?.isVeg ? (
                            <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-200 backdrop-blur">
                              Veg
                            </span>
                          ) : (
                            <span className="rounded-full bg-red-500/20 px-3 py-1 text-xs font-semibold text-red-200 backdrop-blur">
                              Non-Veg
                            </span>
                          )}

                          {restaurant?.isVerified && (
                            <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-200 backdrop-blur">
                              Verified
                            </span>
                          )}
                          {restaurant?.geoLocation?.coordinates && (
                            <span className="rounded-full bg-orange-300/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                              {formatDistance(
                                {
                                  lat: restaurant.geoLocation.coordinates[1],
                                  lon: restaurant.geoLocation.coordinates[0],
                                },
                                { lat: uiLocation.lat, lon: uiLocation.lon },
                              )}
                            </span>
                          )}
                        </div>

                        <h1 className="text-4xl font-black tracking-tight lg:text-5xl">
                          {restaurant?.name}
                        </h1>

                        <p className="mt-3 max-w-2xl text-sm leading-7 text-white/75 lg:text-base">
                          {restaurant?.description}
                        </p>
                      </div>
                    </div>

                    {/* CUISINES */}
                    <div className="mt-6 flex flex-wrap gap-2">
                      {restaurant?.cuisine?.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* STATS */}
                  <div className="grid grid-cols-2 gap-3 lg:w-[320px]">
                    <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                      <div className="flex items-center gap-2 text-yellow-300">
                        <Star size={16} fill="currentColor" />
                        <span className="font-bold">
                          {restaurant?.rating || 4.5}
                        </span>
                      </div>

                      <p className="mt-2 text-xs text-white/60">
                        Customer rating
                      </p>
                    </div>

                    <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                      <div className="flex items-center gap-2">
                        <Clock3 size={16} />

                        <span className="font-bold">
                          {calculateETA(
                            {
                              lat: restaurant.geoLocation.coordinates[1],
                              lon: restaurant.geoLocation.coordinates[0],
                            },
                            {
                              lat: uiLocation.lat,
                              lon: uiLocation.lon,
                            },
                          )}
                          -
                          {Number(
                            calculateETA(
                              {
                                lat: restaurant.geoLocation.coordinates[1],
                                lon: restaurant.geoLocation.coordinates[0],
                              },
                              {
                                lat: uiLocation.lat,
                                lon: uiLocation.lon,
                              },
                            ),
                          ) + 10}{" "}
                          mins
                        </span>
                      </div>

                      <p className="mt-2 text-xs text-white/60">
                        Delivery time
                      </p>
                    </div>

                    <div className="col-span-2 rounded-2xl bg-white/10 p-4 backdrop-blur">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} />

                        <span className="font-medium">
                          {restaurant?.address}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SEARCH + FILTER */}
            <div className="border-t border-(--border) bg-white p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                {/* SEARCH */}
                <div className="relative w-full lg:max-w-md">
                  <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-(--text-secondary)"
                  />

                  <input
                    type="text"
                    placeholder="Search dishes..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="h-12 w-full rounded-2xl border border-(--border) bg-[#fafafa] pl-12 pr-4 text-sm outline-none transition focus:border-(--primary)"
                  />
                </div>

                {/* FILTERS */}
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setVegOnly(!vegOnly)}
                    className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                      vegOnly
                        ? "bg-green-600 text-white"
                        : "border border-(--border) bg-white"
                    }`}
                  >
                    Veg only
                  </button>

                  <div className="relative">
                    <SlidersHorizontal
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-secondary)"
                    />

                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="h-11 rounded-2xl border border-(--border) bg-white pl-10 pr-4 text-sm outline-none"
                    >
                      <option value="popular">Most popular</option>

                      <option value="rating">Highest rated</option>

                      <option value="price-low">Price: Low to High</option>

                      <option value="price-high">Price: High to Low</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MENU */}
      <section className="mx-auto max-w-7xl px-4 py-10">
        {/* TITLE */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-(--primary)">Full menu</p>

            <h2 className="mt-2 text-3xl font-black tracking-tight">
              Popular dishes
            </h2>
          </div>

          <div className="hidden items-center gap-2 rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-(--primary) lg:flex">
            <Sparkles size={16} />
            {filteredMenu.length} items available
          </div>
        </div>

        {/* EMPTY */}
        {filteredMenu.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-(--border) bg-white p-14 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-50">
              <Search size={30} className="text-(--primary)" />
            </div>

            <h3 className="mt-6 text-2xl font-bold">No dishes found</h3>

            <p className="mt-3 text-(--text-secondary)">
              Try changing search or filters
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredMenu.map((item) => (
              <RestaurantMenuItem key={item._id} item={item} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Restaurant;
