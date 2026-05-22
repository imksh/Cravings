import React, { useMemo, useState } from "react";
import {
  BadgePercent,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Eye,
  Filter,
  Flame,
  Gift,
  Pencil,
  Plus,
  Search,
  Trash2,
  Users,
  XCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import EditOfferModal from "../../components/partner/modal/EditOfferModal";
import CreateOfferModal from "../../components/partner/modal/CreateOfferModal";

const offers = [
  {
    id: 1,
    title: "Flat ₹100 OFF",
    code: "CRAVE100",
    type: "Flat Discount",
    discount: "₹100",
    minOrder: 499,
    usage: 1240,
    active: true,
    expiry: "30 May 2026",
    bg: "from-orange-500 to-red-500",
  },

  {
    id: 2,
    title: "40% OFF Combo Meals",
    code: "COMBO40",
    type: "Percentage",
    discount: "40%",
    minOrder: 699,
    usage: 860,
    active: true,
    expiry: "15 Jun 2026",
    bg: "from-emerald-500 to-teal-500",
  },

  {
    id: 3,
    title: "Free Dessert",
    code: "SWEETFREE",
    type: "Free Item",
    discount: "Dessert",
    minOrder: 899,
    usage: 320,
    active: false,
    expiry: "Expired",
    bg: "from-pink-500 to-fuchsia-500",
  },

  {
    id: 4,
    title: "Late Night Special",
    code: "NIGHT30",
    type: "Percentage",
    discount: "30%",
    minOrder: 399,
    usage: 510,
    active: true,
    expiry: "10 Jul 2026",
    bg: "from-violet-500 to-purple-500",
  },
];

const filters = ["All", "Active", "Expired", "High Usage"];

const stats = [
  {
    label: "Active Offers",
    value: "12",
  },

  {
    label: "Total Usage",
    value: "8.2k",
  },

  {
    label: "Avg Conversion",
    value: "24%",
  },

  {
    label: "Revenue Boost",
    value: "+18%",
  },
];

const PartnerOffers = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [activeFilter, setActiveFilter] = useState("All");
  const [isEditOfferModalOpen, setIsEditOfferModalOpen] = useState(false);
  const [isCreateOfferModalOpen, setIsCreateOfferModalOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);

  const filteredOffers = useMemo(() => {
    return offers.filter((offer) => {
      const searchMatch =
        offer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        offer.code.toLowerCase().includes(searchQuery.toLowerCase());

      let filterMatch = true;

      if (activeFilter === "Active") {
        filterMatch = offer.active;
      }

      if (activeFilter === "Expired") {
        filterMatch = !offer.active;
      }

      if (activeFilter === "High Usage") {
        filterMatch = offer.usage > 700;
      }

      return searchMatch && filterMatch;
    });
  }, [searchQuery, activeFilter]);

  return (
    <main className="min-h-screen bg-[#faf7f4] text-slate-900">
      <div className="">
        {/* HEADER */}
        <header className="sticky top-0 z-30 border-b border-[#f1e5dd] bg-white/90 backdrop-blur-xl">
          <div className="flex flex-col gap-5 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-500">
                Promotions & Discounts
              </p>

              <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900">
                Offer Management
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Create attractive discounts, promo campaigns, and
                conversion-focused restaurant offers.
              </p>
            </div>

            <button
              className="inline-flex items-center gap-2 rounded-2xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-xl shadow-orange-200 transition hover:bg-orange-600"
              onClick={() => setIsCreateOfferModalOpen(true)}
            >
              <Plus size={18} />
              Create Offer
            </button>
          </div>
        </header>

        <section className="space-y-8 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {/* STATS */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[2rem] border border-[#f1e5dd] bg-white p-6 shadow-sm"
              >
                <p className="text-sm font-semibold text-slate-500">
                  {stat.label}
                </p>

                <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900">
                  {stat.value}
                </h2>
              </div>
            ))}
          </div>

          {/* FILTER BAR */}
          <div className="rounded-[2rem] border border-[#f1e5dd] bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              {/* SEARCH */}
              <div className="flex flex-1 items-center gap-3 rounded-2xl border border-[#f1e5dd] bg-[#faf7f4] px-4 py-3">
                <Search size={18} className="text-orange-500" />

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search offers..."
                  className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                />
              </div>

              {/* FILTERS */}
              <div className="flex flex-wrap gap-2">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                      activeFilter === filter
                        ? "bg-orange-500 text-white shadow-lg shadow-orange-200"
                        : "border border-[#f1e5dd] bg-white text-slate-600 hover:border-orange-200 hover:bg-orange-50 hover:text-orange-500"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* OFFERS GRID */}
          <div className="grid gap-6 lg:grid-cols-2 2xl:grid-cols-3">
            {filteredOffers.map((offer) => (
              <div
                key={offer.id}
                className="overflow-hidden rounded-[2rem] border border-[#f1e5dd] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                {/* TOP */}
                <div
                  className={`relative overflow-hidden bg-linear-to-r ${offer.bg} p-6 text-white`}
                >
                  <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-white/10 blur-3xl" />

                  <div className="relative z-10 flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] backdrop-blur">
                        <Gift size={14} />
                        Promotional Offer
                      </div>

                      <h2 className="mt-5 text-3xl font-black tracking-tight">
                        {offer.title}
                      </h2>

                      <p className="mt-3 text-sm text-white/80">Coupon Code:</p>

                      <div className="mt-2 inline-flex rounded-2xl border border-white/20 bg-white/10 px-4 py-2 text-lg font-black tracking-[0.2em] backdrop-blur">
                        {offer.code}
                      </div>
                    </div>

                    <div className="flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-white/15 backdrop-blur">
                      <BadgePercent size={28} />
                    </div>
                  </div>
                </div>

                {/* BODY */}
                <div className="p-6">
                  {/* STATS */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-2xl bg-[#faf7f4] p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                        Discount
                      </p>

                      <h3 className="mt-3 text-2xl font-black tracking-tight text-slate-900">
                        {offer.discount}
                      </h3>
                    </div>

                    <div className="rounded-2xl bg-[#faf7f4] p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                        Min Order
                      </p>

                      <h3 className="mt-3 text-2xl font-black tracking-tight text-slate-900">
                        ₹{offer.minOrder}
                      </h3>
                    </div>
                  </div>

                  {/* META */}
                  <div className="mt-5 space-y-3">
                    <div className="flex items-center justify-between rounded-2xl border border-[#f5ebe4] bg-[#fffaf7] px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Users size={16} className="text-orange-500" />

                        <p className="text-sm font-medium text-slate-700">
                          Total Usage
                        </p>
                      </div>

                      <p className="text-sm font-bold text-slate-900">
                        {offer.usage}
                      </p>
                    </div>

                    <div className="flex items-center justify-between rounded-2xl border border-[#f5ebe4] bg-[#fffaf7] px-4 py-3">
                      <div className="flex items-center gap-3">
                        <CalendarDays size={16} className="text-orange-500" />

                        <p className="text-sm font-medium text-slate-700">
                          Expiry
                        </p>
                      </div>

                      <p className="text-sm font-bold text-slate-900">
                        {offer.expiry}
                      </p>
                    </div>

                    <div className="flex items-center justify-between rounded-2xl border border-[#f5ebe4] bg-[#fffaf7] px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Clock3 size={16} className="text-orange-500" />

                        <p className="text-sm font-medium text-slate-700">
                          Status
                        </p>
                      </div>

                      {offer.active ? (
                        <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
                          <CheckCircle2 size={14} />
                          Active
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-500">
                          <XCircle size={14} />
                          Expired
                        </div>
                      )}
                    </div>
                  </div>

                  {/* ACTIONS */}
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <button
                      onClick={() => {
                        setSelectedOffer(offer);
                        setIsEditOfferModalOpen((prev) => !prev);
                      }}
                      className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-[#f1e5dd] bg-white px-3 py-4 text-xs font-semibold text-slate-600 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-500"
                    >
                      <Pencil size={18} />
                      Edit
                    </button>

                    <button className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-red-100 bg-red-50 px-3 py-4 text-xs font-semibold text-red-500 transition hover:bg-red-100">
                      <Trash2 size={18} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* EMPTY */}
          {filteredOffers.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-[2rem] border border-dashed border-[#f1e5dd] bg-white px-6 py-20 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-[2rem] bg-orange-50 text-orange-500">
                <Search size={32} />
              </div>

              <h2 className="mt-6 text-2xl font-black tracking-tight text-slate-900">
                No offers found
              </h2>

              <p className="mt-3 max-w-md text-sm leading-7 text-slate-500">
                Try adjusting filters or create a new promotional offer.
              </p>
            </div>
          )}
        </section>
      </div>

      {isCreateOfferModalOpen && (
        <CreateOfferModal
          open={isCreateOfferModalOpen}
          onClose={() => setIsCreateOfferModalOpen(false)}
          onSave={() => toast.success("Offer created successfully!")}
        />
      )}

      {isEditOfferModalOpen && (
        <EditOfferModal
          offer={selectedOffer}
          open={isEditOfferModalOpen}
          onClose={() => {
            setIsEditOfferModalOpen(false);
            setSelectedOffer(null);
          }}
          onSave={() => toast.success("Offer updated successfully!")}
        />
      )}
    </main>
  );
};

export default PartnerOffers;
