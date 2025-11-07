"use client";

import type { ChartConfig } from "#/react/ui";
import type { Component } from "#/utils/react";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle, ChartContainer, ChartTooltip, ChartTooltipContent } from "#/react/ui";
import { ChartColumn } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

export const RevenueOverTime: Component = () => {
  const chartData = [
    { month: "January", early: 186, regular: 80, late: 20 },
    { month: "February", early: 305, regular: 200, late: 30 },
    { month: "March", early: 237, regular: 120, late: 25 },
    { month: "April", early: 73, regular: 190, late: 40 },
    { month: "May", early: 209, regular: 130, late: 35 },
    { month: "June", early: 214, regular: 140, late: 30 },
    { month: "July", early: 250, regular: 160, late: 45 },
    { month: "August", early: 280, regular: 170, late: 50 },
    { month: "September", early: 230, regular: 150, late: 40 },
    { month: "October", early: 300, regular: 210, late: 55 },
    { month: "November", early: 330, regular: 220, late: 60 },
    { month: "December", early: 420, regular: 260, late: 75 },
  ];

  const chartConfig = {
    early: {
      label: "Early",
      color: "var(--chart-1)",
    },
    regular: {
      label: "Regular",
      color: "var(--chart-2)",
    },
    late: {
      label: "Late",
      color: "var(--chart-3)",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue over time</CardTitle>

        <CardDescription>Cumulative revenue by ticket category</CardDescription>

        <CardAction>
          <ChartColumn size={22} className="text-primary" />
        </CardAction>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />

            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value: string) => value.slice(0, 3)} />

            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

            <defs>
              <linearGradient id="fillEarly" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-early)" stopOpacity={0.8} />

                <stop offset="95%" stopColor="var(--color-early)" stopOpacity={0.1} />
              </linearGradient>

              <linearGradient id="fillRegular" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-regular)" stopOpacity={0.8} />

                <stop offset="95%" stopColor="var(--color-regular)" stopOpacity={0.1} />
              </linearGradient>

              <linearGradient id="fillLate" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-late)" stopOpacity={0.8} />

                <stop offset="95%" stopColor="var(--color-late)" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <Area dataKey="late" type="natural" fill="url(#fillLate)" fillOpacity={0.4} stroke="var(--color-late)" stackId="a" />

            <Area dataKey="regular" type="natural" fill="url(#fillRegular)" fillOpacity={0.4} stroke="var(--color-regular)" stackId="a" />

            <Area dataKey="early" type="natural" fill="url(#fillEarly)" fillOpacity={0.4} stroke="var(--color-early)" stackId="a" />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
