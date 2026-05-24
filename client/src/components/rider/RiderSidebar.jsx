import { useMemo, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bike,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  Menu,
  ScanLine,
  UserCircle2,
  Wallet,
  X,
} from "lucide-react";

import { useAuthStore } from "../../store/useAuthStore";

const navLinks = [
  {
    label: "Dashboard",
    to: "/rider",
    icon: LayoutDashboard,
  },
  {
    label: "Orders",
    to: "/rider/orders",
    icon: ClipboardList,
  },
  {
    label: "Earnings",
    to: "/rider/earnings",
    icon: Wallet,
  },
  {
    label: "Profile",
    to: "/rider/profile",
    icon: UserCircle2,
  },
];

const RiderSidebar = () => {
  const navigate = useNavigate();
  const { user, logout, isLogging } = useAuthStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  const displayName = user?.name || "Delivery Rider";
  const displayEmail = user?.email || "rider@cravings.com";

  const avatarText = useMemo(() => {
    const parts = displayName.split(" ").filter(Boolean);

    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();

    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }, [displayName]);

  const handleLogout = async () => {
    await logout();
    setMobileOpen(false);
    navigate("/login", { replace: true });
  };

  const sidebarContent = (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex h-full flex-col border-r border-[#eadfce] bg-white"
    >
      <div className="flex items-center justify-between border-b border-[#f0e5d7] px-5 py-5">
        <Link
          to="/rider"
          onClick={() => setMobileOpen(false)}
          className="flex items-center gap-3"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-orange-500 to-amber-400 text-white shadow-lg shadow-orange-200">
            <Bike size={22} />
          </div>

          <div>
            <p className="text-base font-extrabold tracking-tight text-slate-900">
              Cravings
            </p>
            <p className="text-xs text-slate-500">Rider Panel</p>
          </div>
        </Link>

        <button
          onClick={() => setMobileOpen(false)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#ece1d2] bg-white text-slate-600 md:hidden"
        >
          <X size={18} />
        </button>
      </div>

      <div className="px-5 py-5">
        <div className="rounded-[1.75rem] border border-[#efe2d2] bg-linear-to-br from-[#fff8f0] to-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 text-sm font-black text-white shadow-lg shadow-orange-200">
              {avatarText}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-slate-900">
                {displayName}
              </p>
              <p className="truncate text-xs text-slate-500">{displayEmail}</p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              Available
            </span>
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-orange-600 shadow-sm">
              Bike Delivery
            </span>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <div className="grid gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.label}
                to={link.to}
                end={link.to === "/rider"}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  [
                    "group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-200",
                    isActive
                      ? "bg-orange-50 text-orange-600 ring-1 ring-orange-100"
                      : "text-slate-500 hover:bg-[#faf5ef] hover:text-slate-900",
                  ].join(" ")
                }
              >
                <Icon size={18} />
                <span>{link.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>

      <div className="border-t border-[#f0e5d7] p-4">
        <button
          type="button"
          onClick={handleLogout}
          disabled={isLogging}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-100 disabled:opacity-60"
        >
          <LogOut size={16} />
          {isLogging ? "Signing out..." : "Sign out"}
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <div className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between border-b border-[#eadfce] bg-white/95 px-4 shadow-sm backdrop-blur-xl md:hidden">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#ece1d2] bg-white text-slate-900"
          >
            <Menu size={18} />
          </button>

          <Link to="/rider" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-linear-to-br from-orange-500 to-amber-400 text-white shadow-md shadow-orange-200">
              <ScanLine size={18} />
            </div>

            <div>
              <p className="text-sm font-extrabold text-slate-900">Cravings</p>
              <p className="text-[11px] text-slate-500">Rider Panel</p>
            </div>
          </Link>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-xs font-bold text-white shadow-md shadow-orange-200">
          {avatarText}
        </div>
      </div>

      <aside className="hidden md:fixed md:inset-y-0 md:left-0 md:z-40 md:block md:w-72">
        {sidebarContent}
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            <motion.aside
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="absolute left-0 top-0 h-full w-[88vw] max-w-sm shadow-2xl shadow-black/20"
            >
              {sidebarContent}
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RiderSidebar;
