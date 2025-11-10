import type { PreferencesProps } from "./preferences.type";
import type { Component } from "@core-modules/ui-kit/utils";
import { TicketIcon } from "@core-modules/ui-kit/icons";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Progress } from "@core-modules/ui-kit/ui";

export const Preferences: Component<PreferencesProps> = ({ preferences }) => {
  return (
    <Card className="py-4 md:py-6">
      <CardHeader className="flex flex-row gap-3 px-4 md:px-6">
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary/20">
          <TicketIcon size={22} className="text-primary" />
        </div>

        <div className="flex items-start gap-1 flex-col">
          <CardTitle>Tickets types</CardTitle>

          <CardDescription>Purchase preferences</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="flex items-center gap-2 flex-col px-4 md:px-6">
        {preferences.map((preference) => (
          <div className="w-full flex flex-col gap-1" key={preference.label}>
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground">{preference.label}</p>

              <p className="font-mono font-semibold">
                {preference.value}

                {" "}

                (
                {preference.percentage}
                %)
              </p>
            </div>

            <Progress value={preference.percentage} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
