import React, { useEffect, useState } from "react";
import {
  BadgePercent,
  CalendarDays,
  Gift,
  IndianRupee,
  Percent,
  Save,
  Sparkles,
  TicketPercent,
  Users,
  X,
} from "lucide-react";

const offerTypes = [
  "Flat Discount",
  "Percentage",
  "Free Delivery",
  "Free Item",
];

const EditOfferModal = ({
  open,
  onClose,
  offer,
  onSave,
  isLoading = false,
}) => {
  const [formData, setFormData] =
    useState({
      title: "",
      code: "",
      type: "Flat Discount",
      discount: "",
      minOrder: "",
      maxDiscount: "",
      usageLimit: "",
      expiryDate: "",
      active: true,
      description: "",
    });

  useEffect(() => {
    if (offer) {
      setFormData({
        title: offer.title || "",
        code: offer.code || "",
        type:
          offer.type || "Flat Discount",
        discount:
          offer.discount || "",
        minOrder:
          offer.minOrder || "",
        maxDiscount:
          offer.maxDiscount || "",
        usageLimit:
          offer.usageLimit || "",
        expiryDate:
          offer.expiryDate || "",
        active:
          offer.active ?? true,
        description:
          offer.description || "",
      });
    }
  }, [offer]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave(formData);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      {/* OVERLAY */}
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0"
      />

      {/* MODAL */}
      <div className="relative z-10 flex max-h-[95vh] w-full max-w-5xl flex-col overflow-hidden rounded-[2rem] border border-[#f1e5dd] bg-white shadow-2xl">
        {/* HEADER */}
        <div className="relative overflow-hidden bg-linear-to-r from-orange-500 to-[#ff8c42] px-6 py-8 text-white sm:px-8">
          <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-white/10 blur-3xl" />

          <button
            onClick={onClose}
            className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 backdrop-blur transition hover:bg-red-500"
          >
            <X size={20} />
          </button>

          <div className="relative z-10 flex items-center gap-5">
            <div className="flex h-18 w-18 items-center justify-center rounded-[1.5rem] bg-white/15 backdrop-blur">
              <BadgePercent size={34} />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-100">
                Promotions Dashboard
              </p>

              <h2 className="mt-2 text-3xl font-black tracking-tight">
                Edit Offer
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-7 text-white/80">
                Update offer details,
                discount settings,
                validity, and customer
                targeting.
              </p>
            </div>
          </div>
        </div>

        {/* BODY */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto"
        >
          <div className="grid gap-8 p-6 lg:grid-cols-[0.9fr_1.1fr] lg:p-8">
            {/* LEFT */}
            <div className="space-y-6">
              {/* OFFER PREVIEW */}
              <div className="overflow-hidden rounded-[2rem] bg-linear-to-r from-orange-500 to-[#ff8c42] p-[1px] shadow-xl shadow-orange-200">
                <div className="rounded-[calc(2rem-1px)] bg-white p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-orange-600">
                        <Sparkles
                          size={14}
                        />
                        Offer Preview
                      </div>

                      <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-900">
                        {formData.title ||
                          "Special Offer"}
                      </h2>

                      <p className="mt-3 text-sm leading-7 text-slate-500">
                        {formData.description ||
                          "Offer description preview will appear here."}
                      </p>
                    </div>

                    <div className="flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-orange-50 text-orange-500">
                      <Gift size={28} />
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <div className="rounded-full bg-orange-50 px-4 py-2 text-sm font-bold text-orange-600">
                      {formData.discount ||
                        "0"}
                      {formData.type ===
                      "Percentage"
                        ? "%"
                        : " OFF"}
                    </div>

                    <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700">
                      {formData.code ||
                        "CODE"}
                    </div>

                    <div
                      className={`rounded-full px-4 py-2 text-sm font-bold ${
                        formData.active
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-red-50 text-red-500"
                      }`}
                    >
                      {formData.active
                        ? "Active"
                        : "Inactive"}
                    </div>
                  </div>
                </div>
              </div>

              {/* STATUS */}
              <div className="rounded-[2rem] border border-[#f1e5dd] bg-white p-6 shadow-sm">
                <h3 className="text-lg font-black tracking-tight text-slate-900">
                  Offer Status
                </h3>

                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      active:
                        !prev.active,
                    }))
                  }
                  className={`mt-6 flex w-full items-center justify-between rounded-2xl border px-5 py-4 transition ${
                    formData.active
                      ? "border-emerald-200 bg-emerald-50"
                      : "border-red-200 bg-red-50"
                  }`}
                >
                  <div>
                    <p className="font-bold text-slate-900">
                      {formData.active
                        ? "Offer Active"
                        : "Offer Disabled"}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Toggle offer
                      visibility
                    </p>
                  </div>

                  <div
                    className={`h-6 w-11 rounded-full transition ${
                      formData.active
                        ? "bg-emerald-500"
                        : "bg-red-400"
                    }`}
                  >
                    <div
                      className={`mt-0.5 h-5 w-5 rounded-full bg-white transition ${
                        formData.active
                          ? "ml-5"
                          : "ml-0.5"
                      }`}
                    />
                  </div>
                </button>
              </div>
            </div>

            {/* RIGHT */}
            <div className="space-y-6">
              {/* TITLE */}
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Offer Title
                </label>

                <div className="flex items-center gap-3 rounded-2xl border border-[#f1e5dd] bg-[#faf7f4] px-4 py-4">
                  <Gift
                    size={18}
                    className="text-orange-500"
                  />

                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter offer title"
                    className="w-full bg-transparent outline-none"
                  />
                </div>
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Description
                </label>

                <textarea
                  rows={4}
                  name="description"
                  value={
                    formData.description
                  }
                  onChange={handleChange}
                  placeholder="Offer details..."
                  className="w-full rounded-2xl border border-[#f1e5dd] bg-[#faf7f4] p-4 outline-none"
                />
              </div>

              {/* CODE + TYPE */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Coupon Code
                  </label>

                  <div className="flex items-center gap-3 rounded-2xl border border-[#f1e5dd] bg-[#faf7f4] px-4 py-4">
                    <TicketPercent
                      size={18}
                      className="text-orange-500"
                    />

                    <input
                      type="text"
                      name="code"
                      value={formData.code}
                      onChange={handleChange}
                      placeholder="SAVE50"
                      className="w-full bg-transparent uppercase outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Offer Type
                  </label>

                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-[#f1e5dd] bg-[#faf7f4] px-4 py-4 outline-none"
                  >
                    {offerTypes.map(
                      (type) => (
                        <option
                          key={type}
                          value={type}
                        >
                          {type}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>

              {/* DISCOUNT */}
              <div className="grid gap-5 sm:grid-cols-3">
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Discount
                  </label>

                  <div className="flex items-center gap-3 rounded-2xl border border-[#f1e5dd] bg-[#faf7f4] px-4 py-4">
                    {formData.type ===
                    "Percentage" ? (
                      <Percent
                        size={18}
                        className="text-orange-500"
                      />
                    ) : (
                      <IndianRupee
                        size={18}
                        className="text-orange-500"
                      />
                    )}

                    <input
                      type="number"
                      name="discount"
                      value={
                        formData.discount
                      }
                      onChange={handleChange}
                      placeholder="50"
                      className="w-full bg-transparent outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Min Order
                  </label>

                  <div className="flex items-center gap-3 rounded-2xl border border-[#f1e5dd] bg-[#faf7f4] px-4 py-4">
                    <IndianRupee
                      size={18}
                      className="text-orange-500"
                    />

                    <input
                      type="number"
                      name="minOrder"
                      value={
                        formData.minOrder
                      }
                      onChange={handleChange}
                      placeholder="499"
                      className="w-full bg-transparent outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Max Discount
                  </label>

                  <div className="flex items-center gap-3 rounded-2xl border border-[#f1e5dd] bg-[#faf7f4] px-4 py-4">
                    <IndianRupee
                      size={18}
                      className="text-orange-500"
                    />

                    <input
                      type="number"
                      name="maxDiscount"
                      value={
                        formData.maxDiscount
                      }
                      onChange={handleChange}
                      placeholder="300"
                      className="w-full bg-transparent outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* USAGE + EXPIRY */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Usage Limit
                  </label>

                  <div className="flex items-center gap-3 rounded-2xl border border-[#f1e5dd] bg-[#faf7f4] px-4 py-4">
                    <Users
                      size={18}
                      className="text-orange-500"
                    />

                    <input
                      type="number"
                      name="usageLimit"
                      value={
                        formData.usageLimit
                      }
                      onChange={handleChange}
                      placeholder="1000"
                      className="w-full bg-transparent outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Expiry Date
                  </label>

                  <div className="flex items-center gap-3 rounded-2xl border border-[#f1e5dd] bg-[#faf7f4] px-4 py-4">
                    <CalendarDays
                      size={18}
                      className="text-orange-500"
                    />

                    <input
                      type="date"
                      name="expiryDate"
                      value={
                        formData.expiryDate
                      }
                      onChange={handleChange}
                      className="w-full bg-transparent outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="flex flex-col-reverse gap-3 border-t border-[#f1e5dd] bg-white px-6 py-5 sm:flex-row sm:justify-end lg:px-8">
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border border-[#f1e5dd] bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-orange-200 transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <Save size={18} />

              {isLoading
                ? "Saving..."
                : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditOfferModal;