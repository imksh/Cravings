import React, { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import {
  Camera,
  Edit3,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Store,
  User,
  Clock3,
  Star,
  Wallet,
  FileText,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import EditRestaurantModal from "../../components/partner/modal/EditRestaurantModal";
import toast from "react-hot-toast";
import api from "../../config/api";

const stats = [
  {
    label: "Total Orders",
    value: "12.4k",
  },
  {
    label: "Restaurant Rating",
    value: "4.8",
  },
  {
    label: "Total Revenue",
    value: "₹8.2L",
  },
  {
    label: "Years Active",
    value: "3+",
  },
];

const timings = [
  {
    day: "Monday - Friday",
    time: "10:00 AM - 11:00 PM",
  },
  {
    day: "Saturday",
    time: "11:00 AM - 01:00 AM",
  },
  {
    day: "Sunday",
    time: "Closed",
  },
];

const PartnerProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditRestaurantModalOpen, setIsEditRestaurantModalOpen] =
    useState(false);
  const { user, setUser } = useAuthStore();
  const [restaurant, setRestaurant] = useState(user?.restaurant || {});

  const editRestaurant = async (data) => {
    try {
      const res = await api.put(
        `/partner/updateRestaurant/${restaurant._id}`,
        data,
      );
      toast.success("Restaurant details updated successfully!");
      setRestaurant(res.data.data);
      setUser({ ...user, restaurant: res.data.data });
      setIsEditRestaurantModalOpen(false);
    } catch (error) {
      console.log("Error in EditRestaurant : ", error);
      toast.error("Failed to update restaurant details. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-[#faf7f4] text-slate-900">
      <div className="">
        {/* HEADER */}
        <section className="relative overflow-hidden border-b border-[#f1e5dd] bg-white">
          <div className="absolute inset-0">
            <div className="absolute -left-16 top-0 h-72 w-72 rounded-full bg-orange-200/20 blur-3xl" />

            <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-orange-300/10 blur-3xl" />
          </div>

          <div className="relative z-10 px-4 py-8 sm:px-6 lg:px-8 lg:py-10 relative">
            <div className="flex  flex-col gap-8 lg:flex-row lg:items-end lg:justify-between z-10">
              <img
                src={
                  restaurant?.coverImage?.url ||
                  restaurant?.logo?.url ||
                  user?.avatar?.url ||
                  `https://placehold.co/600x400/orange/white?text=${restaurant?.name?.charAt(0) || "U"}`
                }
                alt={restaurant?.name || user?.name || "Restaurant"}
                className="h-full w-full object-cover absolute inset-0 -z-10 opacity-60"
              />
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                {/* IMAGE */}
                <div className="relative w-fit">
                  <div className="h-32 w-32 overflow-hidden rounded-[2rem] border-4 border-white bg-linear-to-br from-orange-500 to-[#ff8c42] shadow-2xl shadow-orange-200">
                    <img
                      src={
                        restaurant?.image?.url ||
                        restaurant?.logo?.url ||
                        user?.avatar?.url ||
                        `https://placehold.co/600x400/orange/white?text=${restaurant?.name?.charAt(0) || "U"}`
                      }
                      alt={restaurant?.name || user?.name || "Restaurant"}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <button className="absolute -bottom-2 -right-2 flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-orange-500 shadow-xl transition hover:scale-105">
                    <Camera size={18} />
                  </button>
                </div>

                {/* INFO */}
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                    <CheckCircle2 size={16} />
                    Verified Restaurant Partner
                  </div>

                  <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-900">
                    {restaurant?.name || user?.name || "Your Restaurant"}
                  </h1>

                  <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
                    {restaurant?.description ||
                      "Manage your restaurant profile, menu, and settings."}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 rounded-2xl border border-[#f1e5dd] bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm">
                      <Store size={16} className="text-orange-500" />
                      {restaurant?.cuisine?.slice(0, 2).join(" • ") ||
                        "Restaurant Partner"}
                    </div>

                    <div className="flex items-center gap-2 rounded-2xl border border-[#f1e5dd] bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm">
                      <Star
                        size={16}
                        fill="currentColor"
                        className="text-orange-500"
                      />
                      {restaurant?.rating?.toFixed(1) || "—"} Rating
                    </div>
                  </div>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setIsEditRestaurantModalOpen((p) => !p)}
                  className="inline-flex items-center gap-2 rounded-2xl border border-[#f1e5dd] bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-500"
                >
                  <Edit3 size={16} />
                  Edit Restaurant Details
                </button>

                <button className="inline-flex items-center gap-2 rounded-2xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-xl shadow-orange-200 transition hover:bg-orange-600">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* CONTENT */}
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

          {/* GRID */}
          <div className="grid gap-6 xl:grid-cols-[1fr_0.42fr]">
            {/* LEFT */}
            <div className="space-y-6">
              {/* PERSONAL INFO */}
              <div className="rounded-[2rem] border border-[#f1e5dd] bg-white shadow-sm">
                <div className="border-b border-[#f5ebe4] px-6 py-5 flex items-center gap-4">
                  <div className="flex flex-col items-center gap-2">
                    <div className="relative">
                      <div className="h-20 w-20 overflow-hidden rounded-full border-4 border-white bg-[#f3f2f1] shadow">
                        <img
                          src={
                            user?.avatar?.url ||
                            `https://placehold.co/600x400?text=${user?.name?.charAt(0) || "U"}`
                          }
                          alt={user?.name || "Owner"}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <label className="absolute -bottom-2 -right-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white text-orange-500 shadow transition hover:scale-105">
                        <input type="file" className="hidden" />
                        <Camera size={16} />
                      </label>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-lg font-black tracking-tight text-slate-900">
                      Personal Information
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Manage your account details and contact information.
                    </p>
                  </div>
                </div>

                <div className="grid gap-5 p-6 sm:grid-cols-2">
                  {/* FIELDS */}
                  <div className="sm:col-span-2 grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-500">
                        Full Name
                      </label>

                      <div className="flex items-center gap-3 rounded-2xl border border-[#f1e5dd] bg-[#faf7f4] px-4 py-3">
                        <User size={18} className="text-orange-500" />

                        <input
                          defaultValue={user?.name || ""}
                          disabled={!isEditing}
                          className="w-full bg-transparent text-sm font-medium outline-none disabled:cursor-default"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-500">
                        Email Address
                      </label>

                      <div className="flex items-center gap-3 rounded-2xl border border-[#f1e5dd] bg-[#faf7f4] px-4 py-3">
                        <Mail size={18} className="text-orange-500" />

                        <input
                          defaultValue={user?.email || ""}
                          disabled={!isEditing}
                          className="w-full bg-transparent text-sm font-medium outline-none disabled:cursor-default"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-500">
                        Phone Number
                      </label>

                      <div className="flex items-center gap-3 rounded-2xl border border-[#f1e5dd] bg-[#faf7f4] px-4 py-3">
                        <Phone size={18} className="text-orange-500" />

                        <input
                          defaultValue={user?.phone || ""}
                          disabled={!isEditing}
                          className="w-full bg-transparent text-sm font-medium outline-none disabled:cursor-default"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-500">
                        Restaurant Category
                      </label>

                      <div className="flex items-center gap-3 rounded-2xl border border-[#f1e5dd] bg-[#faf7f4] px-4 py-3">
                        <Store size={18} className="text-orange-500" />

                        <input
                          defaultValue={restaurant?.cuisine?.join(" • ") || ""}
                          disabled={!isEditing}
                          className="w-full bg-transparent text-sm font-medium outline-none disabled:cursor-default"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RESTAURANT DETAILS */}
              <div className="rounded-[2rem] border border-[#f1e5dd] bg-white shadow-sm">
                <div className="border-b border-[#f5ebe4] px-6 py-5">
                  <h2 className="text-lg font-black tracking-tight text-slate-900">
                    Restaurant Details
                  </h2>
                </div>

                <div className="space-y-5 p-6">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-500">
                      Restaurant Description
                    </label>

                    <textarea
                      rows={5}
                      disabled={!isEditing}
                      defaultValue={restaurant?.description || ""}
                      className="w-full rounded-3xl border border-[#f1e5dd] bg-[#faf7f4] px-5 py-4 text-sm leading-7 outline-none disabled:cursor-default"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-500">
                      Restaurant Address
                    </label>

                    <div className="flex items-start gap-3 rounded-3xl border border-[#f1e5dd] bg-[#faf7f4] px-5 py-4">
                      <MapPin
                        size={18}
                        className="mt-1 shrink-0 text-orange-500"
                      />

                      <textarea
                        rows={3}
                        disabled={!isEditing}
                        defaultValue={restaurant?.address || ""}
                        className="w-full resize-none bg-transparent text-sm leading-7 outline-none disabled:cursor-default"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* PAYMENT */}
              <div className="rounded-[2rem] border border-[#f1e5dd] bg-white shadow-sm">
                <div className="border-b border-[#f5ebe4] px-6 py-5">
                  <h2 className="text-lg font-black tracking-tight text-slate-900">
                    Payment Information
                  </h2>
                </div>

                <div className="grid gap-5 p-6 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-500">
                      UPI ID
                    </label>

                    <div className="flex items-center gap-3 rounded-2xl border border-[#f1e5dd] bg-[#faf7f4] px-4 py-3">
                      <Wallet size={18} className="text-orange-500" />

                      <input
                        defaultValue={restaurant?.paymentDetails?.upiId || ""}
                        disabled={!isEditing}
                        className="w-full bg-transparent text-sm font-medium outline-none disabled:cursor-default"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-500">
                      Bank Account
                    </label>

                    <div className="flex items-center gap-3 rounded-2xl border border-[#f1e5dd] bg-[#faf7f4] px-4 py-3">
                      <ShieldCheck size={18} className="text-orange-500" />

                      <input
                        defaultValue={
                          restaurant?.paymentDetails?.accountNumber
                            ? `XXXX XXXX ${String(restaurant.paymentDetails.accountNumber).slice(-4)}`
                            : ""
                        }
                        disabled={!isEditing}
                        className="w-full bg-transparent text-sm font-medium outline-none disabled:cursor-default"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="space-y-6">
              {/* DOCUMENTS */}
              <div className="rounded-[2rem] border border-[#f1e5dd] bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-black tracking-tight text-slate-900">
                      Documents
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Verification details
                    </p>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                    <FileText size={20} />
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between rounded-2xl border border-[#f5ebe4] bg-[#fffaf7] p-4">
                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          FSSAI License
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          Uploaded and verified
                        </p>
                      </div>

                      <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
                        {restaurant?.documents?.fssai ? "Verified" : "Missing"}
                      </div>
                    </div>

                    <div className="flex items-center justify-between rounded-2xl border border-[#f5ebe4] bg-[#fffaf7] p-4">
                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          GST Certificate
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          Uploaded and verified
                        </p>
                      </div>

                      <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
                        {restaurant?.documents?.gst ? "Verified" : "Missing"}
                      </div>
                    </div>

                    <div className="flex items-center justify-between rounded-2xl border border-[#f5ebe4] bg-[#fffaf7] p-4">
                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          PAN Verification
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          Uploaded and verified
                        </p>
                      </div>

                      <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
                        {restaurant?.documents?.pan ? "Verified" : "Missing"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* TIMINGS */}
              <div className="rounded-[2rem] border border-[#f1e5dd] bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-black tracking-tight text-slate-900">
                      Restaurant Timings
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Opening schedule
                    </p>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                    <Clock3 size={20} />
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  {timings.map((timing) => (
                    <div
                      key={timing.day}
                      className="flex items-center justify-between rounded-2xl border border-[#f5ebe4] bg-[#fffaf7] px-4 py-4"
                    >
                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          {timing.day}
                        </p>
                      </div>

                      <p className="text-sm font-semibold text-slate-600">
                        {timing.time}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* QUICK LINKS */}
              <div className="rounded-[2rem] bg-linear-to-r from-orange-500 to-[#ff8c42] p-[1px] shadow-xl shadow-orange-200">
                <div className="rounded-[calc(2rem-1px)] bg-white p-6">
                  <h2 className="text-lg font-black tracking-tight text-slate-900">
                    Quick Actions
                  </h2>

                  <div className="mt-5 space-y-3">
                    {[
                      "Manage Menu",
                      "View Orders",
                      "Restaurant Analytics",
                      "Support Center",
                    ].map((item) => (
                      <button
                        key={item}
                        className="flex w-full items-center justify-between rounded-2xl border border-[#f1e5dd] bg-white px-4 py-4 text-left text-sm font-semibold text-slate-700 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-500"
                      >
                        {item}

                        <ChevronRight size={16} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {isEditRestaurantModalOpen && (
        <EditRestaurantModal
          open={isEditRestaurantModalOpen}
          onClose={() => setIsEditRestaurantModalOpen(false)}
          restaurant={restaurant}
          onSave={editRestaurant}
        />
      )}
    </main>
  );
};

export default PartnerProfile;
