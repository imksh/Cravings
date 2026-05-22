import React, { useState } from "react";
import {
  ArrowRight,
  Clock3,
  Flame,
  MapPin,
  Pizza,
  Sandwich,
  Salad,
  IceCream,
  Search,
  Star,
  ArrowLeft,
  ArrowRightCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

import CustomerCategoryCard from "../../components/customer/CustomerCategoryCard";
import CustomerDishCard from "../../components/customer/CustomerDishCard";
import CustomerHomeSectionTitle from "../../components/customer/CustomerHomeSectionTitle";
import CustomerRestaurantCard from "../../components/customer/CustomerRestaurantCard";
// api not used in this component
import useUiStore from "../../store/useUiStore";
import ActiveOrder from "../../components/customer/ActiveOrder";
import { motion } from "framer-motion";

const categories = [
  {
    title: "Pizza",
    description: "Cheesy oven fresh pizzas.",
    count: "34 spots",
    icon: Pizza,
    accent: "from-orange-500 to-rose-500",
  },
  {
    title: "Burgers",
    description: "Juicy stacked burgers.",
    count: "21 spots",
    icon: Sandwich,
    accent: "from-amber-500 to-orange-500",
  },
  {
    title: "Healthy",
    description: "Fresh balanced meals.",
    count: "27 spots",
    icon: Salad,
    accent: "from-lime-500 to-emerald-500",
  },
  {
    title: "Desserts",
    description: "Sweet cravings delivered.",
    count: "24 spots",
    icon: IceCream,
    accent: "from-pink-500 to-fuchsia-500",
  },
];

const dishes = [
  {
    title: "Loaded Burger Meal",
    description: "Double patty with fries & drink.",
    price: 249,
    rating: "4.8",
    time: "15-20 min",
    badge: "Best seller",
    image: "/images/food-1.png",
  },
  {
    title: "Creamy Pasta Bowl",
    description: "Rich creamy pasta bowl.",
    price: 219,
    rating: "4.6",
    time: "18-25 min",
    badge: "Chef pick",
    image: "/images/food-8.png",
  },
  {
    title: "Tandoori Platter",
    description: "Spicy grilled platter.",
    price: 329,
    rating: "4.9",
    time: "20-30 min",
    badge: "Trending",
    image: "/images/food-10.png",
  },
  {
    title: "Chocolate Sundae",
    description: "Cold chocolate dessert.",
    price: 149,
    rating: "4.7",
    time: "10-15 min",
    badge: "Dessert",
    image: "/images/food-14.png",
  },
];

const quickFilters = [
  "Under 30 mins",
  "Top rated",
  "Pure veg",
  "Offers",
  "Biryani",
  "Pizza",
];

const CustomerHome = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { restaurants, activeOrders } = useUiStore();
  const [activeIndex, setActiveIndex] = useState(0);

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      navigate(`/restaurants?search=${searchQuery}`);
    } else {
      navigate("/restaurants");
    }
  };

  return (
    <main className="min-h-screen bg-[#fffdf9] text-(--text-primary)">
      {/* HERO */}
      <section className="border-b border-(--border) bg-white">
        {activeOrders.length > 0 ? (
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 bg-white">
            <CustomerHomeSectionTitle
              eyebrow="Live Tracking"
              title="Your active order"
              description=""
              actionLabel="View orders"
              onAction={() => navigate("/customer/orders")}
            />
            <div className="overflow-hidden rounded-4xl relative">
              <ActiveOrder order={activeOrders[activeIndex]} />
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 text-(--primary) shadow-md"
                onClick={() => setActiveIndex((prev) => Math.max(prev - 1, 0))}
                disabled={activeIndex === 0}
              >
                <ArrowLeft />
              </button>

              <button
                className="absolute right-4 top-1/2 -translate-y-1/2  rounded-full bg-white p-2 text-(--primary) shadow-md z-50 "
                onClick={() =>
                  setActiveIndex((prev) =>
                    Math.min(prev + 1, activeOrders.length - 1),
                  )
                }
                disabled={activeIndex === activeOrders.length - 1}
              >
                <ArrowRight />
              </button>

              <div className="mt-4 flex items-center justify-center gap-3">
                <div className="flex items-center gap-2">
                  {activeOrders.map((a, idx) => (
                    <button
                      key={a._id || idx}
                      onClick={() => setActiveIndex(idx)}
                      className={`h-2 w-8 rounded-full transition ${idx === activeIndex ? "bg-(--primary)" : "bg-white/60 border border-(--border)"}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-2 text-sm font-medium text-(--primary)">
                  <MapPin size={16} />
                  Delivering to Home
                </div>

                <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                  Hey {user?.name?.split(" ")[0] || "there"} 👋
                </h1>

                <p className="mt-3 text-lg text-(--text-secondary)">
                  What are you craving today?
                </p>

                <form
                  onSubmit={handleSearch}
                  className="mt-6 flex flex-col gap-3 sm:flex-row"
                >
                  <div className="flex flex-1 items-center gap-3 rounded-2xl border border-(--border) bg-[#fafafa] px-4 py-4">
                    <Search size={18} className="text-(--text-secondary)" />

                    <input
                      type="text"
                      placeholder="Search pizza, burgers, biryani..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-transparent outline-none placeholder:text-(--text-secondary)"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-(--primary) px-6 py-4 font-semibold text-white transition hover:bg-[#e85a28]"
                  >
                    Search
                    <ArrowRight size={18} />
                  </button>
                </form>

                <div className="mt-5 flex flex-wrap gap-3">
                  {quickFilters.map((filter) => (
                    <button
                      key={filter}
                      className="rounded-full border border-(--border) bg-white px-4 py-2 text-sm font-medium transition hover:border-(--primary) hover:text-(--primary)"
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              {/* SIDE CARD */}
              <div className="w-full max-w-md rounded-4xl bg-linear-to-br from-orange-500 to-[#ff8c42] p-6 text-white shadow-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white/80">
                      Today's offer
                    </p>

                    <h2 className="mt-2 text-4xl font-extrabold">30% OFF</h2>

                    <p className="mt-2 text-sm text-white/80">
                      On selected restaurants near you
                    </p>
                  </div>

                  <img
                    src="/images/food-7.png"
                    alt="Food"
                    className="h-28 w-28 object-contain"
                  />
                </div>

                <button
                  onClick={() => navigate("/customer/offers")}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-(--primary)"
                >
                  Explore offers
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <CustomerHomeSectionTitle
          eyebrow="Categories"
          title="Browse by craving"
          description="Jump straight into what you feel like eating."
          actionLabel="See all"
          onAction={() => navigate("/customer/categories")}
        />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {categories.map((category) => (
            <CustomerCategoryCard key={category.title} {...category} />
          ))}
        </div>
      </section>

      {/* FEATURED RESTAURANTS */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <CustomerHomeSectionTitle
          eyebrow="Top picks"
          title="Popular restaurants near you"
          description="Fast delivery, high ratings, and consistent food quality."
          actionLabel="View all"
          onAction={() => navigate("/customer/restaurant")}
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {restaurants?.slice(0, 6)?.map((restaurant) => (
            <CustomerRestaurantCard
              key={restaurant.name}
              restaurant={restaurant}
              onSelect={() =>
                navigate(`/customer/restaurant/${restaurant._id}`, {
                  state: { restaurant },
                })
              }
            />
          ))}
        </div>
      </section>

      {/* POPULAR DISHES */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <CustomerHomeSectionTitle
          eyebrow="Trending now"
          title="Customers are ordering these the most"
          description="Quick picks with solid ratings and delivery times."
          actionLabel="Explore menu"
          onAction={() => navigate("/customer/menu")}
        />

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {dishes.map((dish) => (
            <CustomerDishCard
              key={dish.title}
              dish={dish}
              onSelect={() => navigate(`/customer/menu/${dish._id}`)}
            />
          ))}
        </div>
      </section>

      {/* INFO STRIP */}
      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="grid gap-4 rounded-4xl border border-(--border) bg-white p-6 sm:grid-cols-3">
          <div className="flex items-center gap-4 rounded-3xl bg-[#fafafa] p-5">
            <div className="rounded-2xl bg-orange-100 p-3 text-(--primary)">
              <Clock3 size={22} />
            </div>

            <div>
              <p className="font-semibold">Fast delivery</p>
              <p className="text-sm text-(--text-secondary)">
                Average delivery under 30 mins
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-3xl bg-[#fafafa] p-5">
            <div className="rounded-2xl bg-orange-100 p-3 text-(--primary)">
              <Star size={22} />
            </div>

            <div>
              <p className="font-semibold">Top rated food</p>
              <p className="text-sm text-(--text-secondary)">
                Verified restaurants & reviews
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-3xl bg-[#fafafa] p-5">
            <div className="rounded-2xl bg-orange-100 p-3 text-(--primary)">
              <Flame size={22} />
            </div>

            <div>
              <p className="font-semibold">Trending meals</p>
              <p className="text-sm text-(--text-secondary)">
                Popular dishes updated daily
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CustomerHome;
