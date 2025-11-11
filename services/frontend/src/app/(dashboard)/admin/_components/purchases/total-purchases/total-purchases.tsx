import type { Component } from "@core-modules/ui-kit/utils";
import { PackageIcon } from "@core-modules/ui-kit/icons";
import { Card, CardFooter, CardHeader, CardTitle } from "@core-modules/ui-kit/ui";

export const TotalPurchases: Component = () => {
  return (
    <Card className="py-4 md:py-6">
      <CardHeader className="flex flex-row gap-3 items-center px-4 md:px-6">
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary/20">
          <PackageIcon size={22} className="text-primary" />
        </div>

        <CardTitle>Total purchases</CardTitle>
      </CardHeader>

      <CardFooter className="flex-col items-start gap-1 px-4 md:px-6">
        <p className="text-3xl font-bold font-mono text-foreground">4</p>
      </CardFooter>
    </Card>
  );
};
