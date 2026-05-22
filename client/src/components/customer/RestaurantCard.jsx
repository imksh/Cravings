import { Clock3, Heart, MapPin, Star, Sparkles } from "lucide-react";
import { calculateETA } from "../../utils/calculateETA";
import { formatDistance } from "../../utils/formatDistance";
import useUiStore from "../../store/useUiStore";

const RestaurantCard = ({ restaurant, onClick }) => {
  const { location } = useUiStore();
  return (
    <button
      onClick={onClick}
      className="
        group relative overflow-hidden
        rounded-[2rem]
        border border-(--border)
        bg-white
        text-left
        shadow-sm
        transition-all duration-500
        hover:-translate-y-1.5
        hover:shadow-2xl
      "
    >
      {/* IMAGE SECTION */}
      <div className="relative h-60 overflow-hidden">
        {/* COVER */}
        <img
          src={
            restaurant?.coverImage?.url ||
            restaurant?.image?.url ||
            `https://placehold.co/600x400/orange/white?text=${restaurant?.name}`
          }
          alt={restaurant?.name}
          className="
            h-full w-full object-cover
            transition duration-700
            group-hover:scale-110
          "
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

        {/* TOP ACTIONS */}
        <div className="absolute left-4 right-4 top-4 flex items-start justify-between">
          {/* OFFER */}
          <div className="flex flex-col gap-2">
            {restaurant?.offer && (
              <div className="flex items-center gap-1 rounded-full bg-(--primary) px-3 py-1 text-xs font-bold text-white shadow-lg">
                <Sparkles size={12} />
                {restaurant.offer}
              </div>
            )}

            {restaurant?.isVerified && (
              <div className="rounded-full bg-emerald-500/90 px-3 py-1 text-[11px] font-bold text-white backdrop-blur">
                Verified
              </div>
            )}
          </div>

          {/* SAVE */}
          <button
            className="
              flex h-11 w-11 items-center justify-center
              rounded-full
              bg-white/90
              shadow-lg
              backdrop-blur
              transition-all duration-300
              hover:scale-110
              active:scale-95
            "
          >
            <Heart size={18} className="text-(--text-primary)" />
          </button>
        </div>

        {/* BOTTOM INFO */}
        <div className="absolute bottom-0 left-0 w-full p-5 text-white">
          <div className="flex items-end justify-between gap-3">
            {/* LEFT */}
            <div className="min-w-0 flex-1">
              {/* LOGO + NAME */}
              <div className="flex items-center gap-3">
                <img
                  src={
                    restaurant?.image?.url ||
                    `https://placehold.co/100x100/orange/white?text=${restaurant?.name}`
                  }
                  alt={restaurant?.name}
                  className="
                    h-14 w-14 rounded-2xl
                    border border-white/20
                    object-cover
                    shadow-xl
                  "
                />

                <div className="min-w-0">
                  <h3 className="truncate text-xl font-black tracking-tight">
                    {restaurant?.name}
                  </h3>

                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    {restaurant?.cuisine?.slice(0, 2).map((cuisine) => (
                      <span
                        key={cuisine}
                        className="
                            rounded-full
                            border border-white/10
                            bg-white/10
                            px-2.5 py-1
                            text-[11px]
                            font-semibold
                            text-white/90
                            backdrop-blur
                          "
                      >
                        {cuisine}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* RATING */}
            <div
              className="
                flex shrink-0 items-center gap-1
                rounded-2xl
                bg-emerald-500
                px-3 py-2
                text-sm font-bold
                text-white
                shadow-xl
              "
            >
              <Star size={14} fill="currentColor" />

              {restaurant?.rating || 4.5}
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5">
        {/* DELIVERY INFO */}
        <div className="flex items-center justify-between rounded-2xl bg-[#fafafa] px-4 py-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-(--text-primary)">
            <Clock3 size={16} className="text-(--primary)" />

            <span>
              {calculateETA(
                {
                  lat: restaurant.geoLocation.coordinates[1],
                  lon: restaurant.geoLocation.coordinates[0],
                },
                { lat: location.lat, lon: location.lon },
              )}{" "}
              mins
            </span>
          </div>

          <div className="h-1 w-1 rounded-full bg-(--text-secondary)" />

          <div className="flex items-center gap-2 text-sm font-semibold text-(--text-primary)">
            <MapPin size={16} className="text-(--primary)" />

            <span>
              {formatDistance(
                {
                  lat: restaurant.geoLocation.coordinates[1],
                  lon: restaurant.geoLocation.coordinates[0],
                },
                { lat: location.lat, lon: location.lon },
              )}
            </span>
          </div>
        </div>

        {/* DESCRIPTION */}
        <p className="mt-4 line-clamp-2 text-sm leading-7 text-(--text-secondary)">
          {restaurant?.description ||
            "Delicious dishes prepared with fresh ingredients and authentic flavors."}
        </p>

        {/* FOOTER */}
        <div className="mt-5 flex items-center justify-between gap-3">
          {/* TAGS */}
          <div className="flex flex-wrap gap-2">
            {restaurant?.tags?.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="
                  rounded-full
                  border border-orange-100
                  bg-orange-50
                  px-3 py-1
                  text-[11px]
                  font-bold
                  text-(--primary)
                "
              >
                {tag}
              </span>
            ))}
          </div>

          {/* STATUS */}
          <div
            className={`
              rounded-full
              px-3 py-1.5
              text-[11px]
              font-black
              tracking-wide
              ${
                restaurant?.isOpen
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-red-50 text-red-700"
              }
            `}
          >
            {restaurant?.isOpen ? "OPEN" : "CLOSED"}
          </div>
        </div>
      </div>

      {/* HOVER BORDER */}
      <div
        className="
          pointer-events-none absolute inset-0
          rounded-[2rem]
          ring-0 ring-(--primary)/20
          transition-all duration-500
          group-hover:ring-4
        "
      />
    </button>
  );
};

export default RestaurantCard;
