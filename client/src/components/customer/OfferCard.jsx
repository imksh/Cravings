import { Clock3, Percent, Tag } from "lucide-react";

const OfferCard = ({ offer, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group overflow-hidden rounded-4xl border border-(--border) bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
    >
      {/* IMAGE SECTION */}
      <div
        className={`relative flex h-56 items-center justify-center overflow-hidden bg-gradient-to-br ${offer.accent}`}
      >
        <div className="absolute inset-0 bg-black/10" />

        <img
          src={offer.image}
          alt={offer.title}
          className="relative z-10 h-44 w-44 object-contain transition duration-300 group-hover:scale-105"
        />

        <div className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-bold text-(--primary)">
          {offer.type}
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-2xl font-extrabold tracking-tight text-(--text-primary)">
              {offer.title}
            </h3>

            <p className="mt-2 text-sm text-(--text-secondary)">
              {offer.subtitle}
            </p>
          </div>

          <div className="rounded-full bg-orange-50 p-2 text-(--primary)">
            <Percent size={18} />
          </div>
        </div>

        {/* RESTAURANT */}
        <div className="mt-5 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-(--text-secondary)">
              Restaurant
            </p>

            <p className="mt-1 font-semibold text-(--text-primary)">
              {offer.restaurant}
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-[#fafafa] px-3 py-2 text-sm font-medium text-(--text-secondary)">
            <Clock3 size={16} />
            {offer.validity}
          </div>
        </div>

        {/* COUPON */}
        <div className="mt-5 flex items-center justify-between rounded-2xl border border-dashed border-(--primary) bg-orange-50 px-4 py-3">
          <div className="flex items-center gap-2">
            <Tag size={16} className="text-(--primary)" />

            <span className="font-semibold tracking-wide text-(--primary)">
              {offer.code}
            </span>
          </div>

          <span className="text-xs font-medium text-(--text-secondary)">
            Tap to use
          </span>
        </div>
      </div>
    </button>
  );
};

export default OfferCard;
