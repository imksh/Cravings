import React, { useEffect, useState } from "react";
import {
  Search,
  MapPin,
  ShoppingCart,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import LocationPickerModal from "../modal/LocationPickerModal";
import useUiStore from "../../store/useUiStore";

const CustomerHeader = () => {
  const navigate = useNavigate();
  const { location, isFetchingLocation, cart } = useUiStore();
  const { user, logout } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdown, setIsProfileDropdown] = useState(false);
  const [isLocationPickerModalOpen, setIsLocationPickerModalOpen] =
    useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [addressTitle, setAddressTitle] = useState(null);

  useEffect(() => {
    if (!location?.name) return;
    const t =
      user?.customer?.addresses.find((address) => address.name === location.name) ||
      null;
    setAddressTitle(t?.title);
  }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/menu?search=${searchQuery}`);
      setSearchQuery("");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsProfileDropdown(false);
  };

  const handleLocationClick = () => {
    setIsLocationPickerModalOpen(true);
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[color:var(--border)] bg-[color:var(--surface)]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex flex-row gap-2 justify-center items-center">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex shrink-0 items-center gap-2 text-left transition-opacity hover:opacity-80"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[color:var(--primary)]/10 text-xl">
                🍕
              </span>
              <span className="font-heading text-2xl font-extrabold tracking-tight text-[color:var(--primary)]">
                Cravings
              </span>
            </button>

            <button
              type="button"
              onClick={handleLocationClick}
              className="hidden items-center gap-2 rounded-2xl border border-(--border) px-4 py-2 text-xs font-light text-(--text-primary) transition hover:border-(--primary) hover:text-(--primary) md:flex"
            >
              {/* ICON WRAPPER */}
              <div className="relative flex items-center justify-center">
                {/* BUBBLE EFFECT */}
                {isFetchingLocation && (
                  <span className="absolute h-16 w-16 animate-ping rounded-full bg-(--primary)/40" />
                )}

                {/* ICON */}
                <MapPin
                  size={16}
                  className="relative z-10 shrink-0 text-[color:var(--primary)]"
                />
              </div>

              {/* TEXT */}
              <span className="max-w-[180px] truncate">
                {isFetchingLocation
                  ? "Detecting location..."
                  : addressTitle
                    ? addressTitle
                    : location?.name?.length > 30
                      ? `${location.name.substring(0, 30)}...`
                      : location?.name || "Current Location"}
              </span>
            </button>
          </div>

          <form
            onSubmit={handleSearch}
            className="hidden w-full max-w-xl flex-1 items-center gap-3 rounded-full border border-[color:var(--border)] bg-[#fafafa] px-4 py-2 shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition focus-within:border-[color:var(--primary)] focus-within:ring-2 focus-within:ring-[color:var(--primary)]/20 lg:flex"
          >
            <Search
              size={18}
              className="shrink-0 text-[color:var(--text-secondary)]"
            />
            <input
              type="text"
              placeholder="Search for restaurants or dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-sm text-[color:var(--text-primary)] outline-none placeholder:text-[color:var(--text-secondary)]"
            />
          </form>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => navigate("/customer/cart")}
              title="View Cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-2xl border border-[color:var(--border)] text-[color:var(--text-primary)] transition hover:border-[color:var(--primary)] hover:text-[color:var(--primary)]"
            >
              <ShoppingCart size={20} />
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-white bg-[color:var(--primary)] px-1 text-[11px] font-semibold text-white">
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </span>
            </button>

            {user ? (
              <div className="relative hidden lg:block">
                <button
                  type="button"
                  onClick={() => setIsProfileDropdown(!isProfileDropdown)}
                  title={user.name}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--border)] bg-gradient-to-br from-[color:var(--primary)] to-[#ff8c42] text-sm font-semibold text-white transition hover:scale-105 hover:shadow-lg"
                >
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </button>

                {isProfileDropdown && (
                  <div className="absolute right-0 top-full mt-3 w-64 overflow-hidden rounded-2xl border border-[color:var(--border)] bg-white shadow-xl">
                    <div className="bg-[#fafafa] px-4 py-3">
                      <p className="text-sm font-semibold text-[color:var(--text-primary)]">
                        {user.name}
                      </p>
                      <p className="mt-1 text-xs text-[color:var(--text-secondary)]">
                        {user.email}
                      </p>
                    </div>
                    <div className="border-t border-[color:var(--border)]" />
                    <button
                      type="button"
                      onClick={() => {
                        navigate("/customer/profile");
                        setIsProfileDropdown(false);
                      }}
                      className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-[color:var(--text-primary)] transition hover:bg-[#fafafa] hover:text-[color:var(--primary)]"
                    >
                      <User size={16} />
                      My Profile
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        navigate("/customer/order");
                        setIsProfileDropdown(false);
                      }}
                      className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-[color:var(--text-primary)] transition hover:bg-[#fafafa] hover:text-[color:var(--primary)]"
                    >
                      <ShoppingCart size={16} />
                      My Orders
                    </button>
                    <div className="border-t border-[color:var(--border)]" />
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-[#ef4f5f] transition hover:bg-[#ffe5e5]"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="hidden items-center gap-2 rounded-full border-2 border-[color:var(--primary)] px-4 py-2 text-sm font-semibold text-[color:var(--primary)] transition hover:bg-[color:var(--primary)] hover:text-white lg:flex"
              >
                <User size={18} />
                Sign In
              </button>
            )}

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-2xl text-[color:var(--text-primary)] transition hover:bg-[#fafafa] lg:hidden"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <form
          onSubmit={handleSearch}
          className="border-t border-[color:var(--border)] bg-[#fafafa] px-4 py-3 lg:hidden"
        >
          <div className="flex items-center gap-3 rounded-full border border-[color:var(--border)] bg-white px-4 py-2 shadow-[0_1px_2px_rgba(0,0,0,0.05)] focus-within:border-[color:var(--primary)] focus-within:ring-2 focus-within:ring-[color:var(--primary)]/20">
            <Search
              size={18}
              className="shrink-0 text-[color:var(--text-secondary)]"
            />
            <input
              type="text"
              placeholder="Search restaurants or dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-sm text-[color:var(--text-primary)] outline-none placeholder:text-[color:var(--text-secondary)]"
            />
          </div>
        </form>

        {isMobileMenuOpen && (
          <nav className="border-t border-[color:var(--border)] bg-[#fafafa] px-4 py-3 lg:hidden">
            <div className="flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm text-[color:var(--text-secondary)] shadow-sm">
              <MapPin
                size={18}
                className="shrink-0 text-[color:var(--primary)]"
              />
              <span className="truncate">{location}</span>
            </div>

            <div className="mt-3 space-y-2">
              {user ? (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      navigate("/profile");
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-3 rounded-2xl bg-white px-4 py-3 text-left text-sm font-medium text-[color:var(--text-primary)] shadow-sm transition hover:text-[color:var(--primary)]"
                  >
                    <User size={18} />
                    My Profile
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      navigate("/orders");
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-3 rounded-2xl bg-white px-4 py-3 text-left text-sm font-medium text-[color:var(--text-primary)] shadow-sm transition hover:text-[color:var(--primary)]"
                  >
                    <ShoppingCart size={18} />
                    My Orders
                  </button>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-2xl bg-white px-4 py-3 text-left text-sm font-medium text-[#ef4f5f] shadow-sm transition hover:bg-[#ffe5e5]"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    navigate("/login");
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-3 rounded-2xl bg-white px-4 py-3 text-left text-sm font-medium text-[color:var(--text-primary)] shadow-sm transition hover:text-[color:var(--primary)]"
                >
                  <User size={18} />
                  Sign In
                </button>
              )}
            </div>
          </nav>
        )}
      </header>

      {isLocationPickerModalOpen && (
        <LocationPickerModal
          open={isLocationPickerModalOpen}
          onUseCurrentLocation={() => {
            setIsLocationPickerModalOpen(false);
          }}
          onClose={() => setIsLocationPickerModalOpen(false)}
        />
      )}
    </>
  );
};

export default CustomerHeader;
