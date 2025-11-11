import type { Component } from "@core-modules/ui-kit/utils";
import { DollarSignIcon } from "@core-modules/ui-kit/icons";
import { Card, CardFooter, CardHeader, CardTitle } from "@core-modules/ui-kit/ui";

export const TotalRevenue: Component = () => {
  return (
    <Card className="py-4 md:py-6">
      <CardHeader className="flex flex-row gap-3 items-center px-4 md:px-6">
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary/20">
          <DollarSignIcon size={22} className="text-primary" />
        </div>

        <CardTitle>Total revenue</CardTitle>
      </CardHeader>

      <CardFooter className="flex-col items-start gap-1 px-4 md:px-6">
        <p className="text-3xl font-bold font-mono text-foreground">395€</p>
      </CardFooter>
    </Card>
  );
};
