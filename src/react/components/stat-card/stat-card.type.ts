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
