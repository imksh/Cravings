import React, { useEffect, useMemo, useState } from "react";
import {
  Clock3,
  Minus,
  Plus,
  Search,
  ShoppingCart,
  Star,
  Flame,
} from "lucide-react";
// import { useNavigate } from "react-router-dom";
import MenuCard from "../../components/customer/MenuCard";
import api from "../../config/api";

const Menu = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMenu = React.useCallback(
    async (pageToLoad = 1) => {
      try {
        setLoading(true);
        const res = await api.get(`/public/menu`, {
          params: { page: pageToLoad, limit },
        });

        const data = res.data?.data || [];
        const pagination = res.data?.pagination || {};

        if (pageToLoad === 1) setMenu(data);
        else setMenu((prev) => [...prev, ...data]);

        setTotalPages(pagination.totalPages || 1);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Failed to load menu. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [limit],
  );

  useEffect(() => {
    fetchMenu(1);
  }, [fetchMenu]);

  // derive categories from fetched menu
  const filters = useMemo(() => {
    const cats = Array.from(
      new Set(menu.map((m) => m.category).filter(Boolean)),
    );
    return ["All", ...cats];
  }, [menu]);

  const filteredItems = useMemo(() => {
    return menu.filter((item) => {
      const matchesSearch =
        item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilter =
        activeFilter === "All" || item.category === activeFilter;

      return matchesSearch && matchesFilter;
    });
  }, [menu, searchQuery, activeFilter]);

  const loadMore = () => {
    if (page < totalPages) {
      const next = page + 1;
      setPage(next);
      fetchMenu(next);
    }
  };

  return (
    <main className="min-h-screen bg-[#fffdf9] text-(--text-primary)">
      {/* HEADER */}
      <section className="border-b border-(--border) bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-(--primary)">Full menu</p>

            <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Find your next meal
            </h1>

            <p className="mt-3 text-base text-(--text-secondary)">
              Browse trending dishes, fast delivery meals, and customer
              favorites.
            </p>
          </div>

          {/* SEARCH */}
          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-(--border) bg-[#fafafa] px-4 py-4">
            <Search size={18} className="text-(--text-secondary)" />

            <input
              type="text"
              placeholder="Search dishes or categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent outline-none placeholder:text-(--text-secondary)"
            />
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

      {/* MENU GRID */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Available dishes
            </h2>

            <p className="mt-2 text-sm text-(--text-secondary)">
              {filteredItems.length} items found
            </p>
          </div>
        </div>

        {loading && menu.length === 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-80 animate-pulse rounded-4xl bg-white"
              />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-center">
            <p className="text-lg font-semibold text-red-800">{error}</p>
            <button
              onClick={() => fetchMenu(1)}
              className="mt-4 rounded-2xl bg-(--primary) px-4 py-2 text-white"
            >
              Retry
            </button>
          </div>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredItems.map((item) => (
                <MenuCard key={item._id} item={item} />
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              {page < totalPages ? (
                <button
                  onClick={loadMore}
                  disabled={loading}
                  className="rounded-2xl bg-(--primary) px-6 py-3 text-white font-semibold hover:bg-[#e85a28] transition disabled:opacity-50"
                >
                  {loading ? "Loading..." : "Load more"}
                </button>
              ) : (
                <p className="text-sm text-(--text-secondary)">No more items</p>
              )}
            </div>
          </>
        )}
      </section>
    </main>
  );
};

export default Menu;
