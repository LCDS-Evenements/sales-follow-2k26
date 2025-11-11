import type { HTMLAttributes } from "react";

export type CartIconHandle = {
  startAnimation: () => void;
  stopAnimation: () => void;
};

export type AnimatedCartIconProps = {
  "size"?: number;
  "data-hovered"?: boolean;
} & HTMLAttributes<HTMLDivElement>;
