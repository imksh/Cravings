import React from "react";
import { ArrowRight } from "lucide-react";

const CustomerHomeSectionTitle = ({
  eyebrow,
  title,
  description,
  actionLabel,
  onAction,
}) => {
  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl space-y-3">
        {eyebrow ? (
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[color:var(--primary)]">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="font-heading text-3xl font-extrabold tracking-tight text-[color:var(--text-primary)] sm:text-4xl">
          {title}
        </h2>
        {description ? (
          <p className="max-w-2xl text-sm leading-7 text-[color:var(--text-secondary)] sm:text-base">
            {description}
          </p>
        ) : null}
      </div>

      {actionLabel ? (
        <button
          type="button"
          onClick={onAction}
          className="inline-flex items-center gap-2 self-start rounded-full border border-[color:var(--border)] bg-white px-4 py-2 text-sm font-semibold text-[color:var(--text-primary)] shadow-sm transition hover:-translate-y-0.5 hover:border-[color:var(--primary)] hover:text-[color:var(--primary)]"
        >
          {actionLabel}
          <ArrowRight size={16} />
        </button>
      ) : null}
    </div>
  );
};

export default CustomerHomeSectionTitle;
