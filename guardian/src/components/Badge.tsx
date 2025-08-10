import React from "react";

type BadgeProps = {
  type?: "success" | "warning" | "danger" | "muted";
  children: React.ReactNode;
};

export function Badge({ type = "muted", children }: BadgeProps) {
  const map: Record<string, string> = {
    success: "badge badge-success",
    warning: "badge badge-warning",
    danger: "badge badge-danger",
    muted: "badge badge-muted",
  };
  return <span className={map[type]}>{children}</span>;
}

export function OriginBadge({ origin }: { origin: "AI-Verified" | "Human-Reviewed" | "AI-Suggested" | "Needs Human" }) {
  const type =
    origin === "AI-Verified" ? "success" : origin === "Human-Reviewed" ? "muted" : origin === "AI-Suggested" ? "warning" : "danger";
  return <Badge type={type}>{origin}</Badge>;
}