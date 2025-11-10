import type { AgesProps } from "./ages.type";
import type { Component } from "@core-modules/ui-kit/utils";
import { UsersIcon } from "@core-modules/ui-kit/icons";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Progress } from "@core-modules/ui-kit/ui";

export const Ages: Component<AgesProps> = ({ ages }) => {
  return (
    <Card className="py-4 md:py-6">
      <CardHeader className="flex flex-row gap-3 px-4 md:px-6">
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary/20">
          <UsersIcon size={22} className="text-primary" />
        </div>

        <div className="flex items-start gap-1 flex-col">
          <CardTitle>Age groups</CardTitle>

          <CardDescription>Customer demographics</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="flex items-center gap-2 flex-col px-4 md:px-6">
        {ages.map((age) => (
          <div className="w-full flex flex-col gap-1" key={age.label}>
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground">{age.label}</p>

              <p className="font-mono font-semibold">
                {age.value}

                {" "}

                (
                {age.percentage}
                %)
              </p>
            </div>

            <Progress value={age.percentage} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
