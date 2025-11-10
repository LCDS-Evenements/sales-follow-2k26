import type { LocationsProps } from "./locations.type";
import type { Component } from "@core-modules/ui-kit/utils";
import { PinIcon } from "@core-modules/ui-kit/icons";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Progress } from "@core-modules/ui-kit/ui";

export const Locations: Component<LocationsProps> = ({ locations }) => {
  return (
    <Card className="py-4 md:py-6">
      <CardHeader className="flex flex-row gap-3 px-4 md:px-6">
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary/20">
          <PinIcon size={22} className="text-primary" />
        </div>

        <div className="flex items-start gap-1 flex-col">
          <CardTitle>Top locations</CardTitle>

          <CardDescription>Customer origins</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="flex items-center gap-2 flex-col px-4 md:px-6">
        {locations.map((location) => (
          <div className="w-full flex flex-col gap-1" key={location.label}>
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground">{location.label}</p>

              <p className="font-mono font-semibold">
                {location.value}

                {" "}

                (
                {location.percentage}
                %)
              </p>
            </div>

            <Progress value={location.percentage} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
