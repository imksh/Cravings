const PartnerDashboard = () => {
  const stats = [
    {
      label: "Today Orders",
      value: "128",
      change: "+12.4%",
    },
    {
      label: "Revenue",
      value: "₹24,860",
      change: "+8.2%",
    },
    {
      label: "Active Riders",
      value: "14",
      change: "+2",
    },
    {
      label: "Avg Delivery",
      value: "21 min",
      change: "-4 min",
    },
  ];

  const orders = [
    {
      id: "#CRV1021",
      customer: "Rahul Sharma",
      item: "Chicken Biryani x2",
      total: "₹598",
      status: "Preparing",
    },
    {
      id: "#CRV1022",
      customer: "Aman Verma",
      item: "Paneer Tikka Combo",
      total: "₹349",
      status: "Confirmed",
    },
    {
      id: "#CRV1023",
      customer: "Karan Patel",
      item: "Butter Chicken Meal",
      total: "₹429",
      status: "Out for delivery",
    },
  ];

  const topItems = [
    {
      name: "Chicken Biryani",
      orders: 84,
    },
    {
      name: "Butter Chicken",
      orders: 61,
    },
    {
      name: "Paneer Tikka",
      orders: 48,
    },
  ];

  return (
    <main className="min-h-screen bg-[#faf7f4] text-slate-900">
      <div className="">
        {/* HEADER */}
        <header className="sticky top-0 z-30 border-b border-[#f1e5dd] bg-white/90 backdrop-blur-xl">
          <div className="flex flex-col gap-5 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-500">
                Restaurant Overview
              </p>

              <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900">
                Dashboard
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Track live orders, restaurant performance, and delivery
                activity.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="rounded-2xl border border-[#f1e5dd] bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-500">
                Download Report
              </button>

              <button className="rounded-2xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600">
                Add New Item
              </button>
            </div>
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

                <div className="mt-4 flex items-end justify-between gap-4">
                  <h2 className="text-3xl font-black tracking-tight text-slate-900">
                    {stat.value}
                  </h2>

                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
                    {stat.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* GRID */}
          <div className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
            {/* LIVE ORDERS */}
            <div className="rounded-[2rem] border border-[#f1e5dd] bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-[#f5ebe4] px-6 py-5">
                <div>
                  <p className="text-sm font-bold text-slate-900">
                    Live Orders
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Recent customer activity
                  </p>
                </div>

                <button className="rounded-xl bg-orange-50 px-4 py-2 text-xs font-bold text-orange-500 transition hover:bg-orange-100">
                  View all
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-[#f5ebe4] text-left text-xs uppercase tracking-[0.2em] text-slate-400">
                      <th className="px-6 py-4 font-semibold">Order</th>
                      <th className="px-6 py-4 font-semibold">Customer</th>
                      <th className="px-6 py-4 font-semibold">Items</th>
                      <th className="px-6 py-4 font-semibold">Amount</th>
                      <th className="px-6 py-4 font-semibold">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {orders.map((order) => (
                      <tr
                        key={order.id}
                        className="border-b border-[#faf2ec] transition hover:bg-[#fffaf7]"
                      >
                        <td className="px-6 py-5 text-sm font-bold text-slate-900">
                          {order.id}
                        </td>

                        <td className="px-6 py-5 text-sm text-slate-600">
                          {order.customer}
                        </td>

                        <td className="px-6 py-5 text-sm text-slate-600">
                          {order.item}
                        </td>

                        <td className="px-6 py-5 text-sm font-semibold text-slate-900">
                          {order.total}
                        </td>

                        <td className="px-6 py-5">
                          <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-600">
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="space-y-6">
              {/* PERFORMANCE */}
              <div className="rounded-[2rem] border border-[#f1e5dd] bg-white p-6 shadow-sm">
                <p className="text-sm font-bold text-slate-900">
                  Restaurant Performance
                </p>

                <div className="mt-6 space-y-5">
                  <div>
                    <div className="mb-2 flex items-center justify-between text-sm font-semibold text-slate-600">
                      <span>Customer Satisfaction</span>
                      <span>92%</span>
                    </div>

                    <div className="h-3 overflow-hidden rounded-full bg-[#f4ebe5]">
                      <div className="h-full w-[92%] rounded-full bg-orange-500" />
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between text-sm font-semibold text-slate-600">
                      <span>Order Completion</span>
                      <span>88%</span>
                    </div>

                    <div className="h-3 overflow-hidden rounded-full bg-[#f4ebe5]">
                      <div className="h-full w-[88%] rounded-full bg-emerald-500" />
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between text-sm font-semibold text-slate-600">
                      <span>Delivery Speed</span>
                      <span>79%</span>
                    </div>

                    <div className="h-3 overflow-hidden rounded-full bg-[#f4ebe5]">
                      <div className="h-full w-[79%] rounded-full bg-sky-500" />
                    </div>
                  </div>
                </div>
              </div>

              {/* TOP ITEMS */}
              <div className="rounded-[2rem] border border-[#f1e5dd] bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-slate-900">
                    Top Selling Items
                  </p>

                  <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-500">
                    Today
                  </span>
                </div>

                <div className="mt-5 space-y-4">
                  {topItems.map((item, index) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between rounded-2xl border border-[#f7eee8] bg-[#fffaf7] px-4 py-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-500 text-sm font-black text-white">
                          {index + 1}
                        </div>

                        <div>
                          <p className="text-sm font-bold text-slate-900">
                            {item.name}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            Bestseller item
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-sm font-black text-slate-900">
                          {item.orders}
                        </p>

                        <p className="text-xs text-slate-500">orders</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* QUICK ACTIONS */}
              <div className="rounded-[2rem] bg-linear-to-r from-orange-500 to-[#ff8c42] p-[1px] shadow-xl shadow-orange-200">
                <div className="rounded-[calc(2rem-1px)] bg-white p-6">
                  <p className="text-sm font-bold text-slate-900">
                    Quick Actions
                  </p>

                  <div className="mt-5 grid gap-3">
                    <button className="rounded-2xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-600">
                      Add Menu Item
                    </button>

                    <button className="rounded-2xl border border-[#f1e5dd] bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-500">
                      Create Offer
                    </button>

                    <button className="rounded-2xl border border-[#f1e5dd] bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-500">
                      Manage Riders
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default PartnerDashboard;
