import React, { useMemo, useState } from "react";
import { Clock3, Flame, Percent, Search, Sparkles, Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import OfferCard from "../../components/customer/OfferCard";

const offers = [
  {
    id: 1,
    title: "Flat 50% OFF",
    subtitle: "On pizza orders above ₹499",
    restaurant: "Pizza Crust",
    code: "PIZZA50",
    validity: "Valid till midnight",
    image: "/images/food-1.png",
    type: "Pizza",
    accent: "from-orange-500 to-rose-500",
  },
  {
    id: 2,
    title: "Free Dessert",
    subtitle: "On orders above ₹799",
    restaurant: "Sweet Tooth",
    code: "SWEETFREE",
    validity: "Today only",
    image: "/images/food-14.png",
    type: "Desserts",
    accent: "from-pink-500 to-fuchsia-500",
  },
  {
    id: 3,
    title: "₹100 OFF",
    subtitle: "On all biryani combos",
    restaurant: "Biryani & Co.",
    code: "BIRYANI100",
    validity: "Limited offer",
    image: "/images/food-7.png",
    type: "Biryani",
    accent: "from-red-500 to-orange-500",
  },
  {
    id: 4,
    title: "Buy 1 Get 1",
    subtitle: "On selected burgers",
    restaurant: "Burger Foundry",
    code: "BOGO",
    validity: "Weekend special",
    image: "/images/burger.png",
    type: "Burger",
    accent: "from-amber-500 to-orange-500",
  },
  {
    id: 5,
    title: "20% OFF Healthy Meals",
    subtitle: "Fresh bowls & salads",
    restaurant: "Healthy Bowl",
    code: "HEALTH20",
    validity: "Valid for lunch hours",
    image: "/images/food-8.png",
    type: "Healthy",
    accent: "from-emerald-500 to-teal-500",
  },
  {
    id: 6,
    title: "Free Delivery",
    subtitle: "No delivery fee today",
    restaurant: "Spice Route Kitchen",
    code: "FREEDEL",
    validity: "Applies automatically",
    image: "/images/food-4.png",
    type: "Delivery",
    accent: "from-indigo-500 to-blue-500",
  },
];

const filters = [
  "All",
  "Pizza",
  "Burger",
  "Healthy",
  "Desserts",
  "Free Delivery",
];

const Offers = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredOffers = useMemo(() => {
    return offers.filter((offer) => {
      const matchesSearch =
        offer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        offer.restaurant.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilter =
        activeFilter === "All" ||
        offer.type.toLowerCase() === activeFilter.toLowerCase();

      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, activeFilter]);

  return (
    <main className="min-h-screen bg-[#fffdf9] text-(--text-primary)">
      {/* HEADER */}
      <section className="border-b border-(--border) bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-2 text-sm font-medium text-(--primary)">
              <Sparkles size={16} />
              Limited-time savings
            </div>

            <h1 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Offers worth using
            </h1>

            <p className="mt-3 text-base text-(--text-secondary)">
              Explore discounts, combo deals, free delivery, and
              restaurant-specific offers near you.
            </p>
          </div>

          {/* SEARCH */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <div className="flex flex-1 items-center gap-3 rounded-2xl border border-(--border) bg-[#fafafa] px-4 py-4">
              <Search size={18} className="text-(--text-secondary)" />

              <input
                type="text"
                placeholder="Search offers or restaurants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent outline-none placeholder:text-(--text-secondary)"
              />
            </div>
          </div>

          {/* FILTERS */}
          <div className="mt-5 flex flex-wrap gap-3">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  activeFilter === filter
                    ? "border-(--primary) bg-(--primary) text-white"
                    : "border-(--border) bg-white hover:border-(--primary) hover:text-(--primary)"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* HIGHLIGHT STRIP */}
      <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-(--border) bg-white p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-orange-100 p-3 text-(--primary)">
                <Percent size={22} />
              </div>

              <div>
                <p className="font-semibold">Exclusive discounts</p>
                <p className="text-sm text-(--text-secondary)">Updated daily</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-(--border) bg-white p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-orange-100 p-3 text-(--primary)">
                <Flame size={22} />
              </div>

              <div>
                <p className="font-semibold">Trending deals</p>
                <p className="text-sm text-(--text-secondary)">
                  Popular right now
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-(--border) bg-white p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-orange-100 p-3 text-(--primary)">
                <Sparkles size={22} />
              </div>

              <div>
                <p className="font-semibold">Limited-time offers</p>
                <p className="text-sm text-(--text-secondary)">
                  Grab before expiry
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OFFERS GRID */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Available offers
            </h2>

            <p className="mt-2 text-sm text-(--text-secondary)">
              {filteredOffers.length} offers available
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredOffers.map((offer) => (
            <OfferCard
              key={offer.id}
              offer={offer}
              onClick={() => navigate(`/offers/${offer.id}`)}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Offers;
