import type { StatusBadgeProps } from "./status-badge.type";
import type { Component } from "@core-modules/ui-kit/utils";
import { CircleCheckBigIcon, CircleDashedIcon, TicketXIcon } from "@core-modules/ui-kit/icons";
import { Badge } from "@core-modules/ui-kit/ui";

export const StatusBadge: Component<StatusBadgeProps> = ({ status }) => {
  if (status === "completed") {
    return (
      <Badge className="uppercase text-green-700 dark:text-green-300 border-green-700 bg-green-700/10 dark:border-green-300 dark:bg-green-300/10">
        <CircleCheckBigIcon />

        {status}
      </Badge>
    );
  }

  if (status === "pending") {
    return (
      <Badge className="uppercase text-amber-700 dark:text-amber-300 border-amber-700 bg-amber-700/10 dark:border-amber-300 dark:bg-amber-300/10">
        <CircleDashedIcon />

        {status}
      </Badge>
    );
  }

  return (
    <Badge className="uppercase text-red-700 dark:text-red-300 border-red-700 bg-red-700/10 dark:border-red-300 dark:bg-red-300/10">
      <TicketXIcon />

      {status}
    </Badge>
  );
};
