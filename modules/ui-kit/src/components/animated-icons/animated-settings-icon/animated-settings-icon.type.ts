import type { HTMLAttributes } from "react";

export type SettingsGearIconHandle = {
  startAnimation: () => void;
  stopAnimation: () => void;
};

export type AnimatedSettingsIconProps = {
  "size"?: number;
  "data-hovered"?: boolean;
} & HTMLAttributes<HTMLDivElement>;
