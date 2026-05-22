import React from "react";

const CustomerCategoryCard = ({
  icon: Icon,
  title,
  description,
  count,
  accent,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex h-full flex-col rounded-3xl border border-[color:var(--border)] bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${accent} text-white shadow-lg transition-transform group-hover:scale-105`}
      >
        <Icon size={22} />
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg font-bold text-[color:var(--text-primary)]">
            {title}
          </h3>
          <span className="rounded-full bg-[#fff7f1] px-3 py-1 text-xs font-semibold text-[color:var(--primary)]">
            {count}
          </span>
        </div>
        <p className="text-sm leading-6 text-[color:var(--text-secondary)]">
          {description}
        </p>
      </div>
    </button>
  );
};

export default CustomerCategoryCard;
