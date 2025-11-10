import type { StatCardSkeletonProps } from "./stat-card.type";
import type { Component } from "@core-modules/ui-kit/utils";
import { Card, CardAction, CardFooter, CardHeader, Skeleton } from "@core-modules/ui-kit/ui";

export const StatCardSkeleton: Component<StatCardSkeletonProps> = ({ label, icon }) => {
  const CustomIcon = icon;

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary/20">
          <CustomIcon size={22} className="text-primary" />
        </div>

        <CardAction className="flex items-center gap-2">
          <Skeleton className="h-5 w-20" />
        </CardAction>
      </CardHeader>

      <CardFooter className="flex-col items-start gap-1">
        <p className="text-sm text-muted-foreground">{label}</p>

        <Skeleton className="h-9 w-40" />
      </CardFooter>
    </Card>
  );
};
