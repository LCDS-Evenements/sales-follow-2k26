"use client";

/**
 *
 * Based on icons on this website
 * @url https://icons.pqoqubbw.dev/?q=plus
*
*/

import type { AnimatedPlusIconProps, PlusIconHandle } from "./animated-plus-icon.type";
import type { MouseEvent, RefObject } from "react";
import { cn } from "@core-modules/ui-kit/utils";
import { motion, useAnimation } from "motion/react";
import { useCallback, useEffect, useImperativeHandle, useRef } from "react";

export const AnimatedPlusIcon = ({ ref, onMouseEnter, onMouseLeave, className, size, "data-hovered": hovered, ...props }: AnimatedPlusIconProps & { ref?: RefObject<PlusIconHandle | null> }) => {
  const controls = useAnimation();
  const isControlledRef = useRef(false);

  useImperativeHandle(ref, () => {
    isControlledRef.current = true;

    return {
      startAnimation: () => void controls.start("animate"),
      stopAnimation: () => void controls.start("normal"),
    };
  });

  const handleMouseEnter = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!isControlledRef.current) {
        void controls.start("animate");

        return;
      }

      onMouseEnter?.(e);
    },
    [controls, onMouseEnter],
  );

  const handleMouseLeave = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!isControlledRef.current) {
        void controls.start("normal");

        return;
      }

      onMouseLeave?.(e);
    },
    [controls, onMouseLeave],
  );

  useEffect(() => {
    if (hovered) {
      void controls.start("animate");

      return;
    }

    void controls.start("normal");
  }, [hovered]);

  return (
    <div className={cn(className)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} {...props}>
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={controls}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        variants={{ normal: { rotate: 0 }, animate: { rotate: 180 } }}
      >
        <path d="M5 12h14" />

        <path d="M12 5v14" />
      </motion.svg>
    </div>
  );
};

AnimatedPlusIcon.displayName = "AnimatedPlusIcon";
