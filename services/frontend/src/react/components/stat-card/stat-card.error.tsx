import type { StatCardErrorProps } from "./stat-card.type";
import type { Component } from "@core-modules/ui-kit/utils";
import { TriangleAlertIcon, RefreshCwIcon } from "@core-modules/ui-kit/icons";
import { Button, Card, CardAction, CardFooter, CardHeader } from "@core-modules/ui-kit/ui";

export const StatCardError: Component<StatCardErrorProps> = ({ label }) => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <div className="flex size-9 items-center justify-center rounded-lg bg-destructive/20">
          <TriangleAlertIcon size={22} className="text-destructive" />
        </div>

        <CardAction className="flex items-center gap-2">
          <span className="text-sm font-semibold font-mono text-destructive">ERROR</span>
        </CardAction>
      </CardHeader>

      <CardFooter className="flex-col items-start gap-1">
        <p className="text-sm text-muted-foreground">{label}</p>

        <div className="flex items-center justify-between w-full">
          <p className="text-base text-destructive">Failed to load data</p>

          <Button size="sm" variant="outline" className="gap-2">
            <RefreshCwIcon size={14} />

            Retry
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
