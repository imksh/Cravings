import React, { useEffect, useState } from "react";
import {
  Camera,
  ImagePlus,
  LoaderCircle,
  MapPin,
  Phone,
  Save,
  Store,
  UtensilsCrossed,
  X,
  AlertCircle,
  CheckCircle2,
  Crosshair,
} from "lucide-react";
import LocationSelector from "../../LocationSelector";
import useUiStore from "../../../store/useUiStore";

const cuisineOptions = [
  "North Indian",
  "South Indian",
  "Chinese",
  "Italian",
  "Fast Food",
  "Dessert",
  "Cafe",
  "Biryani",
  "Street Food",
  "Healthy",
];

const EditRestaurantModal = ({
  open,
  onClose,
  onSave,
  restaurant,
  isLoading = false,
}) => {
  const { location, setLocation, fetchCurrentLocation, isFetchingLocation } =
    useUiStore();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    phone: "",
    address: "",
    city: "",
    pin: "",
    cuisine: [],
    image: null,
    coverImage: null,
    lat: null,
    lon: null,
    isOpen: true,
  });

  const [preview, setPreview] = useState({
    image: "",
    coverImage: "",
  });

  const [geoError, setGeoError] = useState("");

  useEffect(() => {
    if (restaurant && open) {
      setFormData({
        name: restaurant.name || "",
        description: restaurant.description || "",
        address: restaurant.address || "",
        city: restaurant.city || "",
        pin: restaurant.pin || "",
        cuisine: restaurant.cuisine || [],
        image: null,
        coverImage: null,
        lat: restaurant.geoLocation?.lat || null,
        lon: restaurant.geoLocation?.lon || null,
        isOpen: restaurant.isOpen !== undefined ? restaurant.isOpen : true,
      });

      setPreview({
        image: restaurant.image?.url || "",
        coverImage: restaurant.coverImage?.url || "",
      });

      if (restaurant.geoLocation?.lat && restaurant.geoLocation?.lon) {
        setLocation({
          lat: restaurant.geoLocation.lat,
          lon: restaurant.geoLocation.lon,
        });
      }
    }
  }, [restaurant, open, setLocation]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Sync location from store to formData and fetch address details
  useEffect(() => {
    if (location.lat && location.lon) {
      console.log(location);

      setFormData((prev) => ({
        ...prev,
        lat: location.lat,
        lon: location.lon,
        address: location.name || prev.address,
        city: location.address?.city || prev.city,
        pin: location.address?.postcode || prev.pin,
      }));
      setGeoError("");
    }
  }, [location.lat, location.lon, location.name, location.address]);

  const handleCuisineToggle = (cuisine) => {
    setFormData((prev) => ({
      ...prev,
      cuisine: prev.cuisine.includes(cuisine)
        ? prev.cuisine.filter((c) => c !== cuisine)
        : [...prev.cuisine, cuisine],
    }));
  };

  const handleImageChange = (e, field) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      [field]: file,
    }));

    setPreview((prev) => ({
      ...prev,
      [field]: URL.createObjectURL(file),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = new FormData();

    payload.append("name", formData.name);

    payload.append("description", formData.description);

    payload.append("address", formData.address);

    payload.append("city", formData.city);

    payload.append("pin", formData.pin);

    formData.cuisine.forEach((cuisine) => {
      payload.append("cuisine", cuisine);
    });

    if (formData.lat) {
      payload.append("lat", formData.lat);
    }

    if (formData.lon) {
      payload.append("lon", formData.lon);
    }

    payload.append("isOpen", formData.isOpen);

    if (formData.image) {
      payload.append("image", formData.image);
    }

    if (formData.coverImage) {
      payload.append("coverImage", formData.coverImage);
    }

    onSave(payload);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-md">
      {/* OVERLAY */}
      <button type="button" onClick={onClose} className="absolute inset-0" />

      {/* MODAL */}
      <div className="relative z-10 flex max-h-[95vh] w-full max-w-6xl flex-col overflow-hidden rounded-[2rem] border border-[#f1e5dd] bg-white shadow-[0_40px_120px_rgba(15,23,42,0.25)]">
        {/* HEADER */}
        <div className="relative overflow-hidden bg-linear-to-r from-(--primary) to-[#ff8c42] px-6 py-8 text-white sm:px-8 flex">
          <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-white/10 blur-3xl" />

          <button
            onClick={onClose}
            className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 backdrop-blur transition hover:bg-red-500"
          >
            <X size={20} />
          </button>

          <div className="relative z-10 flex items-center gap-5">
            <div className="flex h-18 w-18 items-center justify-center rounded-[1.5rem] bg-white/15 backdrop-blur">
              <Store size={34} />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-100">
                Restaurant Settings
              </p>

              <h2 className="mt-2 text-3xl font-black tracking-tight">
                Edit Restaurant
              </h2>
            </div>
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="grid gap-8 p-6 lg:grid-cols-[0.9fr_1.1fr] lg:p-8">
            {/* LEFT */}
            <div className="space-y-6">
              {/* COVER */}
              <div className="overflow-hidden rounded-[2rem] border border-[#f1e5dd] bg-white shadow-sm">
                <div className="relative h-64 overflow-hidden bg-[#faf7f4]">
                  {preview.coverImage ? (
                    <img
                      src={preview.coverImage}
                      alt="Cover"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center gap-4 text-slate-400">
                      <ImagePlus size={40} />

                      <p className="text-sm font-medium">Cover image</p>
                    </div>
                  )}

                  <label className="absolute bottom-5 right-5 flex cursor-pointer items-center gap-2 rounded-2xl bg-white/90 px-4 py-3 text-sm font-semibold text-slate-800 shadow-xl backdrop-blur transition hover:scale-105 z-20">
                    <Camera size={18} />
                    Change Cover
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageChange(e, "coverImage")}
                    />
                  </label>
                </div>

                {/* image */}
                <div className="relative px-6 pb-6">
                  <div className="-mt-16 flex items-end gap-5">
                    <div className="relative">
                      <div className="h-32 w-32 overflow-hidden rounded-[2rem] border-4 border-white bg-[#faf7f4] shadow-2xl">
                        {preview.image ? (
                          <img
                            src={preview.image}
                            alt="image"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-slate-400">
                            <Store size={36} />
                          </div>
                        )}
                      </div>

                      <label className="absolute -bottom-2 -right-2 flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl bg-(--primary) text-white shadow-xl transition hover:scale-105">
                        <Camera size={18} />

                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageChange(e, "image")}
                        />
                      </label>
                    </div>

                    <div className="pb-3">
                      <h3 className="text-2xl font-black tracking-tight text-slate-900">
                        {formData.name || "Restaurant"}
                      </h3>

                      <p className="mt-2 text-sm text-slate-500">
                        Restaurant branding & identity
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="space-y-6">
              {/* NAME */}
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Restaurant Name
                </label>

                <div className="flex items-center gap-3 rounded-2xl border border-[#f1e5dd] bg-[#faf7f4] px-4 py-4">
                  <Store size={18} className="text-(--primary)" />

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Spice Route Kitchen"
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
                  placeholder="Write restaurant description..."
                  className="w-full rounded-2xl border border-[#f1e5dd] bg-[#faf7f4] p-4 outline-none"
                />
              </div>

              {/* ADDRESS */}
              <div className="grid gap-5 sm:grid-cols-3">
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Address
                  </label>

                  <div className="flex items-center gap-3 rounded-2xl border border-[#f1e5dd] bg-[#faf7f4] px-4 py-4">
                    <MapPin size={18} className="text-(--primary)" />

                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="MP Nagar Zone 1"
                      className="w-full bg-transparent outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    PIN
                  </label>

                  <input
                    type="text"
                    name="pin"
                    value={formData.pin}
                    onChange={handleChange}
                    placeholder="462001"
                    className="w-full rounded-2xl border border-[#f1e5dd] bg-[#faf7f4] px-4 py-4 outline-none"
                  />
                </div>
              </div>

              {/* CITY */}
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  City
                </label>

                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Bhopal"
                  className="w-full rounded-2xl border border-[#f1e5dd] bg-[#faf7f4] px-4 py-4 outline-none"
                />
              </div>

              {/* CUISINES */}
              <div>
                <label className="mb-4 block text-sm font-bold text-slate-700">
                  Cuisine Types
                </label>

                <div className="flex flex-wrap gap-3">
                  {cuisineOptions.map((cuisine) => {
                    const active = formData.cuisine.includes(cuisine);

                    return (
                      <button
                        type="button"
                        key={cuisine}
                        onClick={() => handleCuisineToggle(cuisine)}
                        className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                          active
                            ? "bg-(--primary) text-white shadow-lg shadow-orange-200"
                            : "border border-[#f1e5dd] bg-white text-slate-700 hover:border-orange-200 hover:bg-orange-50"
                        }`}
                      >
                        {cuisine}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* GEOLOCATION */}
              <div className="space-y-4">
                <div>
                  <label className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-700 ">
                      <MapPin size={16} className="text-orange-600" />
                      Restaurant Location (Click on map to select)
                    </div>
                    <button
                      onClick={fetchCurrentLocation}
                      type="button"
                      className="inline-flex items-center gap-2 rounded-2xl border border-(--border) bg-[#fafafa] px-4 py-2 text-sm font-semibold text-(--text-primary) transition hover:border-(--primary) hover:text-(--primary)"
                    >
                      <Crosshair size={16} />
                      {isFetchingLocation
                        ? "Detecting..."
                        : "Detect automatically"}
                    </button>
                  </label>
                  <LocationSelector />
                </div>

                <div className="rounded-[2rem] border-2 border-orange-200 bg-orange-50/50 p-5">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-xs font-semibold text-slate-600">
                        Latitude
                      </label>
                      <input
                        type="number"
                        name="lat"
                        value={formData.lat || ""}
                        onChange={handleChange}
                        placeholder="e.g., 23.1815"
                        step="0.0001"
                        className="w-full rounded-xl border border-orange-200 bg-white px-3 py-2 text-sm outline-none focus:border-orange-500"
                        readOnly
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-semibold text-slate-600">
                        Longitude
                      </label>
                      <input
                        type="number"
                        name="lon"
                        value={formData.lon || ""}
                        onChange={handleChange}
                        placeholder="e.g., 79.9864"
                        step="0.0001"
                        className="w-full rounded-xl border border-orange-200 bg-white px-3 py-2 text-sm outline-none focus:border-orange-500"
                        readOnly
                      />
                    </div>
                  </div>

                  {geoError && (
                    <div className="mt-3 flex items-start gap-2 rounded-xl bg-red-50 p-3">
                      <AlertCircle
                        size={14}
                        className="mt-0.5 text-red-500 flex-shrink-0"
                      />
                      <p className="text-xs text-red-600">{geoError}</p>
                    </div>
                  )}

                  {formData.lat && formData.lon && (
                    <div className="mt-3 flex items-center gap-2 rounded-xl bg-emerald-50 p-3">
                      <CheckCircle2 size={14} className="text-emerald-600" />
                      <p className="text-xs text-emerald-700">
                        Location set: {parseFloat(formData.lat).toFixed(4)},{" "}
                        {parseFloat(formData.lon).toFixed(4)}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* RESTAURANT STATUS */}
              <div className="rounded-[2rem] border border-[#f1e5dd] bg-white p-5">
                <div className="space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="isOpen"
                      checked={formData.isOpen}
                      onChange={handleChange}
                      className="h-5 w-5 rounded border-[#f1e5dd] accent-orange-500"
                    />
                    <span className="text-sm font-bold text-slate-700">
                      Restaurant is Open
                    </span>
                  </label>

                  <div
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl ${formData.isOpen ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"}`}
                  >
                    {formData.isOpen ? (
                      <CheckCircle2 size={14} />
                    ) : (
                      <AlertCircle size={14} />
                    )}
                    <p className="text-xs font-semibold">
                      {formData.isOpen ? "Currently Open" : "Currently Closed"}
                    </p>
                  </div>
                </div>
              </div>

              {/* INFO */}
              <div className="rounded-[1.8rem] border border-orange-100 bg-orange-50 p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-[1.2rem] bg-white text-(--primary) shadow-sm">
                    <UtensilsCrossed size={24} />
                  </div>

                  <div>
                    <h3 className="text-lg font-black tracking-tight text-slate-900">
                      Restaurant Profile
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-slate-500">
                      Keep your profile updated with accurate location, hours,
                      and cuisine types for better visibility and delivery
                      accuracy. Use the map above to precisely select your
                      restaurant location.
                    </p>

                    {formData.lat && formData.lon && (
                      <div className="mt-4 flex items-center gap-2 rounded-lg bg-white px-3 py-2">
                        <CheckCircle2 size={14} className="text-emerald-600" />
                        <span className="text-xs font-semibold text-emerald-700">
                          Location configured:{" "}
                          {parseFloat(formData.lat).toFixed(4)},{" "}
                          {parseFloat(formData.lon).toFixed(4)}
                        </span>
                      </div>
                    )}
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
              disabled={isLoading}
              className="rounded-2xl border border-[#f1e5dd] bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-(--primary) px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-orange-200 transition hover:bg-[#e85a28] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <LoaderCircle size={18} className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRestaurantModal;
