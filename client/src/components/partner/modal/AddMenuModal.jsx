import React, { useState } from "react";
import {
  CircleDollarSign,
  Drumstick,
  ImagePlus,
  IndianRupee,
  Leaf,
  PackageCheck,
  Plus,
  Save,
  Sparkles,
  Tag,
  UtensilsCrossed,
  X,
} from "lucide-react";

const categories = [
  "Pizza",
  "Burger",
  "Biryani",
  "North Indian",
  "South Indian",
  "Chinese",
  "Italian",
  "Fast Food",
  "Street Food",
  "Healthy",
  "Salad",
  "Wraps",
  "Sandwich",
  "Rolls",
  "Pasta",
  "Noodles",
  "Rice",
  "Thali",
  "Starter",
  "Main Course",
  "Dessert",
  "Ice Cream",
  "Bakery",
  "Beverages",
  "Coffee",
  "Tea",
  "Juice",
  "Shake",
  "Combo",
  "Breakfast",
  "Snacks",
  "Seafood",
  "BBQ",
  "Tandoor",
  "Vegan",
];

const AddMenuModal = ({ open, onClose, onCreate, isLoading = false }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Pizza",
    price: "",
    mrp: "",
    preparationTime: "",
    isVeg: false,
    isAvailable: true,
    images: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const updated = [file, ...formData.images].slice(0, 5); 

    setFormData((prev) => ({
      ...prev,
      images: updated,
    }));
  };

  const handleMoreImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const limitedFiles = files.slice(0, 5 - formData.images.length); // Limit to 5 images total

    if (limitedFiles.length === 0) return;

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...limitedFiles],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onCreate(formData);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      {/* OVERLAY */}
      <button type="button" onClick={onClose} className="absolute inset-0" />

      {/* MODAL */}
      <div className="relative z-10 flex max-h-[95vh] w-full max-w-6xl flex-col overflow-hidden rounded-[2rem] border border-[#f1e5dd] bg-white shadow-2xl">
        {/* HEADER */}
        <div className="relative overflow-hidden bg-linear-to-r from-orange-500 to-[#ff8c42] px-6 py-8 text-white sm:px-8 flex items-center">
          <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-white/10 blur-3xl" />

          <button
            onClick={onClose}
            className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 backdrop-blur transition hover:bg-red-500"
          >
            <X size={20} />
          </button>

          <div className="relative z-10 flex items-center gap-5">
            <div className="flex h-18 w-18 items-center justify-center rounded-[1.5rem] bg-white/15 backdrop-blur">
              <UtensilsCrossed size={34} />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-100">
                Restaurant Menu
              </p>

              <h2 className="mt-2 text-3xl font-black tracking-tight">
                Add Menu Item
              </h2>

              {/* <p className="mt-3 max-w-xl text-sm leading-7 text-white/80">
                Add dishes, pricing, categories, availability, and images for
                your restaurant menu.
              </p> */}
            </div>
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="grid gap-8 p-6 lg:grid-cols-[0.9fr_1.1fr] lg:p-8">
            {/* LEFT */}
            <div className="space-y-6">
              {/* LIVE CARD */}
              <div className="overflow-hidden rounded-[2rem] border border-[#f1e5dd] bg-white shadow-sm">
                <div className="relative h-64 overflow-hidden bg-[#faf7f4]">
                  {formData.images[0] ? (
                    <img
                      src={URL.createObjectURL(formData.images[0])}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center gap-4 text-slate-400">
                      <ImagePlus size={40} />

                      <p className="text-sm font-medium">Food image preview</p>
                    </div>
                  )}

                  <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-bold text-orange-600 shadow-lg backdrop-blur">
                    <Sparkles size={14} />
                    Live Preview
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-black tracking-tight text-slate-900">
                        {formData.name || "Menu Item"}
                      </h2>

                      <p className="mt-3 text-sm leading-7 text-slate-500">
                        {formData.description ||
                          "Dish description preview will appear here."}
                      </p>
                    </div>

                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-[1.2rem] ${
                        formData.isVeg
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-orange-50 text-orange-500"
                      }`}
                    >
                      {formData.isVeg ? (
                        <Leaf size={24} />
                      ) : (
                        <Drumstick size={24} />
                      )}
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <div className="rounded-full bg-orange-50 px-4 py-2 text-sm font-bold text-orange-600 line-through">
                      ₹{formData.mrp || "0"}
                    </div>

                    {formData.mrp && (
                      <div className="rounded-full bg-emerald-50 text-sm px-4 py-2 font-bold text-emerald-600 ">
                        ₹{formData.price || "0"}
                      </div>
                    )}

                    <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700">
                      {formData.category}
                    </div>
                  </div>
                </div>
              </div>

              {/* IMAGE */}
              <div className="rounded-[2rem] border border-[#f1e5dd] bg-white p-6 shadow-sm">
                <label className="mb-3 block text-lg font-black tracking-tight text-slate-900">
                  Upload Food Image
                </label>

                <label className="flex cursor-pointer flex-col items-center justify-center rounded-[1.5rem] border-2 border-dashed border-orange-200 bg-orange-50/50 px-6 py-10 transition hover:border-orange-400 hover:bg-orange-50">
                  <div className="flex h-18 w-18 items-center justify-center rounded-[1.5rem] bg-white text-orange-500 shadow-sm">
                    <ImagePlus size={30} />
                  </div>

                  <p className="mt-5 text-sm font-bold text-slate-700">
                    Click to upload image
                  </p>

                  <p className="mt-2 text-xs text-slate-500">PNG, JPG, WEBP</p>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* RIGHT */}
            <div className="space-y-6">
              {/* NAME */}
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Dish Name
                </label>

                <div className="flex items-center gap-3 rounded-2xl border border-[#f1e5dd] bg-[#faf7f4] px-4 py-4">
                  <UtensilsCrossed size={18} className="text-orange-500" />

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Chicken Biryani"
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
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Write short dish description..."
                  className="w-full rounded-2xl border border-[#f1e5dd] bg-[#faf7f4] p-4 outline-none"
                />
              </div>

              {/* CATEGORY + PREP TIME */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Category
                  </label>

                  <div className="relative">
                    <Tag
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500"
                    />

                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-[#f1e5dd] bg-[#faf7f4] py-4 pl-12 pr-4 outline-none"
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Preparation Time (mins)
                  </label>

                  <div className="flex items-center gap-3 rounded-2xl border border-[#f1e5dd] bg-[#faf7f4] px-4 py-4">
                    <PackageCheck size={18} className="text-orange-500" />

                    <input
                      type="text"
                      name="preparationTime"
                      value={formData.preparationTime}
                      onChange={handleChange}
                      placeholder="20-30 mins"
                      className="w-full bg-transparent outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* PRICES */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    MRP
                  </label>

                  <div className="flex items-center gap-3 rounded-2xl border border-[#f1e5dd] bg-[#faf7f4] px-4 py-4">
                    <IndianRupee size={18} className="text-orange-500" />

                    <input
                      type="number"
                      name="mrp"
                      value={formData.mrp}
                      onChange={handleChange}
                      placeholder="299"
                      className="w-full bg-transparent outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Price
                  </label>

                  <div className="flex items-center gap-3 rounded-2xl border border-[#f1e5dd] bg-[#faf7f4] px-4 py-4">
                    <CircleDollarSign size={18} className="text-orange-500" />

                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="249"
                      className="w-full bg-transparent outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* TOGGLES */}
              <div className="grid gap-5 sm:grid-cols-2">
                {/* VEG */}
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      isVeg: !prev.isVeg,
                    }))
                  }
                  className={`flex items-center justify-between rounded-[1.5rem] border p-5 transition ${
                    formData.isVeg
                      ? "border-emerald-200 bg-emerald-50"
                      : "border-orange-100 bg-orange-50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-[1.2rem] ${
                        formData.isVeg
                          ? "bg-emerald-100 text-emerald-600"
                          : "bg-orange-100 text-orange-500"
                      }`}
                    >
                      {formData.isVeg ? (
                        <Leaf size={24} />
                      ) : (
                        <Drumstick size={24} />
                      )}
                    </div>

                    <div className="text-left">
                      <p className="font-bold text-slate-900">
                        {formData.isVeg ? "Veg Item" : "Non Veg"}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Toggle food type
                      </p>
                    </div>
                  </div>

                  <div
                    className={`h-6 w-11 rounded-full transition ${
                      formData.isVeg ? "bg-emerald-500" : "bg-orange-400"
                    }`}
                  >
                    <div
                      className={`mt-0.5 h-5 w-5 rounded-full bg-white transition ${
                        formData.isVeg ? "ml-5" : "ml-0.5"
                      }`}
                    />
                  </div>
                </button>

                {/* AVAILABLE */}
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      isAvailable: !prev.isAvailable,
                    }))
                  }
                  className={`flex items-center justify-between rounded-[1.5rem] border p-5 transition ${
                    formData.isAvailable
                      ? "border-emerald-200 bg-emerald-50"
                      : "border-red-100 bg-red-50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-[1.2rem] ${
                        formData.isAvailable
                          ? "bg-emerald-100 text-emerald-600"
                          : "bg-red-100 text-red-500"
                      }`}
                    >
                      <PackageCheck size={24} />
                    </div>

                    <div className="text-left">
                      <p className="font-bold text-slate-900">
                        {formData.isAvailable ? "Available" : "Unavailable"}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Menu visibility
                      </p>
                    </div>
                  </div>

                  <div
                    className={`h-6 w-11 rounded-full transition ${
                      formData.isAvailable ? "bg-emerald-500" : "bg-red-400"
                    }`}
                  >
                    <div
                      className={`mt-0.5 h-5 w-5 rounded-full bg-white transition ${
                        formData.isAvailable ? "ml-5" : "ml-0.5"
                      }`}
                    />
                  </div>
                </button>
              </div>

              {formData.images.length > 1 ? (
                <div className="space-y-3">
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    More Images
                  </label>

                  <div className="flex flex-wrap gap-3">
                    {formData.images.slice(1).map((file, index) => (
                      <div key={index} className="relative">
                        <img
                          key={index}
                          src={URL.createObjectURL(file)}
                          alt={`More Preview ${index + 1}`}
                          className="h-24 w-24 rounded-lg object-cover"
                        />
                        <div>
                          <button
                            type="button"
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                images: prev.images.filter(
                                  (_, i) => i !== index + 1,
                                ),
                              }))
                            }
                            className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      </div>
                    ))}
                    {formData.images.length < 5 && (
                      <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-orange-200 bg-orange-50/50 px-4 py-4 transition hover:border-orange-400 hover:bg-orange-50">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-orange-500 shadow-sm">
                          <ImagePlus size={20} />
                        </div>

                        <p className="mt-2 text-xs font-bold text-slate-700">
                          Add More
                        </p>

                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleMoreImagesChange}
                          className="hidden"
                          multiple
                        />
                      </label>
                    )}
                  </div>
                </div>
              ) : (
                <div className="rounded-[2rem] border border-[#f1e5dd] bg-white p-6 shadow-sm">
                  <label className="mb-3 block text-lg font-black tracking-tight text-slate-900">
                    Upload More Images
                  </label>

                  <label className="flex cursor-pointer flex-col items-center justify-center rounded-[1.5rem] border-2 border-dashed border-orange-200 bg-orange-50/50 px-6 py-10 transition hover:border-orange-400 hover:bg-orange-50">
                    <div className="flex h-18 w-18 items-center justify-center rounded-[1.5rem] bg-white text-orange-500 shadow-sm">
                      <ImagePlus size={30} />
                    </div>

                    <p className="mt-5 text-sm font-bold text-slate-700">
                      Click to upload image
                    </p>

                    <p className="mt-2 text-xs text-slate-500">
                      PNG, JPG, WEBP
                    </p>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleMoreImagesChange}
                      className="hidden"
                      multiple
                    />
                  </label>
                </div>
              )}
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
              {isLoading ? (
                "Creating..."
              ) : (
                <>
                  <Plus size={18} />
                  Add Menu Item
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMenuModal;
