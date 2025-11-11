import type { HTMLAttributes } from "react";

export type TicketIconHandle = {
  startAnimation: () => void;
  stopAnimation: () => void;
};

export type AnimatedTicketIconProps = {
  "size"?: number;
  "data-hovered": boolean;
} & HTMLAttributes<HTMLDivElement>;
