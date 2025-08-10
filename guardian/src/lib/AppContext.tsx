"use client";

import React, { createContext, useContext, useState } from "react";
import { UserRole } from "./types";

export type Toast = { id: string; message: string; type?: "success" | "error" | "info" };

type AppState = {
  role: UserRole;
  setRole: (r: UserRole) => void;
  addToast: (t: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
  toasts: Toast[];
};

const Ctx = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<UserRole>("Compliance Manager");
  const [toasts, setToasts] = useState<Toast[]>([]);

  function addToast(t: Omit<Toast, "id">) {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, ...t }]);
    setTimeout(() => removeToast(id), 3000);
  }
  function removeToast(id: string) {
    setToasts((prev) => prev.filter((x) => x.id !== id));
  }

  return (
    <Ctx.Provider value={{ role, setRole, addToast, removeToast, toasts }}>
      {children}
      <div className="fixed right-4 bottom-20 lg:bottom-4 z-50 space-y-2">
        {toasts.map((t) => (
          <div key={t.id} className="card px-3 py-2 text-sm">
            {t.message}
          </div>
        ))}
      </div>
    </Ctx.Provider>
  );
}

export function useApp() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}