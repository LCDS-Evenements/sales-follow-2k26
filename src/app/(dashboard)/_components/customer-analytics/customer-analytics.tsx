import type { Component } from "#/utils/react";
import { Ages } from "./ages";
import { Locations } from "./locations";
import { PeakSalesHours } from "./peak-sales-hours";
import { Preferences } from "./preferences";

const sample = {
  ages: [
    { label: "18 - 24 years", percentage: 35, value: 1247 },
    { label: "25 - 34 years", percentage: 42, value: 1498 },
    { label: "35 - 44 years", percentage: 15, value: 535 },
    { label: "45+ years", percentage: 8, value: 285 },
  ],
  locations: [
    { label: "New York", percentage: 28, value: 998 },
    { label: "Los Angeles", percentage: 22, value: 784 },
    { label: "Chicago", percentage: 18, value: 642 },
    { label: "Miami", percentage: 15, value: 535 },
    { label: "Other", percentage: 17, value: 606 },
  ],
  preferences: [
    { label: "Pass 2 jours", percentage: 45, value: 1756 },
    { label: "Pass Samedi", percentage: 32, value: 2019 },
    { label: "Pass Vendredi", percentage: 23, value: 1884 },
  ],
};

export const CustomerAnalytics: Component = () => {
  return (
    <div className="flex items-start flex-col gap-4">
      <p className="leading-none font-semibold">Customer analytics</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
        <Ages ages={sample.ages} />

        <Locations locations={sample.locations} />

        <Preferences preferences={sample.preferences} />
      </div>

      <PeakSalesHours />
    </div>
  );
};
