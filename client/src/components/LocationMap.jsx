import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import L from "leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import useUiStore from "../store/useUiStore";
import { useEffect, useState } from "react";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const LocationMap = () => {
  const { location } = useUiStore();
  const [loc, setLoc] = useState({
    lat: 23.2599,
    lon: 77.4126,
    name: "Bhopal",
    address: { city: "Bhopal", state: "Madhya Pradesh", country: "India" },
  });
  useEffect(() => {
    if (location.lat && location.lon) {
      setLoc(location);
    }
  }, [location]);

  return (
    <MapContainer
      center={[loc.lat, loc.lon]}
      zoom={13}
      className="h-[400px] w-full rounded-3xl"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={[loc.lat, loc.lon]}>
        <Popup>{loc?.name || "Selected Location"}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default LocationMap;
