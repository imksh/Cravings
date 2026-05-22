export const formatDistance = (location1, location2) => {
  const lat1 = location1.lat;
  const lon1 = location1.lon;

  const lat2 = location2.lat;
  const lon2 = location2.lon;

  const R = 6371;

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;

  if (distance < 1) {
    return "<1 km";
  }

  if (distance > 50) {
    return ">50 km";
  }

  return `${Math.round(distance)} km`;
};
