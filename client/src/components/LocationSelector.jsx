import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";

import { useState } from "react";
import useUiStore from "../store/useUiStore";

const LocationSelector = () => {
  const { location, setLocation } = useUiStore();
  const [position, setPosition] = useState({
    lat: location.lat || 23.2599,
    lon: location.lon || 77.4126,
  });

  const SelectLocation = () => {
    useMapEvents({
      click(e) {
        setPosition({
          lat: e.latlng.lat,
          lon: e.latlng.lng,
        });

        setLocation({ lat: e.latlng.lat, lon: e.latlng.lng });

        console.log(e.latlng.lat, e.latlng.lng);
      },
    });

    return null;
  };

  return (
    <MapContainer
      center={[position.lat, position.lon]}
      zoom={13}
      className="h-[500px] w-full rounded-3xl"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <SelectLocation />

      <Marker position={[position.lat, position.lon]}>
        <Popup>Selected Location</Popup>
      </Marker>
    </MapContainer>
  );
};

export default LocationSelector;
