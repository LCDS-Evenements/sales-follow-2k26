import type { StatCardProps } from "#/react/components/stat-card/stat-card.type";
import type { Component } from "#/utils/react";
import { StatCard } from "#/react/components/stat-card";
import { DollarSignIcon, ShoppingBasketIcon, TicketIcon, UsersIcon } from "lucide-react";

const samples: StatCardProps[] = [
  {
    label: "Total revenue",
    value: 284.592,
    change: 12.5,
    trend: "up",
    icon: DollarSignIcon,
    unit: "money",
  },
  {
    label: "Tickets sold",
    value: 3.847,
    change: 8.2,
    trend: "down",
    icon: TicketIcon,
    unit: "count",
  },
  {
    label: "Unique customers",
    value: 2.891,
    change: 15.3,
    trend: "up",
    icon: UsersIcon,
    unit: "count",
  },
  {
    label: "Average basket",
    value: 74,
    change: 4.1,
    trend: "down",
    icon: ShoppingBasketIcon,
    unit: "money",
  },
];

export const StatsCards: Component = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {samples.map((sample) => (
        <StatCard
          key={sample.label}
          label={sample.label}
          value={sample.value}
          change={sample.change}
          trend={sample.trend}
          icon={sample.icon}
          unit={sample.unit}
          loading={false}
          error={false}
        />
      ))}
    </div>
  );
};
