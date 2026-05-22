import React, { useMemo, useState } from "react";
import {
  Coffee,
  Flame,
  IceCream,
  Leaf,
  Pizza,
  Salad,
  Search,
  Sandwich,
  UtensilsCrossed,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import CustomerCategoryCard from "../../components/customer/CustomerCategoryCard";

const categories = [
  {
    title: "Pizza",
    slug: "pizza",
    description: "Wood-fired classics and loaded toppings.",
    count: "34 restaurants",
    icon: Pizza,
    accent: "from-orange-500 to-rose-500",
  },
  {
    title: "Burgers",
    slug: "burgers",
    description: "Juicy burgers, fries, and combo meals.",
    count: "21 restaurants",
    icon: Sandwich,
    accent: "from-amber-500 to-orange-500",
  },
  {
    title: "Healthy",
    slug: "healthy",
    description: "Fresh bowls, salads, and healthy meals.",
    count: "27 restaurants",
    icon: Salad,
    accent: "from-emerald-500 to-teal-500",
  },
  {
    title: "Desserts",
    slug: "desserts",
    description: "Cakes, brownies, sundaes, and sweet treats.",
    count: "24 restaurants",
    icon: IceCream,
    accent: "from-pink-500 to-fuchsia-500",
  },
  {
    title: "North Indian",
    slug: "north-indian",
    description: "Rich curries, tandoori dishes, and naan.",
    count: "31 restaurants",
    icon: UtensilsCrossed,
    accent: "from-amber-600 to-red-500",
  },
  {
    title: "Coffee",
    slug: "coffee",
    description: "Coffee, snacks, pastries, and cafe drinks.",
    count: "16 restaurants",
    icon: Coffee,
    accent: "from-slate-700 to-slate-500",
  },
  {
    title: "Biryani",
    slug: "biryani",
    description: "Spicy layered biryani and kebab combos.",
    count: "18 restaurants",
    icon: Flame,
    accent: "from-red-500 to-orange-500",
  },
  {
    title: "Light Bites",
    slug: "light-bites",
    description: "Wraps, rolls, sandwiches, and snacks.",
    count: "12 restaurants",
    icon: Leaf,
    accent: "from-lime-500 to-emerald-500",
  },
];

const filters = [
  "All",
  "Top rated",
  "Under 20 min",
  "Budget friendly",
  "Open now",
];

const popularSearches = [
  "Pizza",
  "Biryani",
  "Burger",
  "Chinese",
  "Rolls",
  "Cake",
  "Pasta",
  "Coffee",
];

const Category = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredCategories = useMemo(() => {
    return categories.filter((category) =>
      category.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <main className="min-h-screen bg-[#fffdf9] text-(--text-primary)">
      {/* TOP SECTION */}
      <section className="border-b border-(--border) bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-(--primary)">
              Browse categories
            </p>

            <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              What are you craving today?
            </h1>

            <p className="mt-3 text-base text-(--text-secondary)">
              Explore categories, restaurants, and popular dishes near you.
            </p>
          </div>

          {/* SEARCH */}
          <form
            onSubmit={handleSearch}
            className="mt-6 flex flex-col gap-3 sm:flex-row"
          >
            <div className="flex flex-1 items-center gap-3 rounded-2xl border border-(--border) bg-[#fafafa] px-4 py-4">
              <Search
                size={18}
                className="text-(--text-secondary)"
              />

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search categories or dishes..."
                className="w-full bg-transparent outline-none placeholder:text-(--text-secondary)"
              />
            </div>

            <button
              type="submit"
              className="rounded-2xl bg-(--primary) px-6 py-4 font-semibold text-white transition hover:bg-[#e85a28]"
            >
              Search
            </button>
          </form>

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

          {/* POPULAR SEARCHES */}
          <div className="mt-6">
            <p className="text-sm font-medium text-(--text-secondary)">
              Popular searches
            </p>

            <div className="mt-3 flex flex-wrap gap-3">
              {popularSearches.map((item) => (
                <button
                  key={item}
                  onClick={() =>
                    navigate(
                      `/search?query=${encodeURIComponent(item)}`
                    )
                  }
                  className="rounded-full bg-orange-50 px-4 py-2 text-sm font-medium text-(--primary) transition hover:bg-orange-100"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY GRID */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-(--primary)">
              Categories
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              Explore food categories
            </h2>
          </div>

          <p className="text-sm text-(--text-secondary)">
            {filteredCategories.length} categories
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {filteredCategories.map((category) => (
            <CustomerCategoryCard
              key={category.slug}
              {...category}
              onClick={() =>
                navigate(`/categories/${category.slug}`)
              }
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Category;