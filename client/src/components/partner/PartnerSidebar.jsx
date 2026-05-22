import { useMemo } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";

import {
  LayoutDashboard,
  ShoppingBag,
  UtensilsCrossed,
  Percent,
  Star,
  Settings,
  Bell,
  LogOut,
  Menu,
  X,
  Store,
  Bike,
  Wallet,
  User
} from "lucide-react";

import { useAuthStore } from "../../store/useAuthStore";
import useUiStore from "../../store/useUiStore";

const navLinks = [
  {
    label: "Dashboard",
    to: "/partner",
    icon: LayoutDashboard,
  },

  {
    label: "Orders",
    to: "/partner/orders",
    icon: ShoppingBag,
  },

  {
    label: "Menu",
    to: "/partner/menu",
    icon: UtensilsCrossed,
  },

  {
    label: "Offers",
    to: "/partner/offers",
    icon: Percent,
  },

  {
    label: "Reviews",
    to: "/partner/reviews",
    icon: Star,
  },

  {
    label: "Riders",
    to: "/partner/riders",
    icon: Bike,
  },

  {
    label: "Payments",
    to: "/partner/payments",
    icon: Wallet,
  },

  {
    label: "Notifications",
    to: "/partner/notifications",
    icon: Bell,
  },
  {
    label: "Profile",
    to: "/partner/profile",
    icon: User,
  },

  {
    label: "Settings",
    to: "/partner/settings",
    icon: Settings,
  },
];

const PartnerSidebar = () => {
  const navigate = useNavigate();

  const { user, logout, isLogging } = useAuthStore();

  const { mobileOpen, setMobileOpen } = useUiStore();

  const displayName = user?.name || "Restaurant Manager";

  const displayEmail = user?.email || "manager@cravings.com";

  const avatarText = useMemo(() => {
    const parts = displayName.split(" ").filter(Boolean);

    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();

    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }, [displayName]);

  const handleLogout = async () => {
    await logout();

    setMobileOpen(false);

    navigate("/login", {
      replace: true,
    });
  };

  const sidebarContent = (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex h-full flex-col border-r border-[#f1e5dd] bg-white"
    >
      {/* TOP */}
      <div className="flex items-center justify-between border-b border-[#f4ebe5] px-5 py-5">
        <Link
          to="/partner"
          onClick={() => setMobileOpen(false)}
          className="flex items-center gap-3"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-orange-500 to-[#ff8c42] text-white shadow-lg shadow-orange-200">
            <Store size={22} />
          </div>

          <div>
            <p className="text-base font-extrabold tracking-tight text-(--text-primary)">
              Cravings
            </p>

            <p className="text-xs text-(--text-secondary)">Partner Panel</p>
          </div>
        </Link>

        <button
          onClick={() => setMobileOpen(false)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#ece2db] bg-white text-(--text-secondary) md:hidden"
        >
          <X size={18} />
        </button>
      </div>

      {/* PROFILE */}
      {/* <div className="px-5 py-5">
        <div className="overflow-hidden rounded-[1.75rem] border border-[#f1e5dd] bg-linear-to-br from-[#fff7f1] to-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-(--primary) text-sm font-bold text-white shadow-lg shadow-orange-200">
              {avatarText}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-(--text-primary)">
                {displayName}
              </p>

              <p className="truncate text-xs text-(--text-secondary)">
                {displayEmail}
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-700 shadow-sm">
              Active
            </span>

            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-orange-600 shadow-sm">
              Restaurant Open
            </span>
          </div>
        </div>
      </div> */}

      {/* NAV */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {/* <p className="px-3 pb-2 text-xs font-bold uppercase tracking-[0.25em] text-(--text-secondary)">
          Management
        </p> */}

        <div className="grid gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.label}
                to={link.to}
                end={link.to === "/partner"}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  [
                    "group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-200",
                    isActive
                      ? "bg-orange-50 text-(--primary) ring-1 ring-orange-100"
                      : "text-(--text-secondary) hover:bg-[#faf6f3] hover:text-(--text-primary)",
                  ].join(" ")
                }
              >
                <div className="relative">
                  <Icon size={18} />
                </div>

                <span>{link.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* BOTTOM */}
      <div className="border-t border-[#f1e5dd] p-4">
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
      {/* MOBILE TOP BAR */}
      <div className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between border-b border-[#f1e5dd] bg-white/95 px-4 shadow-sm backdrop-blur-xl md:hidden">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#ece2db] bg-white text-(--text-primary)"
          >
            <Menu size={18} />
          </button>

          <Link to="/partner" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-linear-to-br from-orange-500 to-[#ff8c42] text-white shadow-md shadow-orange-200">
              <Store size={18} />
            </div>

            <div>
              <p className="text-sm font-extrabold text-(--text-primary)">
                Cravings
              </p>

              <p className="text-[11px] text-(--text-secondary)">
                Partner Panel
              </p>
            </div>
          </Link>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-(--primary) text-xs font-bold text-white shadow-md shadow-orange-200">
          {avatarText}
        </div>
      </div>

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:fixed md:inset-y-0 md:left-0 md:z-40 md:block md:w-72">
        {sidebarContent}
      </aside>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            {/* OVERLAY */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            {/* DRAWER */}
            <motion.aside
              initial={{
                x: -320,
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: -320,
              }}
              transition={{
                duration: 0.28,
                ease: "easeOut",
              }}
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

export default PartnerSidebar;
