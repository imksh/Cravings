import React, { useState } from "react";
import { Home, MapPin, Navigation, Plus, X, Map } from "lucide-react";
import useUiStore from "../../../store/useUiStore";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import api from "../../../config/api";
import toast from "react-hot-toast";
import { useAuthStore } from "../../../store/useAuthStore";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const MapClickHandler = ({ onLocationSelect }) => {
  useMapEvents({
    click(e) {
      onLocationSelect({ lat: e.latlng.lat, lon: e.latlng.lng });
    },
  });
  return null;
};

const AddAddressModal = ({ open, onClose }) => {
  const { location } = useUiStore();
  const { user, setUser } = useAuthStore();
  const [step, setStep] = useState("map");
  const [types, setTypes] = useState(["Home", "Work", "Hostel", "Other"]);
  const [addingTitle, setAddingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const [selectedLocation, setSelectedLocation] = useState({
    lat: location?.lat || 28.6139,
    lon: location?.lon || 77.209,
  });

  const [formData, setFormData] = useState({
    title: "Home",
    name: location?.name || "",
    address: location?.name || "",
    city: location?.address?.city || "",
    state: location?.address?.state || "",
    pin: location?.address?.pin || "",
    landmark: "",
    instructions: "",
    lat: location?.lat || null,
    lon: location?.lon || null,
  });

  const handleChange = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleAddTitle = () => {
    const v = newTitle.trim();
    if (!v) return;
    if (!types.includes(v)) setTypes((t) => [...t, v]);
    setFormData((p) => ({ ...p, title: v }));
    setNewTitle("");
    setAddingTitle(false);
  };

  const confirmLocationFromMap = () => {
    if (!selectedLocation) return;
    setFormData((p) => ({
      ...p,
      name: location?.name,
      address:
        location.name ||
        `Lat: ${selectedLocation.lat.toFixed(4)}, Lon: ${selectedLocation.lon.toFixed(4)}`,
      lat: selectedLocation.lat,
      lon: selectedLocation.lon,
      pin: location?.address?.pin || "",
      city: location?.address?.city || "",
      state: location?.address?.state || "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddressUpdate(formData);
  };

  const handleAddressUpdate = async (data) => {
    try {
      const res = await api.post("/customer/address", data);
      const updatedUser = { ...user };
      updatedUser.customer.addresses = res.data.data;
      toast.success("Address added successfully!");
      setUser(updatedUser);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to add new address. Please try again.",
      );

      console.log(error);
    } finally {
        onClose();
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-2xl max-h-[95vh] overflow-y-auto rounded-4xl bg-white border border-(--border) shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 z-20 rounded-full bg-white/90 p-2 text-(--text-secondary)"
        >
          <X size={20} />
        </button>

        <div className="rounded-t-4xl bg-linear-to-r from-(--primary) to-[#ff8c42] px-6 py-10 text-white">
          <div className="flex items-center gap-5">
            <div className="flex h-18 w-18 items-center justify-center rounded-3xl bg-white/15">
              <MapPin size={34} />
            </div>
            <div>
              <p className="text-sm uppercase tracking-wider text-orange-100">
                Delivery address
              </p>
              <h2 className="mt-2 text-3xl font-extrabold">Add new address</h2>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          {step === "map" && (
            <div>
              <h3 className="mb-4 text-lg font-semibold text-(--text-primary)">
                Choose on map
              </h3>
              <div className="overflow-hidden rounded-2xl border border-(--border)">
                <MapContainer
                  center={[selectedLocation.lat, selectedLocation.lon]}
                  zoom={15}
                  style={{ height: 420, width: "100%" }}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  {selectedLocation && (
                    <Marker
                      position={[selectedLocation.lat, selectedLocation.lon]}
                    />
                  )}
                  <MapClickHandler
                    onLocationSelect={(loc) => {
                      setSelectedLocation(loc);
                      setFormData((p) => ({
                        ...p,
                        address: `Lat: ${loc.lat.toFixed(4)}, Lon: ${loc.lon.toFixed(4)}`,
                        lat: loc.lat,
                        lon: loc.lon,
                      }));
                    }}
                  />
                </MapContainer>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-(--text-secondary)">
                  Click anywhere to drop a pin.
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedLocation({
                        lat: location.lat,
                        lon: location.lon,
                      })
                    }
                    className="rounded-2xl border px-3 py-2"
                  >
                    Center to my location
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      confirmLocationFromMap();
                      setStep("form");
                    }}
                    className="rounded-2xl bg-(--primary) px-4 py-2 text-white"
                  >
                    Next: Fill details
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === "form" && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep("map")}
                  className="text-sm text-(--text-primary)"
                >
                  ← Back to map
                </button>
              </div>

              <div>
                <label className="mb-3 block text-sm font-semibold text-(--text-primary)">
                  Address type
                </label>
                <div className="flex flex-wrap items-center gap-3">
                  {types.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setFormData((p) => ({ ...p, title: t }))}
                      className={`inline-flex items-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold ${formData.title === t ? "border-(--primary) bg-(--primary) text-white" : "border-(--border) bg-white"}`}
                    >
                      <Home size={16} />
                      {t}
                    </button>
                  ))}

                  {!addingTitle && (
                    <button
                      type="button"
                      onClick={() => setAddingTitle(true)}
                      className="inline-flex items-center gap-2 rounded-2xl border px-4 py-3 text-sm"
                    >
                      <Plus size={16} />
                      Add
                    </button>
                  )}

                  {addingTitle && (
                    <div className="flex items-center gap-2">
                      <input
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="Custom title"
                        className="rounded-2xl border px-3 py-2"
                      />
                      <button
                        type="button"
                        onClick={handleAddTitle}
                        className="rounded-2xl bg-(--primary) px-3 py-2 text-white"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setAddingTitle(false);
                          setNewTitle("");
                        }}
                        className="rounded-2xl border px-3 py-2"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-(--text-primary)">
                    Full address
                  </label>
                  <div className="flex items-start gap-3 rounded-2xl border bg-[#fafafa] px-4 py-4">
                    <MapPin size={18} className="mt-1" />
                    <textarea
                      rows={4}
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="House no, street, area..."
                      className="w-full resize-none bg-transparent outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-(--text-primary)">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full rounded-2xl border px-4 py-3"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-(--text-primary)">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full rounded-2xl border px-4 py-3"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-(--text-primary)">
                    PIN code
                  </label>
                  <input
                    type="text"
                    name="pin"
                    value={formData.pin}
                    onChange={handleChange}
                    className="w-full rounded-2xl border px-4 py-3"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-(--text-primary)">
                    Landmark
                  </label>
                  <input
                    type="text"
                    name="landmark"
                    value={formData.landmark}
                    onChange={handleChange}
                    className="w-full rounded-2xl border px-4 py-3"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-(--text-primary)">
                    Delivery instructions
                  </label>
                  <div className="flex items-start gap-3 rounded-2xl border bg-[#fafafa] px-4 py-4">
                    <Navigation size={18} className="mt-1" />
                    <textarea
                      rows={3}
                      name="instructions"
                      value={formData.instructions}
                      onChange={handleChange}
                      placeholder="Apartment number, gate details, etc."
                      className="w-full resize-none bg-transparent outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-orange-100 bg-orange-50 p-5">
                <p className="text-sm">
                  Accurate delivery information helps riders reach faster and
                  reduces failed deliveries.
                </p>
              </div>

              <div className="flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-2xl border px-5 py-3"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-2xl bg-(--primary) px-6 py-3 text-white"
                >
                  <Plus size={18} />
                  Save address
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddAddressModal;
