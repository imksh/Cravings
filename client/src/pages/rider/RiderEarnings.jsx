import { CalendarDays, Coins, TrendingUp, Wallet } from "lucide-react";

const payouts = [
  { label: "Today", value: "₹1,240" },
  { label: "This week", value: "₹7,860" },
  { label: "This month", value: "₹29,440" },
];

const weeklyBars = [72, 88, 61, 96, 78, 84, 90];

const RiderEarnings = () => {
  return (
    <div className="min-h-screen bg-[#f7f4ef]">
      <header className="border-b border-[#eadfce] bg-white/90 backdrop-blur-xl">
        <div className="px-4 py-5 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-500">
            Rider Money
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900">
            Earnings
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Track completed deliveries, payout history, and weekly momentum.
          </p>
        </div>
      </header>

      <section className="space-y-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="grid gap-4 md:grid-cols-3">
          {payouts.map((payout) => (
            <div
              key={payout.label}
              className="rounded-4xl border border-[#eadfce] bg-white p-6 shadow-sm"
            >
              <p className="text-sm font-semibold text-slate-500">
                {payout.label}
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900">
                {payout.value}
              </h2>
            </div>
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-4xl border border-[#eadfce] bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-slate-900">Weekly trend</p>
                <p className="mt-1 text-xs text-slate-500">
                  A simple view of your ride flow across the last 7 days.
                </p>
              </div>
              <TrendingUp className="text-orange-500" size={18} />
            </div>

            <div className="mt-8 grid grid-cols-7 items-end gap-3">
              {weeklyBars.map((height, index) => (
                <div key={index} className="flex flex-col items-center gap-3">
                  <div className="flex h-52 w-full items-end rounded-3xl bg-[#fcfaf7] p-2">
                    <div
                      className="w-full rounded-[1.2rem] bg-linear-to-t from-orange-500 to-amber-400"
                      style={{ height: `${height}%` }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-slate-400">
                    {["S", "M", "T", "W", "T", "F", "S"][index]}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-4xl border border-[#eadfce] bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-slate-900">Payout info</p>
                <Wallet size={18} className="text-orange-500" />
              </div>

              <div className="mt-5 space-y-4 text-sm text-slate-600">
                <div className="flex items-center justify-between rounded-2xl bg-[#fcfaf7] p-4">
                  <span>Base delivery amount</span>
                  <strong className="text-slate-900">₹65</strong>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-[#fcfaf7] p-4">
                  <span>Peak hour bonus</span>
                  <strong className="text-slate-900">₹18</strong>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-[#fcfaf7] p-4">
                  <span>Tips collected</span>
                  <strong className="text-slate-900">₹146</strong>
                </div>
              </div>
            </div>

            <div className="rounded-4xl border border-[#eadfce] bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-slate-900">Next payout</p>
                <CalendarDays size={18} className="text-orange-500" />
              </div>

              <div className="mt-4 rounded-3xl bg-orange-50 p-4 text-sm text-orange-700">
                Monday, 9:00 AM. Keep at least 3 more deliveries to cross the
                next payout tier.
              </div>

              <button className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600">
                <Coins size={16} />
                Withdraw summary
              </button>
            </div>

            <div className="rounded-4xl border border-[#eadfce] bg-white p-6 shadow-sm">
              <p className="text-sm font-bold text-slate-900">
                Recent payout logs
              </p>
              <div className="mt-5 space-y-4">
                <div className="flex items-center justify-between rounded-2xl bg-[#fcfaf7] p-4 text-sm">
                  <span className="text-slate-600">
                    12 deliveries completed
                  </span>
                  <strong className="text-slate-900">₹820</strong>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-[#fcfaf7] p-4 text-sm">
                  <span className="text-slate-600">Tip adjustments</span>
                  <strong className="text-slate-900">₹146</strong>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-[#fcfaf7] p-4 text-sm">
                  <span className="text-slate-600">Night bonus</span>
                  <strong className="text-slate-900">₹180</strong>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default RiderEarnings;
