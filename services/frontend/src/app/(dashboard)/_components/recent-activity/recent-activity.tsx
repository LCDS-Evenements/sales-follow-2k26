import type { ActivityProps } from "./activity/activity.type";
import type { Component } from "@core-modules/ui-kit/utils";
import { Activity } from "./activity";
import { ClockIcon } from "@core-modules/ui-kit/icons";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@core-modules/ui-kit/ui";
import { day } from "#/utils/day";

const samples: ActivityProps[] = [
  {
    type: "purchased",
    customer: "Antoine SIRY",
    label: "Late - Pass Samedi",
    amount: 100,
    ago: day("2025-08-11 00:15").toDate(),
  },
  {
    type: "sold-out",
    label: "Late - Pass Vendredi",
    ago: day("2025-08-09 12:15").toDate(),
  },
  {
    type: "purchased",
    customer: "Mathias CAILLEZ",
    label: "Early - Pass 2 Jours",
    amount: 150,
    ago: day("2025-08-08 18:30").toDate(),
  },
  {
    type: "purchased",
    customer: "Sophie MARTIN",
    label: "Regular - Pass Vendredi",
    amount: 85,
    ago: day("2025-08-08 14:22").toDate(),
  },
  {
    type: "purchased",
    customer: "Lucas BERNARD",
    label: "Early - Pass Samedi",
    amount: 75,
    ago: day("2025-08-07 21:45").toDate(),
  },
  {
    type: "sold-out",
    label: "Early - Pass Vendredi",
    ago: day("2025-08-07 16:00").toDate(),
  },
  {
    type: "purchased",
    customer: "Antoine SIRY",
    label: "Regular - Pass 2 Jours",
    amount: 160,
    ago: day("2025-08-06 10:15").toDate(),
  },
  {
    type: "purchased",
    customer: "Emma DUBOIS",
    label: "Late - Pass 2 Jours",
    amount: 180,
    ago: day("2025-08-05 23:50").toDate(),
  },
  {
    type: "purchased",
    customer: "Thomas PETIT",
    label: "Regular - Pass Samedi",
    amount: 90,
    ago: day("2025-08-05 15:30").toDate(),
  },
  {
    type: "sold-out",
    label: "Regular - Pass Vendredi",
    ago: day("2025-08-04 20:10").toDate(),
  },
  {
    type: "purchased",
    customer: "Mathias CAILLEZ",
    label: "Early - Pass Vendredi",
    amount: 70,
    ago: day("2025-08-04 09:25").toDate(),
  },
  {
    type: "purchased",
    customer: "Clara ROUSSEAU",
    label: "Late - Pass Samedi",
    amount: 100,
    ago: day("2025-08-03 19:40").toDate(),
  },
  {
    type: "purchased",
    customer: "Hugo LAURENT",
    label: "Early - Pass 2 Jours",
    amount: 150,
    ago: day("2025-08-03 13:15").toDate(),
  },
  {
    type: "sold-out",
    label: "Late - Pass 2 Jours",
    ago: day("2025-08-02 22:05").toDate(),
  },
  {
    type: "purchased",
    customer: "Léa MOREAU",
    label: "Regular - Pass 2 Jours",
    amount: 160,
    ago: day("2025-08-02 11:30").toDate(),
  },
];

export const RecentActivity: Component = () => {
  return (
    <Card className="py-4 md:py-6">
      <CardHeader className="px-4 md:px-6">
        <CardTitle>Recent activity</CardTitle>

        <CardDescription>Latest sales and activity</CardDescription>

        <CardAction>
          <ClockIcon size={22} className="text-primary" />
        </CardAction>
      </CardHeader>

      <CardContent
        className="flex flex-col gap-2 max-h-[450px] overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-4 md:px-6"
      >
        {samples.map((sample) => (
          <Activity
            key={Math.random().toString(36).substring(2, 11)}
            label={sample.label}
            ago={sample.ago}
            type={sample.type}
            amount={sample.amount}
            customer={sample.customer}
          />
        ))}
      </CardContent>
    </Card>
  );
};
