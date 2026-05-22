import React, { useEffect, useMemo, useState } from "react";
import { Clock3, MapPin, Search, SlidersHorizontal, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import RestaurantCard from "../../components/customer/RestaurantCard";
import useUiStore from "../../store/useUiStore";

const filters = ["All", "Top Rated", "Fast Delivery", "Offers", "Pure Veg"];

const Restaurants = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const { restaurants, fetchRestaurants, location } = useUiStore();

  useEffect(() => {
    if (location?.lat && location?.lon) return;
    if (restaurants.length === 0) fetchRestaurants();
  }, [location]);

  const filteredRestaurants = useMemo(() => {
    return restaurants?.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  return (
    <main className="min-h-screen bg-[#fffdf9] text-(--text-primary)">
      {/* HEADER */}
      <section className="border-b border-(--border) bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-(--primary)">Restaurants</p>

            <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Discover restaurants near you
            </h1>

            <p className="mt-3 text-base text-(--text-secondary)">
              Browse top-rated restaurants, fast delivery spots, and trending
              food places.
            </p>
          </div>

          {/* SEARCH */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <div className="flex flex-1 items-center gap-3 rounded-2xl border border-(--border) bg-[#fafafa] px-4 py-4">
              <Search size={18} className="text-(--text-secondary)" />

              <input
                type="text"
                placeholder="Search restaurants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent outline-none placeholder:text-(--text-secondary)"
              />
            </div>

            <button className="inline-flex items-center justify-center gap-2 rounded-2xl border border-(--border) bg-white px-5 py-4 font-medium transition hover:border-(--primary) hover:text-(--primary)">
              <SlidersHorizontal size={18} />
              Filters
            </button>
          </div>

          {/* FILTERS */}
          <div className="mt-5 flex flex-wrap gap-3">
            {filters?.map((filter) => (
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

      {/* RESTAURANTS GRID */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Available restaurants
            </h2>

            <p className="mt-2 text-sm text-(--text-secondary)">
              {filteredRestaurants.length} restaurants found
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredRestaurants?.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              onClick={() => navigate(`/customer/restaurant/${restaurant._id}`)}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Restaurants;
