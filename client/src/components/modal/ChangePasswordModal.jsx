import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  KeyRound,
  LockKeyhole,
  ShieldCheck,
  X,
} from "lucide-react";

const ChangePasswordModal = ({ open, onClose, onSave, isLoading = false }) => {
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const togglePassword = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      return alert("Passwords do not match");
    }

    onSave(formData);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-[2rem] border border-(--border) bg-white shadow-2xl">
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 z-20 rounded-full bg-white/90 p-2 text-(--text-secondary) transition hover:bg-red-50 hover:text-red-500"
        >
          <X size={20} />
        </button>

        {/* HEADER */}
        <div className="relative overflow-hidden bg-linear-to-r from-(--primary) to-[#ff8c42] px-6 py-10 text-white sm:px-8">
          <div className="absolute right-0 top-0 h-44 w-44 rounded-full bg-white/10 blur-3xl" />

          <div className="relative z-10 flex items-center gap-5">
            <div className="flex h-18 w-18 items-center justify-center rounded-3xl bg-white/15 backdrop-blur">
              <ShieldCheck size={34} />
            </div>

            <div>
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-orange-100">
                Security settings
              </p>

              <h2 className="mt-2 text-3xl font-extrabold tracking-tight">
                Change password
              </h2>

              <p className="mt-3 max-w-lg text-sm leading-7 text-white/80">
                Update your password to keep your account secure and protected.
              </p>
            </div>
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6 p-6 sm:p-8">
          {/* CURRENT PASSWORD */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-(--text-primary)">
              Current password
            </label>

            <div className="flex items-center gap-3 rounded-2xl border border-(--border) bg-[#fafafa] px-4 py-3 focus-within:border-(--primary)">
              <LockKeyhole size={18} className="text-(--text-secondary)" />

              <input
                type={showPassword.current ? "text" : "password"}
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                placeholder="Enter current password"
                className="w-full bg-transparent outline-none"
              />

              <button
                type="button"
                onClick={() => togglePassword("current")}
                className="text-(--text-secondary)"
              >
                {showPassword.current ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          {/* NEW PASSWORD */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-(--text-primary)">
              New password
            </label>

            <div className="flex items-center gap-3 rounded-2xl border border-(--border) bg-[#fafafa] px-4 py-3 focus-within:border-(--primary)">
              <KeyRound size={18} className="text-(--text-secondary)" />

              <input
                type={showPassword.new ? "text" : "password"}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Enter new password"
                className="w-full bg-transparent outline-none"
              />

              <button
                type="button"
                onClick={() => togglePassword("new")}
                className="text-(--text-secondary)"
              >
                {showPassword.new ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <p className="mt-2 text-xs text-(--text-secondary)">
              Use at least 8 characters with a mix of letters and numbers.
            </p>
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-(--text-primary)">
              Confirm new password
            </label>

            <div className="flex items-center gap-3 rounded-2xl border border-(--border) bg-[#fafafa] px-4 py-3 focus-within:border-(--primary)">
              <ShieldCheck size={18} className="text-(--text-secondary)" />

              <input
                type={showPassword.confirm ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
                className="w-full bg-transparent outline-none"
              />

              <button
                type="button"
                onClick={() => togglePassword("confirm")}
                className="text-(--text-secondary)"
              >
                {showPassword.confirm ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          {/* SECURITY NOTE */}
          <div className="rounded-3xl border border-orange-100 bg-orange-50 p-5">
            <p className="text-sm leading-7 text-(--text-secondary)">
              After changing your password, you may need to log in again on
              other devices.
            </p>
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
              disabled={isLoading}
              className="rounded-2xl bg-(--primary) px-6 py-3 font-semibold text-white transition hover:bg-[#e85a28] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? "Updating..." : "Update password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
