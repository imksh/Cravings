import {
  ChevronRight,
  Clock3,
  MapPin,
  Package,
  Phone,
  Search,
  UserCircle2,
} from "lucide-react";

const orders = [
  {
    id: "CRV2451",
    customer: "Aman Verma",
    from: "Spice Avenue Kitchen",
    to: "Sector 63, Noida",
    status: "Picked",
    eta: "16 min",
    distance: "4.2 km",
  },
  {
    id: "CRV2452",
    customer: "Riya Singh",
    from: "Burger House",
    to: "Sector 22, Noida",
    status: "Ready",
    eta: "11 min",
    distance: "2.8 km",
  },
  {
    id: "CRV2453",
    customer: "Nitin Sharma",
    from: "Tandoori Junction",
    to: "Indirapuram, Ghaziabad",
    status: "Assigned",
    eta: "23 min",
    distance: "7.4 km",
  },
];

const statusTone = {
  Assigned: "bg-orange-50 text-orange-600 border-orange-100",
  Ready: "bg-sky-50 text-sky-600 border-sky-100",
  Picked: "bg-emerald-50 text-emerald-600 border-emerald-100",
};

const RiderOrders = () => {
  return (
    <div className="min-h-screen bg-[#f7f4ef]">
      <header className="border-b border-[#eadfce] bg-white/90 backdrop-blur-xl">
        <div className="flex flex-col gap-5 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-500">
              Delivery Queue
            </p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900">
              Rider Orders
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Focus on active jobs, pickup readiness, and the next address on
              your route.
            </p>
          </div>

          <div className="flex w-full max-w-md items-center gap-3 rounded-2xl border border-[#eadfce] bg-[#fcfaf7] px-4 py-3 lg:w-[26rem]">
            <Search size={18} className="text-orange-500" />
            <input
              type="text"
              placeholder="Search order id, customer, or address"
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
          </div>
        </div>
      </header>

      <section className="space-y-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-[2rem] border border-[#eadfce] bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-slate-500">Active jobs</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900">
              12
            </h2>
          </div>
          <div className="rounded-[2rem] border border-[#eadfce] bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-slate-500">Near pickup</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900">
              5
            </h2>
          </div>
          <div className="rounded-[2rem] border border-[#eadfce] bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-slate-500">Need call</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900">
              2
            </h2>
          </div>
        </div>

        <div className="space-y-4">
          {orders.map((order) => (
            <article
              key={order.id}
              className="rounded-[2rem] border border-[#eadfce] bg-white p-5 shadow-sm"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
                    <Package size={22} />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-lg font-bold text-slate-900">
                        {order.id}
                      </h2>
                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-bold ${statusTone[order.status]}`}
                      >
                        {order.status}
                      </span>
                    </div>

                    <p className="mt-2 text-sm text-slate-600">
                      {order.customer}
                    </p>

                    <div className="mt-4 flex flex-col gap-2 text-sm text-slate-500">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-orange-500" />
                        {order.from}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-emerald-500" />
                        {order.to}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3 lg:min-w-[24rem]">
                  <div className="rounded-2xl bg-[#fcfaf7] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                      ETA
                    </p>
                    <div className="mt-2 flex items-center gap-2 text-sm font-bold text-slate-900">
                      <Clock3 size={16} className="text-orange-500" />
                      {order.eta}
                    </div>
                  </div>

                  <div className="rounded-2xl bg-[#fcfaf7] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                      Distance
                    </p>
                    <p className="mt-2 text-sm font-bold text-slate-900">
                      {order.distance}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#fcfaf7] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                      Contact
                    </p>
                    <div className="mt-2 flex items-center gap-2 text-sm font-bold text-slate-900">
                      <Phone size={16} className="text-orange-500" />
                      Call rider
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[#f3e8dc] pt-5">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <UserCircle2 size={16} className="text-orange-500" />
                  Waiting for route confirmation
                </div>

                <button className="inline-flex items-center gap-2 rounded-2xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600">
                  Open details
                  <ChevronRight size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default RiderOrders;
