import React, { useEffect, useState } from "react";
import {
  Check,
  Clock3,
  Edit,
  Edit3,
  Heart,
  LogOut,
  MapPin,
  Package,
  Phone,
  Settings,
  ShoppingBag,
  Star,
  User,
  BadgeCheck,
} from "lucide-react";
import EditProfileModal from "../../components/modal/EditProfileModal";
import AddAddressModal from "../../components/customer/modal/AddAddressModal";
import toast from "react-hot-toast";
import ChangePasswordModal from "../../components/modal/ChangePasswordModal";
import { useAuthStore } from "../../store/useAuthStore";
import api from "../../config/api";
import { getRelativeTime } from "../../utils/getRelativeTime";
import { useNavigate } from "react-router-dom";
import useUiStore from "../../store/useUiStore";

const ProfileSection = ({ icon, title, children, action }) => {
  return (
    <div className="rounded-4xl border border-(--border) bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-orange-50 p-3 text-(--primary)">
            {icon}
          </div>

          <h2 className="text-xl font-bold text-(--text-primary)">{title}</h2>
        </div>

        {action}
      </div>

      <div className="mt-6">{children}</div>
    </div>
  );
};

const CustomerProfile = () => {
  const { user, setUser } = useAuthStore();
  const [activeTab, setActiveTab] = useState("orders");
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const { likedRestaurants, likedMenus } = useUiStore();

  const settings = [
    {
      label: "Edit profile",
      onClick: () => setIsEditProfileModalOpen(true),
    },
    {
      label: "Notification preferences",
    },
    {
      label: "Payment methods",
    },
    {
      label: "Privacy settings",
    },
    {
      label: "Change password",
      onClick: () => setIsChangePasswordModalOpen(true),
    },
  ];

  useEffect(() => {
    fetchRecentOrders();
  }, []);

  const fetchRecentOrders = async () => {
    try {
      const res = await api.get("/customer/order", {
        params: {
          page: 1,
          limit: 4,
        },
      });
      setOrders(res.data.data);
    } catch (error) {
      console.error("Error fetching recent orders:", error);
    }
  };

  const handleSetDefault = async (addressId) => {
    try {
      const res = await api.patch(`/customer/address/${addressId}/default`);
      const updatedUser = { ...user };
      updatedUser.customer.addresses = res.data.data;
      console.log(updatedUser);
      toast.success("Default address updated successfully!");
      setUser(updatedUser);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update default address. Please try again.",
      );

      console.log(error);
    }
  };

  return (
    <main className="min-h-screen bg-[#fffdf9] text-(--text-primary)">
      {/* HEADER */}
      <section className="border-b border-(--border) bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            {/* LEFT */}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-orange-100 bg-[#fafafa]">
                <img
                  src={
                    user.avatar.url ||
                    `https://placehold.co/600x400/ff6b35/white?text=${user.name.charAt(0) || "U"}&font=roboto`
                  }
                  alt={user.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div>
                <p className="text-sm font-medium text-(--primary)">
                  Customer profile
                </p>

                <h1 className="mt-2 text-4xl font-extrabold tracking-tight">
                  {user.name}
                </h1>

                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-(--text-secondary)">
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    {user.email}
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone size={16} />
                    {user.phone}
                  </div>
                </div>

                <p className="mt-3 text-sm text-(--text-secondary)">
                  {user.joined}
                </p>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex flex-wrap gap-3">
              <button
                className="inline-flex items-center gap-2 rounded-2xl border border-(--border) bg-white px-5 py-3 font-medium transition hover:border-(--primary) hover:text-(--primary)"
                onClick={() => setIsEditProfileModalOpen(true)}
              >
                <Edit3 size={18} />
                Edit profile
              </button>

              <button className="inline-flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-5 py-3 font-medium text-red-500 transition hover:bg-red-100">
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[280px_1fr] lg:px-8">
        {/* SIDEBAR */}
        <aside className="h-fit rounded-4xl border border-(--border) bg-white p-4 shadow-sm">
          <div className="space-y-2">
            {[
              {
                id: "orders",
                label: "My Orders",
                icon: <ShoppingBag size={18} />,
              },
              {
                id: "favorites",
                label: "Favorites",
                icon: <Heart size={18} />,
              },
              {
                id: "addresses",
                label: "Addresses",
                icon: <MapPin size={18} />,
              },
              {
                id: "settings",
                label: "Settings",
                icon: <Settings size={18} />,
              },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left font-medium transition ${
                  activeTab === item.id
                    ? "bg-(--primary) text-white"
                    : "hover:bg-orange-50 hover:text-(--primary)"
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        </aside>

        {/* MAIN */}
        <div className="space-y-8">
          {/* ORDERS */}
          {activeTab === "orders" && (
            <ProfileSection
              icon={<Package size={20} />}
              title="Recent orders"
              action={
                <button
                  onClick={() => navigate("/customer/order")}
                  className="rounded-full bg-(--primary) px-4 py-2 text-sm font-semibold text-white"
                >
                  View all
                </button>
              }
            >
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order._id}
                    className="flex flex-col gap-5 rounded-3xl border border-(--border) bg-[#fafafa] p-5 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-3">
                        <p className="font-bold text-(--text-primary)">
                          {order.orderId}
                        </p>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            order.status === "Delivered"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-red-50 text-red-500"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>

                      <p className="mt-2 text-sm text-(--text-secondary)">
                        {order.restaurant.name}
                      </p>

                      <div className="mt-3 flex items-center gap-2 text-sm text-(--text-secondary)">
                        <Clock3 size={15} />
                        {getRelativeTime(order.createdAt)}
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-6 sm:flex-col sm:items-end">
                      <p className="text-2xl font-extrabold text-(--primary)">
                        {order.total}
                      </p>

                      <button className="rounded-full bg-(--primary) px-4 py-2 text-sm font-semibold text-white">
                        Reorder
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </ProfileSection>
          )}

          {/* FAVORITES */}
          {activeTab === "favorites" && (
            <div className="space-y-6">
              <ProfileSection
                icon={<Heart size={20} />}
                title="Favorite restaurants"
              >
                {likedRestaurants?.length ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {likedRestaurants.map((restaurant) => (
                      <div
                        key={restaurant?._id || restaurant?.name}
                        className="rounded-3xl border border-(--border) bg-[#fafafa] p-5"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <h3 className="font-bold text-(--text-primary)">
                              {restaurant?.name}
                            </h3>

                            <div className="mt-2 flex items-center gap-2 text-sm text-emerald-700">
                              <Star size={15} fill="currentColor" />
                              {restaurant?.rating || "0.0"}
                            </div>
                          </div>

                          <button className="rounded-full bg-orange-50 p-3 text-(--primary)">
                            <Heart size={18} fill="currentColor" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-3xl border border-dashed border-(--border) bg-[#fafafa] p-6 text-sm text-(--text-secondary)">
                    No favorite restaurants yet.
                  </div>
                )}
              </ProfileSection>

              <ProfileSection
                icon={<ShoppingBag size={20} />}
                title="Favorite menu items"
              >
                {likedMenus?.length ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {likedMenus.map((menu) => (
                      <div
                        key={menu?._id || menu?.name}
                        className="rounded-3xl border border-(--border) bg-[#fafafa] p-5"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <div className="h-16 w-16 overflow-hidden rounded-2xl bg-orange-100">
                              <img
                                src={
                                  menu?.images?.[0] ||
                                  menu?.image ||
                                  "/images/placeholder-food.png"
                                }
                                alt={menu?.name || "menu item"}
                                className="h-full w-full object-cover"
                              />
                            </div>

                            <div>
                              <h3 className="font-bold text-(--text-primary)">
                                {menu?.name}
                              </h3>
                              <p className="mt-2 text-sm text-(--text-secondary)">
                                {menu?.restaurant?.name ||
                                  menu?.restaurantName ||
                                  "Restaurant"}
                              </p>
                              <p className="mt-2 font-semibold text-(--primary)">
                                {menu?.price || "-"}
                              </p>
                            </div>
                          </div>

                          <button className="rounded-full bg-orange-50 p-3 text-(--primary)">
                            <Heart size={18} fill="currentColor" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-3xl border border-dashed border-(--border) bg-[#fafafa] p-6 text-sm text-(--text-secondary)">
                    No favorite menu items yet.
                  </div>
                )}
              </ProfileSection>
            </div>
          )}

          {/* ADDRESSES */}
          {activeTab === "addresses" && (
            <ProfileSection
              icon={<MapPin size={20} />}
              title="Saved addresses"
              action={
                <button
                  onClick={() => setIsAddAddressModalOpen(true)}
                  className="rounded-full bg-(--primary) px-4 py-2 text-sm font-semibold text-white"
                >
                  Add new
                </button>
              }
            >
              <div className="grid gap-4 sm:grid-cols-2">
                {user?.customer?.addresses?.map((address) => (
                  <div
                    key={address.title}
                    className="rounded-3xl border border-(--border) bg-[#fafafa] p-5 relative"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl bg-orange-50 p-3 text-(--primary)">
                        <MapPin size={18} />
                      </div>

                      <div>
                        <h3 className="font-bold text-(--text-primary)">
                          {address.title}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-(--text-secondary)">
                          {address.address}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-3">
                      {/* EDIT */}
                      <button className="group flex items-center justify-center gap-2 rounded-2xl border border-[#f1e5dd] bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-orange-200 hover:bg-orange-50 hover:text-(--primary)">
                        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#faf7f4] text-slate-500 transition group-hover:bg-orange-100 group-hover:text-(--primary)">
                          <Edit size={16} />
                        </div>

                        <span>Edit Address</span>
                      </button>

                      {/* DEFAULT */}
                      <button
                        onClick={() => handleSetDefault(address.id)}
                        className="group flex items-center justify-center gap-2 rounded-2xl bg-(--primary) px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-200 transition hover:scale-[1.02] hover:bg-[#e85a28]"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
                          <BadgeCheck size={16} />
                        </div>

                        {address.isDefault
                          ? "Default Address"
                          : "Set as Default"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </ProfileSection>
          )}

          {/* SETTINGS */}
          {activeTab === "settings" && (
            <ProfileSection
              icon={<Settings size={20} />}
              title="Account settings"
            >
              <div className="space-y-4">
                {settings.map((setting) => (
                  <button
                    key={setting.label}
                    onClick={setting.onClick}
                    className="flex w-full items-center justify-between rounded-3xl border border-(--border) bg-[#fafafa] px-5 py-4 text-left font-medium transition hover:border-(--primary)"
                  >
                    {setting.label}

                    <span className="text-(--primary)">→</span>
                  </button>
                ))}
              </div>
            </ProfileSection>
          )}
        </div>
      </section>

      {/* EDIT PROFILE MODAL */}
      {isEditProfileModalOpen && (
        <EditProfileModal
          open={isEditProfileModalOpen}
          user={user}
          onClose={() => setIsEditProfileModalOpen(false)}
          onSave={() => {
            toast.success("Profile updated successfully!");
            setIsEditProfileModalOpen(false);
          }}
        />
      )}

      {/* ADD ADDRESS MODAL */}
      {isAddAddressModalOpen && (
        <AddAddressModal
          open={isAddAddressModalOpen}
          onClose={() => setIsAddAddressModalOpen(false)}
        />
      )}

      {/* CHANGE PASSWORD MODAL */}
      {isChangePasswordModalOpen && (
        <ChangePasswordModal
          open={isChangePasswordModalOpen}
          onClose={() => setIsChangePasswordModalOpen(false)}
          onSave={() => {
            toast.success("Password changed successfully!");
            setIsChangePasswordModalOpen(false);
          }}
        />
      )}
    </main>
  );
};

export default CustomerProfile;
