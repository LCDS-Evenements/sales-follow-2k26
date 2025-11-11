import type { HTMLAttributes } from "react";

export type PlusIconHandle = {
  startAnimation: () => void;
  stopAnimation: () => void;
};

export type AnimatedPlusIconProps = {
  "size"?: number;
  "data-hovered"?: boolean;
} & HTMLAttributes<HTMLDivElement>;
