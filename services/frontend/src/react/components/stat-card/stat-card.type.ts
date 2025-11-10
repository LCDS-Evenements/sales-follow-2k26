import type { LucideIcon } from "@core-modules/ui-kit/icons";

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
