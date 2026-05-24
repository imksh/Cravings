import {
  ArrowRight,
  Bike,
  Clock3,
  MapPin,
  Package,
  Route,
  Star,
  Wallet,
} from "lucide-react";
import { Link } from "react-router-dom";

const RiderDashboard = () => {
  const stats = [
    {
      label: "Assigned",
      value: "4",
      icon: Package,
      accent: "text-orange-600",
      tone: "bg-orange-50",
    },
    {
      label: "Completed Today",
      value: "18",
      icon: Bike,
      accent: "text-emerald-600",
      tone: "bg-emerald-50",
    },
    {
      label: "On Route",
      value: "2",
      icon: Route,
      accent: "text-sky-600",
      tone: "bg-sky-50",
    },
    {
      label: "Earned Today",
      value: "₹1,240",
      icon: Wallet,
      accent: "text-violet-600",
      tone: "bg-violet-50",
    },
  ];

  const activeStops = [
    {
      title: "Pick up from Spice Avenue",
      meta: "Order #CRV2451 · 14 mins away",
      status: "Pickup",
    },
    {
      title: "Drop at Sector 18, Noida",
      meta: "Customer reachable on call",
      status: "Drop",
    },
  ];

  const timeline = [
    "Order assigned",
    "Restaurant confirmed",
    "Ready for pickup",
    "Out for delivery",
  ];

  return (
    <div className="min-h-screen bg-[#f7f4ef]">
      <header className="border-b border-[#eadfce] bg-white/90 backdrop-blur-xl">
        <div className="flex flex-col gap-5 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-500">
              Delivery Command
            </p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900">
              Rider Dashboard
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-500">
              Monitor live jobs, keep your route tight, and move orders from
              pickup to drop without switching screens.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="rounded-2xl border border-[#eadfce] bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600">
              Toggle Availability
            </button>

            <Link
              to="/rider/orders"
              className="inline-flex items-center gap-2 rounded-2xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600"
            >
              Open Orders
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </header>

      <section className="space-y-8 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="rounded-[2rem] border border-[#eadfce] bg-white p-6 shadow-sm"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-500">
                      {stat.label}
                    </p>
                    <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
                      {stat.value}
                    </h2>
                  </div>

                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.tone} ${stat.accent}`}
                  >
                    <Icon size={20} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
          <section className="rounded-[2rem] border border-[#eadfce] bg-white shadow-sm">
            <div className="border-b border-[#f3e8dc] px-6 py-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-slate-900">
                    Current Delivery
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Keep the rider route visible and action-ready.
                  </p>
                </div>

                <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-600">
                  Priority
                </span>
              </div>
            </div>

            <div className="grid gap-6 p-6 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="rounded-[1.75rem] bg-linear-to-br from-orange-500 to-amber-400 p-6 text-white shadow-xl shadow-orange-200">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/80">
                      Live Route
                    </p>
                    <h3 className="mt-2 text-2xl font-black tracking-tight">
                      CRV2451
                    </h3>
                  </div>

                  <div className="rounded-2xl bg-white/15 px-3 py-2 text-right backdrop-blur-sm">
                    <p className="text-xs text-white/75">ETA</p>
                    <p className="text-lg font-black">16 min</p>
                  </div>
                </div>

                <div className="mt-8 space-y-4 rounded-[1.5rem] bg-white/10 p-4 backdrop-blur-sm">
                  {timeline.map((step, index) => (
                    <div key={step} className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-xs font-black text-orange-500">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{step}</p>
                        <p className="text-xs text-white/70">
                          {index === 0
                            ? "Assigned 8 minutes ago"
                            : "Pending update"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {activeStops.map((stop) => (
                  <div
                    key={stop.title}
                    className="rounded-[1.5rem] border border-[#f0e5d7] bg-[#fcfaf7] p-5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          {stop.title}
                        </p>
                        <p className="mt-2 text-sm text-slate-500">
                          {stop.meta}
                        </p>
                      </div>

                      <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-700 shadow-sm">
                        {stop.status}
                      </span>
                    </div>
                  </div>
                ))}

                <div className="rounded-[1.5rem] border border-[#f0e5d7] bg-white p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        Pickup window
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        Restaurant said the order will be ready at 4:10 PM.
                      </p>
                    </div>

                    <Clock3 className="text-orange-500" size={18} />
                  </div>

                  <div className="mt-4 overflow-hidden rounded-full bg-[#f4ebe2]">
                    <div className="h-3 w-[72%] rounded-full bg-orange-500" />
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
                    <MapPin size={16} className="text-orange-500" />
                    Spice Avenue Kitchen, Sector 63
                  </div>
                </div>
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-[#eadfce] bg-white p-6 shadow-sm">
              <p className="text-sm font-bold text-slate-900">Live notes</p>
              <div className="mt-5 space-y-4">
                <div className="rounded-2xl bg-orange-50 p-4 text-sm text-orange-700">
                  Restaurant requests a quick pickup. Keep this order first in
                  your queue.
                </div>
                <div className="rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-700">
                  Customer is available on phone and WhatsApp.
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-[#eadfce] bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-slate-900">Performance</p>
                <Star size={18} className="text-amber-500" />
              </div>

              <div className="mt-5 space-y-5">
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm font-semibold text-slate-600">
                    <span>Acceptance</span>
                    <span>97%</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-[#f4ebe2]">
                    <div className="h-full w-[97%] rounded-full bg-emerald-500" />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between text-sm font-semibold text-slate-600">
                    <span>On-time delivery</span>
                    <span>91%</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-[#f4ebe2]">
                    <div className="h-full w-[91%] rounded-full bg-orange-500" />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between text-sm font-semibold text-slate-600">
                    <span>Customer rating</span>
                    <span>4.8/5</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-[#f4ebe2]">
                    <div className="h-full w-[96%] rounded-full bg-sky-500" />
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default RiderDashboard;
