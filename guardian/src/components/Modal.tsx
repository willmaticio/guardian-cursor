"use client";

import React, { useEffect } from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidthClass?: string;
};

export function Modal({ open, onClose, title, children, maxWidthClass = "max-w-2xl" }: ModalProps) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className={`relative w-full ${maxWidthClass} card`}>
        <div className="card-header">
          <div className="font-semibold">{title}</div>
          <button className="btn btn-muted" onClick={onClose} aria-label="Close">✕</button>
        </div>
        <div className="card-body">{children}</div>
      </div>
    </div>
  );
}