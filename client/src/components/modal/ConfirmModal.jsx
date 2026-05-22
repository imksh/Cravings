import React from "react";
import { AlertTriangle, LoaderCircle, Trash2, X } from "lucide-react";

const ConfirmModal = ({
  open,
  onClose,
  onConfirm,
  title = "Are you sure?",
  image,
  description = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  isLoading = false,
  variant = "danger", // danger | warning | primary
}) => {
  if (!open) return null;

  const variants = {
    danger: {
      bg: "from-red-500 to-rose-500",
      soft: "bg-red-50",
      text: "text-red-600",
      button: "bg-red-500 hover:bg-red-600 shadow-red-200",
      border: "border-red-100",
      icon: Trash2,
    },

    warning: {
      bg: "from-orange-500 to-amber-500",
      soft: "bg-orange-50",
      text: "text-orange-600",
      button: "bg-orange-500 hover:bg-orange-600 shadow-orange-200",
      border: "border-orange-100",
      icon: AlertTriangle,
    },

    primary: {
      bg: "from-(--primary) to-[#ff8c42]",
      soft: "bg-orange-50",
      text: "text-(--primary)",
      button: "bg-(--primary) hover:bg-[#e85a28] shadow-orange-200",
      border: "border-orange-100",
      icon: AlertTriangle,
    },
  };

  const current = variants[variant] || variants.danger;

  const Icon = current.icon;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      {/* OVERLAY */}
      <button type="button" onClick={onClose} className="absolute inset-0" />

      {/* MODAL */}
      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-[2rem] border border-[#f1e5dd] bg-white shadow-2xl">
        {/* HEADER */}
        <div
          className={`relative overflow-hidden bg-linear-to-r ${current.bg} px-6 py-8 text-white`}
        >
          <div className="absolute right-0 top-0 h-44 w-44 rounded-full bg-white/10 blur-3xl" />

          <button
            onClick={onClose}
            className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 backdrop-blur transition hover:bg-white/25"
          >
            <X size={20} />
          </button>

          <div className="relative z-10 flex items-center gap-5">
            <div className="flex h-18 w-18 items-center justify-center rounded-[1.5rem] bg-white/15 backdrop-blur">
              <Icon size={34} />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/70">
                Confirmation Required
              </p>

              <h2 className="mt-2 text-3xl font-black tracking-tight">
                {title}
              </h2>
            </div>
          </div>
        </div>

        {/* BODY */}
        <div className="p-6 sm:p-8">
          <div
            className={`rounded-[1.7rem] border flex gap-2  items-center ${current.border} ${current.soft} p-5`}
          >
            {image && (
              <img
                src={image}
                alt="Preview"
                className="rounded-2xl border border-[#f1e5dd] bg-white w-16 aspect-square"
              />
            )}
            <p className="text-sm leading-7 text-slate-600">{description}</p>
          </div>

          {/* ACTIONS */}
          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="rounded-2xl border border-[#f1e5dd] bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {cancelText}
            </button>

            <button
              type="button"
              onClick={onConfirm}
              disabled={isLoading}
              className={`inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold text-white shadow-xl transition disabled:cursor-not-allowed disabled:opacity-70 ${current.button}`}
            >
              {isLoading ? (
                <>
                  <LoaderCircle size={18} className="animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Icon size={18} />
                  {confirmText}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
