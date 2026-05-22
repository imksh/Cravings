import React, { useEffect, useState } from "react";
import {
  CalendarDays,
  Camera,
  Mail,
  Phone,
  User,
  X,
  MapPin,
} from "lucide-react";

const EditProfileModal = ({ open, onClose, user, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    avatar: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        gender: user?.gender || "",
        dob: user?.dob?.split("T")[0] || "",
        avatar: user?.avatar?.url || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave(formData);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="relative max-h-[95vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] border border-(--border) bg-white shadow-2xl">
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 z-20 rounded-full bg-[#fafafa] p-2 text-(--text-secondary) transition hover:bg-red-50 hover:text-red-500"
        >
          <X size={20} />
        </button>

        {/* HEADER */}
        <div className="relative overflow-hidden rounded-t-[2rem] bg-linear-to-r from-(--primary) to-[#ff8c42] px-6 py-10 text-white sm:px-8">
          <div className="absolute right-0 top-0 h-44 w-44 rounded-full bg-white/10 blur-3xl" />

          <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center">
            {/* AVATAR */}
            <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full border-4 border-white/30 bg-white/20">
              <img
                src={formData.avatar || "/images/avatarCombined.png"}
                alt="Profile"
                className="h-full w-full object-cover"
              />

              <button
                type="button"
                className="absolute bottom-1 right-1 rounded-full bg-white p-2 text-(--primary) shadow-lg"
              >
                <Camera size={16} />
              </button>
            </div>

            {/* TEXT */}
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-orange-100">
                Customer profile
              </p>

              <h2 className="mt-2 text-3xl font-extrabold tracking-tight">
                Edit your profile
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-7 text-white/80">
                Update your personal information and keep your account details
                accurate.
              </p>
            </div>
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-8 p-6 sm:p-8">
          {/* PERSONAL INFO */}
          <div>
            <div className="mb-5">
              <h3 className="text-xl font-bold text-(--text-primary)">
                Personal information
              </h3>

              <p className="mt-1 text-sm text-(--text-secondary)">
                Manage your account details and identity information.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {/* NAME */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-(--text-primary)">
                  Full name
                </label>

                <div className="flex items-center gap-3 rounded-2xl border border-(--border) bg-[#fafafa] px-4 py-3 focus-within:border-(--primary)">
                  <User size={18} className="text-(--text-secondary)" />

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter full name"
                    className="w-full bg-transparent outline-none"
                  />
                </div>
              </div>

              {/* PHONE */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-(--text-primary)">
                  Phone number
                </label>

                <div className="flex items-center gap-3 rounded-2xl border border-(--border) bg-[#fafafa] px-4 py-3 focus-within:border-(--primary)">
                  <Phone size={18} className="text-(--text-secondary)" />

                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    className="w-full bg-transparent outline-none"
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-(--text-primary)">
                  Email address
                </label>

                <div className="flex items-center gap-3 rounded-2xl border border-(--border) bg-[#fafafa] px-4 py-3 focus-within:border-(--primary)">
                  <Mail size={18} className="text-(--text-secondary)" />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    className="w-full bg-transparent outline-none"
                  />
                </div>
              </div>

              {/* GENDER */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-(--text-primary)">
                  Gender
                </label>

                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-(--border) bg-[#fafafa] px-4 py-3 outline-none focus:border-(--primary)"
                >
                  <option value="">Select gender</option>

                  <option value="male">Male</option>

                  <option value="female">Female</option>

                  <option value="other">Other</option>

                  <option value="prefer_not_to_say">Prefer not to say</option>
                </select>
              </div>

              {/* DOB */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-(--text-primary)">
                  Date of birth
                </label>

                <div className="flex items-center gap-3 rounded-2xl border border-(--border) bg-[#fafafa] px-4 py-3 focus-within:border-(--primary)">
                  <CalendarDays size={18} className="text-(--text-secondary)" />

                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full bg-transparent outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ADDRESS PREVIEW */}
          <div className="rounded-3xl border border-(--border) bg-[#fafafa] p-5">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-white p-3 text-(--primary)">
                <MapPin size={20} />
              </div>

              <div>
                <h3 className="font-bold text-(--text-primary)">
                  Delivery addresses
                </h3>

                <p className="mt-2 text-sm leading-7 text-(--text-secondary)">
                  Addresses are managed separately from your profile details.
                </p>
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex flex-col-reverse gap-3 border-t border-(--border) pt-6 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border border-(--border) px-5 py-3 font-semibold text-(--text-primary) transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-2xl bg-(--primary) px-6 py-3 font-semibold text-white transition hover:bg-[#e85a28]"
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
