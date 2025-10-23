import type { PerformerItemProps } from "./performer-item/performer-item.type";
import type { Component } from "#/utils/react";
import { PerformerItem } from "./performer-item";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "#/react/ui";
import { CrownIcon } from "lucide-react";

const samples: PerformerItemProps[] = [
  {
    label: "Regular - Pass Samedi",
    value: 110000,
    change: 12.5,
    trend: "up",
    rank: 1,
    unitsSold: 1500,
  },
  {
    label: "Late - Pass 2 Jours",
    value: 81000,
    change: 8.2,
    trend: "down",
    rank: 2,
    unitsSold: 1200,
  },
  {
    label: "Early - Pass Vendredi",
    value: 72000,
    change: 15.3,
    trend: "up",
    rank: 3,
    unitsSold: 1000,
  },
  {
    label: "Early - Pass 2 Jours",
    value: 40000,
    change: 4.1,
    trend: "down",
    rank: 4,
    unitsSold: 700,
  },
  {
    label: "Regular - Pass Vendredi",
    value: 24000,
    change: 4.1,
    trend: "down",
    rank: 5,
    unitsSold: 500,
  },
];

export const TopPerformers: Component = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top performers</CardTitle>

        <CardDescription>Best selling tickets this period</CardDescription>

        <CardAction>
          <CrownIcon size={22} className="text-primary" />
        </CardAction>
      </CardHeader>

      <CardContent className="flex flex-col gap-2">
        {samples.map((performerItem, index) => (
          <PerformerItem
            key={performerItem.label}
            rank={index + 1}
            label={performerItem.label}
            change={performerItem.change}
            trend={performerItem.trend}
            unitsSold={performerItem.unitsSold}
            value={performerItem.value}
          />
        ))}
      </CardContent>
    </Card>
  );
};
