import React from "react";
import { Clock3, MapPin, Star } from "lucide-react";
import { formatDistance } from "../../utils/formatDistance";
import useUiStore from "../../store/useUiStore";
import { calculateETA } from "../../utils/calculateETA";

const CustomerRestaurantCard = ({ restaurant, onSelect }) => {
  const { location } = useUiStore();



  return (
    <article className="group overflow-hidden rounded-[1.75rem] border border-[color:var(--border)] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-2xl">
      <div className="relative aspect-[16/10] overflow-hidden bg-[#fff7f1]">
        <img
          src={restaurant?.image?.url}
          alt={restaurant.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        {restaurant.offer && (
          <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-[color:var(--primary)] shadow-sm backdrop-blur">
            {restaurant.offer}
          </div>
        )}

        {restaurant.isOpen ? (
          <div className="absolute right-4 top-4 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            Open
          </div>
        ) : (
          <div className="absolute right-4 top-4 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">
            Closed
          </div>
        )}
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-[color:var(--text-primary)]">
              {restaurant.name}
            </h3>
            <h3 className="text-sm text-(--text-secondary)">
              {restaurant.description}
            </h3>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              {restaurant?.cuisine?.slice(0, 3).map((cuisine) => (
                <span
                  key={cuisine}
                  className="
                            px-3 py-1
                            text-xs font-medium
                            rounded-full
                            bg-(--surface-secondary)
                            text-(--text-secondary)
                            border border-(--border)
                          "
                >
                  {cuisine}
                </span>
              ))}
            </div>
          </div>
          <div className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
            <Star size={14} fill="currentColor" />
            {restaurant.rating}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {restaurant?.tags?.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[#fafafa] px-3 py-1 text-xs font-medium text-[color:var(--text-secondary)]"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2 text-sm text-[color:var(--text-secondary)]">
          <div className="rounded-2xl  bg-[#fafafa] px-3 py-3 text-center">
            <Clock3
              size={16}
              className="mx-auto mb-1 text-[color:var(--primary)]"
            />
            {calculateETA(
              {
                lat: restaurant.geoLocation.coordinates[1],
                lon: restaurant.geoLocation.coordinates[0],
              },
              { lat: location.lat, lon: location.lon },
            )} mins
          </div>
          <div className="rounded-2xl mb-1 bg-[#fafafa] px-3 py-3 text-center">
            <MapPin
              size={16}
              className="mx-auto  text-[color:var(--primary)]"
            />
            {formatDistance(
              {
                lat: restaurant.geoLocation.coordinates[1],
                lon: restaurant.geoLocation.coordinates[0],
              },
              { lat: location.lat, lon: location.lon },
            )} 
          </div>
          <div className="rounded-2xl flex justify-center items-center bg-[#fafafa] px-3 py-3 text-center">
            {restaurant.isVeg ? (
              <div className="flex flex-col gap-1 items-center justify-center">
                <div className="w-4 h-4 border-2 border-green-600 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-green-600" />
                </div>
                <span className="text-green-600">Veg</span>
              </div>
            ) : (
              <div className="flex flex-col gap-1 items-center justify-center">
                <div className="w-4 h-4 border-2 border-red-600 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-red-600" />
                </div>
                <span className="text-red-600">Non-Veg</span>
              </div>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={onSelect}
          className="inline-flex w-full items-center justify-center rounded-2xl bg-[color:var(--primary)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#e85a28]"
        >
          View menu
        </button>
      </div>
    </article>
  );
};

export default CustomerRestaurantCard;
