import React from "react";
import { Check, Crosshair, MapPin, Navigation, Search, X } from "lucide-react";
import LocationMap from "../LocationMap";
import useUiStore from "../../store/useUiStore";
import LocationSelector from "../LocationSelector";

const LocationPickerModal = ({
  open,
  onClose,
  onUseCurrentLocation,
}) => {
  const { location, fetchCurrentLocation, isFetchingLocation } = useUiStore();
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-100 overflow-y-auto bg-black/50 p-4 backdrop-blur-sm">
      <div className="flex min-h-full items-center justify-center">
        <div className="relative w-full max-w-3xl overflow-hidden rounded-[2rem] border border-(--border) bg-white shadow-2xl">
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
                <Navigation size={34} />
              </div>

              <div>
                <p className="text-sm font-medium uppercase tracking-[0.3em] text-orange-100">
                  Delivery location
                </p>

                <h2 className="mt-2 text-3xl font-extrabold tracking-tight">
                  Confirm your location
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-white/80">
                  Your delivery experience depends on accurate location data.
                  Select or confirm the address you want to use.
                </p>
              </div>
            </div>
          </div>

          {/* CONTENT */}
          <div className="space-y-6 p-6 sm:p-8">
            {/* SEARCH */}
            {/* <div>
              <label className="mb-2 block text-sm font-semibold text-(--text-primary)">
                Search location
              </label>

              <div className="flex items-center gap-3 rounded-2xl border border-(--border) bg-[#fafafa] px-4 py-4 focus-within:border-(--primary)">
                <Search size={18} className="text-(--text-secondary)" />

                <input
                  type="text"
                  placeholder="Search area, street, landmark..."
                  className="w-full bg-transparent outline-none placeholder:text-(--text-secondary)"
                />
              </div>
            </div> */}

            {/* CURRENT LOCATION */}
            <div className="rounded-4xl border border-(--border) bg-[#fafafa] p-5">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-(--primary)">
                    <MapPin size={24} />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-(--text-primary)">
                        {location?.name || "Current Location"}
                      </h3>

                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                        Active
                      </span>
                    </div>

                    <p className="mt-3 max-w-xl text-sm leading-7 text-(--text-secondary)">
                      {location?.address?.city}, {location?.address?.state},{" "}
                      {location?.address?.country}
                    </p>
                  </div>
                </div>

                <button
                  onClick={onUseCurrentLocation}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-(--primary) px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#e85a28]"
                >
                  <Check size={18} />
                  Use location
                </button>
              </div>
            </div>

            {/* MAP PREVIEW */}
            <div className="overflow-hidden rounded-4xl border border-(--border)">
              <div className="flex items-center justify-between border-b border-(--border) bg-white px-5 py-4">
                <div>
                  <h3 className="font-bold text-(--text-primary)">
                    Location preview
                  </h3>

                  <p className="mt-1 text-sm text-(--text-secondary)">
                    Verify the exact delivery point on map.
                  </p>
                </div>

                <button
                  onClick={fetchCurrentLocation}
                  className="inline-flex items-center gap-2 rounded-2xl border border-(--border) bg-[#fafafa] px-4 py-2 text-sm font-semibold text-(--text-primary) transition hover:border-(--primary) hover:text-(--primary)"
                >
                  <Crosshair size={16} />
                  {isFetchingLocation ? "Detecting..." : "Detect automatically"}
                </button>
              </div>

              {/* MAP PLACEHOLDER */}
              <div className="relative h-[320px] w-full bg-[#f4f4f4]">
                <LocationSelector />
              </div>
            </div>

            {/* QUICK ACTIONS */}
            {/* <div className="grid gap-4 sm:grid-cols-2">
              <button
                type="button"
                onClick={fetchCurrentLocation}
                className="flex items-center gap-4 rounded-3xl border border-(--border) bg-white p-5 text-left transition hover:border-(--primary)"
              >
                <div className="rounded-2xl bg-orange-50 p-3 text-(--primary)">
                  <Crosshair size={20} />
                </div>

                <div>
                  <p className="font-bold text-(--text-primary)">
                    {isFetchingLocation
                      ? "Detecting..."
                      : "Detect automatically"}
                  </p>

                  <p className="mt-1 text-sm text-(--text-secondary)">
                    Use GPS for accurate coordinates.
                  </p>
                </div>
              </button>

              <button
                type="button"
                className="flex items-center gap-4 rounded-3xl border border-(--border) bg-white p-5 text-left transition hover:border-(--primary)"
              >
                <div className="rounded-2xl bg-orange-50 p-3 text-(--primary)">
                  <MapPin size={20} />
                </div>

                <div>
                  <p className="font-bold text-(--text-primary)">
                    Select manually
                  </p>

                  <p className="mt-1 text-sm text-(--text-secondary)">
                    Pin exact delivery location on map.
                  </p>
                </div>
              </button>
            </div> */}

            {/* FOOTER */}
            {/* <div className="flex flex-col-reverse gap-3 border-t border-(--border) pt-6 sm:flex-row sm:justify-end">
              <button
                onClick={onClose}
                className="rounded-2xl border border-(--border) px-5 py-3 font-semibold text-(--text-primary) transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
              >
                Cancel
              </button>

              <button
                onClick={onUseCurrentLocation}
                className="rounded-2xl bg-(--primary) px-6 py-3 font-semibold text-white transition hover:bg-[#e85a28]"
              >
                Confirm location
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationPickerModal;
