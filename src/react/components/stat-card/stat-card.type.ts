import type { LucideIcon } from "lucide-react";

export type StatCardProps = {
  label: string;
  icon: LucideIcon;
  value: number;
  change: number;
  trend: "up" | "down";
  unit: "count" | "money";
  loading?: boolean;
  error?: boolean;
};

export type StatCardSkeletonProps = {
  label: string;
  icon: LucideIcon;
};

export type StatCardErrorProps = {
  label: string;
};
