import React, { useEffect, useState } from "react";
import {
  X,
  Upload,
  IndianRupee,
  Save,
  ImagePlus,
  Leaf,
  Flame,
  Tag,
  AlignLeft,
  PackageCheck,
  Clock3,
  ChevronLeft,
  ChevronRight,
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

const EditMenuModal = ({ open, onClose, item, onSave, isLoading = false }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [images, setImages] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    mrp: "",
    preparationTime: "",
    isVeg: false,
    isAvailable: true,
    images: [],
  });

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name || "",
        description: item.description || "",
        category: item.category || "",
        price: item.price || "",
        mrp: item.mrp || "",
        preparationTime: item.preparationTime || "",
        isVeg: item.isVeg || false,
        isAvailable: item.isAvailable ?? true,
        images: [],
      });

      setImages(item.images && item.images.length > 0 ? item.images : []);
      setSelectedImageIndex(0);
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleToggle = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []).slice(0, 5);

    setImages(
      files.map((file) => ({
        file,
      })),
    );

    setFormData((prev) => ({
      ...prev,
      images: files,
    }));
  };

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    if (selectedImageIndex >= images.length - 1) {
      setSelectedImageIndex(Math.max(0, images.length - 2));
    }
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1,
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1,
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const currentImage = images[selectedImageIndex];
  const currentImageUrl =
    currentImage?.url ||
    (currentImage?.file ? URL.createObjectURL(currentImage.file) : "");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      {/* OVERLAY */}
      <button type="button" onClick={onClose} className="absolute inset-0" />

      {/* MODAL */}
      <div className="relative z-10 flex max-h-[95vh] w-full max-w-5xl flex-col overflow-hidden rounded-[2rem] border border-[#f1e5dd] bg-white shadow-2xl">
        {/* HEADER */}
        <div className="relative overflow-hidden bg-linear-to-r from-orange-500 to-[#ff8c42] px-6 py-8 text-white sm:px-8">
          <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-white/10 blur-3xl" />

          <button
            onClick={onClose}
            className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur transition hover:bg-red-500"
          >
            <X size={20} />
          </button>

          <div className="relative z-10">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-100">
              Menu Management
            </p>

            <h2 className="mt-2 text-3xl font-black tracking-tight">
              Edit Menu Item
            </h2>
          </div>
        </div>

        {/* BODY */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="grid gap-8 p-6 lg:grid-cols-[1.1fr_1fr] lg:p-8">
            {/* LEFT - IMAGES */}
            <div className="space-y-6">
              {/* IMAGES SECTION */}
              <div className="rounded-[2rem] border border-[#f1e5dd] bg-white shadow-sm overflow-hidden">
                {/* MAIN IMAGE */}
                <div className="relative h-80 bg-[#faf7f4] overflow-hidden">
                  {currentImageUrl ? (
                    <img
                      src={currentImageUrl}
                      alt="Menu Item"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center gap-4 text-slate-400">
                      <ImagePlus size={42} />
                      <p className="font-medium">No images added</p>
                    </div>
                  )}

                  {/* IMAGE COUNTER */}
                  {images.length > 0 && (
                    <div className="absolute right-5 top-5 rounded-full bg-black/50 px-3 py-1 text-xs font-bold text-white backdrop-blur-md">
                      {selectedImageIndex + 1}/{images.length}
                    </div>
                  )}

                  {/* IMAGE NAVIGATION */}
                  {images.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={handlePrevImage}
                        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-700 transition hover:bg-white"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        type="button"
                        onClick={handleNextImage}
                        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-700 transition hover:bg-white"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}
                </div>

                {/* UPLOAD INPUT */}
                <div className="p-5">
                  <label className="flex cursor-pointer items-center justify-center gap-3 rounded-2xl border border-dashed border-orange-200 bg-orange-50 px-5 py-4 text-sm font-semibold text-orange-600 transition hover:bg-orange-100">
                    <Upload size={18} />
                    Change Images
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      hidden
                      onChange={handleImageChange}
                    />
                  </label>
                </div>

                {/* THUMBNAILS */}
                {images.length > 1 && (
                  <div className="border-t border-[#f1e5dd] bg-white/50 p-4">
                    <div className="flex gap-3 overflow-x-auto pb-2">
                      {images.map((img, idx) => (
                        <div key={idx} className="relative flex-shrink-0">
                          <button
                            type="button"
                            onClick={() => setSelectedImageIndex(idx)}
                            className={`relative overflow-hidden rounded-lg border-2 transition ${
                              selectedImageIndex === idx
                                ? "border-orange-500 shadow-lg"
                                : "border-transparent hover:border-orange-200"
                            }`}
                          >
                            <img
                              src={img.url || URL.createObjectURL(img.file)}
                              alt={`Thumbnail ${idx + 1}`}
                              className="h-16 w-16 object-cover"
                            />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleRemoveImage(idx)}
                            className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white text-xs hover:bg-red-600"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* TOGGLES */}
              <div className="rounded-[2rem] border border-[#f1e5dd] bg-white p-6 shadow-sm">
                <h3 className="text-lg font-black tracking-tight text-slate-900">
                  Item Settings
                </h3>

                <div className="mt-6 space-y-5">
                  {/* VEG/NON-VEG */}
                  <button
                    type="button"
                    onClick={() => handleToggle("isVeg")}
                    className={`flex w-full items-center justify-between rounded-2xl border px-5 py-4 transition ${
                      formData.isVeg
                        ? "border-emerald-200 bg-emerald-50"
                        : "border-red-200 bg-red-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                          formData.isVeg
                            ? "bg-emerald-100 text-emerald-600"
                            : "bg-red-100 text-red-500"
                        }`}
                      >
                        {formData.isVeg ? (
                          <Leaf size={20} />
                        ) : (
                          <Flame size={20} />
                        )}
                      </div>

                      <div className="text-left">
                        <p className="font-bold text-slate-900">
                          {formData.isVeg ? "Vegetarian" : "Non Vegetarian"}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Toggle food type
                        </p>
                      </div>
                    </div>

                    <div
                      className={`h-6 w-11 rounded-full transition ${
                        formData.isVeg ? "bg-emerald-500" : "bg-red-400"
                      }`}
                    >
                      <div
                        className={`mt-0.5 h-5 w-5 rounded-full bg-white transition ${
                          formData.isVeg ? "ml-5" : "ml-0.5"
                        }`}
                      />
                    </div>
                  </button>

                  {/* AVAILABILITY */}
                  <button
                    type="button"
                    onClick={() => handleToggle("isAvailable")}
                    className={`flex w-full items-center justify-between rounded-2xl border px-5 py-4 transition ${
                      formData.isAvailable
                        ? "border-emerald-200 bg-emerald-50"
                        : "border-slate-200 bg-slate-100"
                    }`}
                  >
                    <div>
                      <p className="font-bold text-slate-900">
                        {formData.isAvailable ? "Available" : "Out of Stock"}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Toggle item availability
                      </p>
                    </div>

                    <div
                      className={`h-6 w-11 rounded-full transition ${
                        formData.isAvailable ? "bg-emerald-500" : "bg-slate-400"
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
              </div>
            </div>

            {/* RIGHT - FORM FIELDS */}
            <div className="space-y-6">
              {/* NAME */}
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Item Name
                </label>

                <div className="flex items-center gap-3 rounded-2xl border border-[#f1e5dd] bg-[#faf7f4] px-4 py-4 focus-within:border-orange-300">
                  <PackageCheck size={18} className="text-orange-500" />

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter menu item name"
                    className="w-full bg-transparent outline-none"
                  />
                </div>
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Description
                </label>

                <div className="rounded-2xl border border-[#f1e5dd] bg-[#faf7f4] p-4 focus-within:border-orange-300">
                  <div className="flex items-start gap-3">
                    <AlignLeft size={18} className="mt-1 text-orange-500" />

                    <textarea
                      rows={4}
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Describe this food item..."
                      className="w-full resize-none bg-transparent outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* CATEGORY */}
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Category
                </label>

                <div className="flex items-center gap-3 rounded-2xl border border-[#f1e5dd] bg-[#faf7f4] px-4 py-4">
                  <Tag size={18} className="text-orange-500" />

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full bg-transparent outline-none"
                  >
                    <option value="">Select category</option>

                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* PREP TIME */}
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Preparation Time (mins)
                </label>

                <div className="flex items-center gap-3 rounded-2xl border border-[#f1e5dd] bg-[#faf7f4] px-4 py-4">
                  <Clock3 size={18} className="text-orange-500" />

                  <input
                    type="number"
                    name="preparationTime"
                    value={formData.preparationTime}
                    onChange={handleChange}
                    placeholder="e.g., 20"
                    className="w-full bg-transparent outline-none"
                  />
                </div>
              </div>

              {/* PRICING */}
              <div className="space-y-4 rounded-[2rem] border-2 border-orange-200 bg-orange-50/50 p-5">
                <p className="text-sm font-bold text-orange-600 uppercase tracking-[0.15em]">
                  Pricing
                </p>

                {/* MRP */}
                <div>
                  <label className="mb-2 block text-xs font-bold text-slate-700 uppercase tracking-[0.1em]">
                    MRP (Original Price)
                  </label>

                  <div className="flex items-center gap-3 rounded-xl border border-orange-200 bg-white px-4 py-3">
                    <IndianRupee size={16} className="text-orange-500" />

                    <input
                      type="number"
                      name="mrp"
                      value={formData.mrp}
                      onChange={handleChange}
                      placeholder="Enter MRP"
                      className="w-full bg-transparent outline-none"
                    />
                  </div>
                </div>

                {/* SELLING PRICE */}
                <div>
                  <label className="mb-2 block text-xs font-bold text-slate-700 uppercase tracking-[0.1em]">
                    Selling Price
                  </label>

                  <div className="flex items-center gap-3 rounded-xl border border-orange-200 bg-white px-4 py-3">
                    <IndianRupee size={16} className="text-orange-500" />

                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="Enter selling price"
                      className="w-full bg-transparent outline-none"
                    />
                  </div>
                </div>

                {/* DISCOUNT DISPLAY */}
                {formData.mrp &&
                  formData.price &&
                  formData.mrp > formData.price && (
                    <div className="flex items-center justify-between rounded-xl bg-emerald-50/60 px-4 py-3">
                      <p className="text-xs font-bold text-emerald-700 uppercase tracking-[0.1em]">
                        Discount
                      </p>
                      <p className="text-sm font-black text-emerald-600">
                        {Math.round(
                          ((formData.mrp - formData.price) / formData.mrp) *
                            100,
                        )}
                        %
                      </p>
                    </div>
                  )}
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

              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMenuModal;
