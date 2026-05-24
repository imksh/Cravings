import React, { useState } from "react";
import {
  Bike,
  ClipboardCheck,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
  UserCircle2,
  Camera,
} from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import api from "../../config/api";
import toast from "react-hot-toast";
import RiderEditModal from "../../components/rider/modal/RiderEditModal";

const RiderProfile = () => {
  const { user, setUser } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const res = await api.put("/user/update", form);
      toast.success("Profile updated");
      setUser(res.data.data);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePhoto = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fd = new FormData();
    fd.append("image", file);

    try {
      const res = await api.patch("/user/change-photo", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUser(res.data.data);
      toast.success("Profile photo updated");
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload photo");
    }
  };

  const [isRiderModalOpen, setIsRiderModalOpen] = useState(false);

  const handleRiderSave = async (riderData) => {
    try {
      const payload = { rider: riderData };
      const res = await api.put("/user/update", payload);
      setUser(res.data.data);
      toast.success("Rider details updated");
      setIsRiderModalOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update rider details");
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f4ef]">
      <header className="border-b border-[#eadfce] bg-white/90 backdrop-blur-xl">
        <div className="px-4 py-5 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-500">
            Rider Identity
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900">
            Profile
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Vehicle details, documents, and delivery readiness in one place.
          </p>
        </div>
      </header>

      <section className="space-y-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-4xl border border-[#eadfce] bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-orange-500 text-white shadow-lg shadow-orange-200 overflow-hidden">
                  <img
                    src={
                      user?.avatar?.url ||
                      `https://placehold.co/600x400?text=${(user?.name || "U").charAt(0)}`
                    }
                    alt={user?.name || "Rider"}
                    className="h-full w-full object-cover"
                  />
                </div>

                <label className="absolute -bottom-2 -right-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white text-orange-500 shadow transition hover:scale-105">
                  <input
                    type="file"
                    className="hidden"
                    onChange={handlePhoto}
                  />
                  <Camera size={16} />
                </label>
              </div>

              <div>
                <h2 className="text-xl font-black tracking-tight text-slate-900">
                  {user?.name || "Your name"}
                </h2>
                <p className="mt-1 text-sm text-slate-500">{user?.email}</p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-[#fcfaf7] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Vehicle
                </p>
                <p className="mt-2 text-sm font-bold text-slate-900">
                  {user?.rider?.vehicleType || "—"}
                </p>
              </div>

              <div className="rounded-2xl bg-[#fcfaf7] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Number
                </p>
                <p className="mt-2 text-sm font-bold text-slate-900">
                  {user?.rider?.vehicleNumber || "—"}
                </p>
              </div>

              <div className="rounded-2xl bg-[#fcfaf7] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Rating
                </p>
                <p className="mt-2 text-sm font-bold text-slate-900">
                  {user?.rider?.rating || "—"}
                </p>
              </div>

              <div className="rounded-2xl bg-[#fcfaf7] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Deliveries
                </p>
                <p className="mt-2 text-sm font-bold text-slate-900">
                  {user?.rider?.totalDeliveries || "—"}
                </p>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setIsRiderModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-2xl border border-[#f1e5dd] bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-orange-50"
              >
                Edit rider details
              </button>
            </div>

            <div className="mt-6 grid gap-5 p-6 sm:grid-cols-2">
              <div className="sm:col-span-2 grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-500">
                    Full Name
                  </label>

                  <div className="flex items-center gap-3 rounded-2xl border border-[#f1e5dd] bg-[#faf7f4] px-4 py-3">
                    <UserCircle2 size={18} className="text-orange-500" />

                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
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
                    <Phone size={18} className="text-orange-500" />

                    <input
                      name="email"
                      value={form.email}
                      onChange={handleChange}
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
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full bg-transparent text-sm font-medium outline-none disabled:cursor-default"
                    />
                  </div>
                </div>

                <div className="flex items-end justify-end gap-3">
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="inline-flex items-center gap-2 rounded-2xl border border-[#f1e5dd] bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-500"
                    >
                      Edit Profile
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={() => setIsEditing(false)}
                        disabled={isSaving}
                        className="inline-flex items-center gap-2 rounded-2xl border border-[#f1e5dd] bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-500"
                      >
                        Cancel
                      </button>

                      <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="inline-flex items-center gap-2 rounded-2xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-xl shadow-orange-200 transition hover:bg-orange-600"
                      >
                        Save Changes
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-4xl border border-[#eadfce] bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-slate-900">Documents</p>
                <ShieldCheck size={18} className="text-emerald-500" />
              </div>

              <div className="mt-5 space-y-4">
                <div className="flex items-center justify-between rounded-2xl bg-[#fcfaf7] p-4 text-sm">
                  <span className="text-slate-600">Driving license</span>
                  <strong className="text-emerald-600">
                    {user?.rider?.documents?.dl ? "Verified" : "Missing"}
                  </strong>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-[#fcfaf7] p-4 text-sm">
                  <span className="text-slate-600">Aadhaar</span>
                  <strong className="text-emerald-600">
                    {user?.rider?.documents?.aadhaar ? "Verified" : "Missing"}
                  </strong>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-[#fcfaf7] p-4 text-sm">
                  <span className="text-slate-600">RC</span>
                  <strong className="text-emerald-600">
                    {user?.rider?.documents?.rc ? "Verified" : "Missing"}
                  </strong>
                </div>
              </div>
            </div>

            <div className="rounded-4xl border border-[#eadfce] bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-slate-900">Availability</p>
                <Bike size={18} className="text-orange-500" />
              </div>

              <div className="mt-5 rounded-3xl bg-emerald-50 p-4 text-sm text-emerald-700">
                {user?.rider?.isAvailable
                  ? "Online and ready to accept new orders."
                  : "Offline"}
              </div>

              <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
                <MapPin size={16} className="text-orange-500" />
                Current zone:{" "}
                {user?.rider?.currentLocation ? "see on map" : "—"}
              </div>

              <button className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600">
                <Phone size={16} />
                Update contact
              </button>
            </div>

            <div className="rounded-4xl border border-[#eadfce] bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-slate-900">
                  Readiness checklist
                </p>
                <ClipboardCheck size={18} className="text-orange-500" />
              </div>

              <div className="mt-5 space-y-3 text-sm text-slate-600">
                <div className="rounded-2xl bg-[#fcfaf7] p-4">
                  Helmet and bag ready
                </div>
                <div className="rounded-2xl bg-[#fcfaf7] p-4">
                  Phone charged above 80%
                </div>
                <div className="rounded-2xl bg-[#fcfaf7] p-4">
                  Cash float checked
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-amber-600">
                <Star size={16} />
                Maintain at least 4.7 rating to unlock peak slots.
              </div>
            </div>
          </div>
        </div>
      </section>
      <RiderEditModal
        open={isRiderModalOpen}
        onClose={() => setIsRiderModalOpen(false)}
        user={user}
        onSave={handleRiderSave}
      />
    </div>
  );
};

export default RiderProfile;
