"use client";

import type { ChartConfig } from "#/react/ui";
import type { Component } from "#/utils/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, ChartContainer, ChartTooltip, ChartTooltipContent } from "#/react/ui";
import { day } from "#/utils/day";
import { ClockIcon } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const chartData = Array.from({ length: 24 }, (_, i) => ({
  hour: day().hour(i).minute(0).format("HH[h]"),
  ticketsSold: Math.floor(Math.random() * 300) + 1,
}));

const chartConfig = {
  ticketsSold: {
    label: "Tickets sold",
    color: "var(--chart-6)",
  },
} satisfies ChartConfig;

export const PeakSalesHours: Component = () => {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row gap-3">
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary/20">
          <ClockIcon size={22} className="text-primary" />
        </div>

        <div className="flex items-start gap-1 flex-col">
          <CardTitle>Peak sales hours</CardTitle>

          <CardDescription>When customer buy most</CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />

            <XAxis dataKey="hour" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value: string) => value.slice(0, 3)} />

            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />

            <Bar dataKey="ticketsSold" fill="var(--color-ticketsSold)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
