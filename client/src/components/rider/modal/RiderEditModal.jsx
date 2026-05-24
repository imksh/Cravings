import React, { useEffect, useState } from "react";
import { X, Bike, FileText, MapPin, Camera } from "lucide-react";

const RiderEditModal = ({ open, onClose, user, onSave }) => {
  const [form, setForm] = useState({
    vehicleType: "",
    vehicleNumber: "",
    isAvailable: false,
  });

  useEffect(() => {
    if (user) {
      setForm({
        vehicleType: user?.rider?.vehicleType || "",
        vehicleNumber: user?.rider?.vehicleNumber || "",
        isAvailable: !!user?.rider?.isAvailable,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-gray-500"
        >
          <X size={18} />
        </button>

        <div className="mb-4">
          <h3 className="text-xl font-bold">Edit rider details</h3>
          <p className="mt-1 text-sm text-slate-500">
            Update vehicle and availability information.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600">
              Vehicle type
            </label>
            <select
              name="vehicleType"
              value={form.vehicleType}
              onChange={handleChange}
              className="w-full rounded-2xl border px-4 py-3"
            >
              <option value="">Select vehicle</option>
              <option value="bike">Bike</option>
              <option value="scooter">Scooter</option>
              <option value="car">Car</option>
              <option value="bicycle">Bicycle</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600">
              Vehicle number
            </label>
            <input
              name="vehicleNumber"
              value={form.vehicleNumber}
              onChange={handleChange}
              placeholder="e.g. UP16 AB 2481"
              className="w-full rounded-2xl border px-4 py-3"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="isAvailable"
              checked={form.isAvailable}
              onChange={handleChange}
              id="avail"
            />
            <label htmlFor="avail" className="text-sm text-slate-600">
              Available to accept orders
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border px-5 py-3"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-2xl bg-orange-500 px-5 py-3 text-white"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RiderEditModal;
