"use client";

import type { AnimatedTicketIconProps, TicketIconHandle } from "./animated-ticket-icon.type";
import type { Variants } from "motion/react";
import type React from "react";
import type { RefObject } from "react";
import { cn } from "../../../utils";
import { motion, useAnimation } from "motion/react";
import { useCallback, useEffect, useImperativeHandle, useRef } from "react";

const ticketMainVariants: Variants = {
  normal: {
    opacity: 1,
    pathLength: 1,
    transition: {
      duration: 0.4,
      opacity: { duration: 0.1 },
    },
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    transition: {
      duration: 0.6,
      opacity: { duration: 0.1 },
    },
  },
};

const ticketSecondaryVariants: Variants = {
  normal: {
    opacity: 1,
    pathLength: 1,
    pathOffset: 0,
    transition: {
      delay: 0.3,
      duration: 0.3,
      opacity: { duration: 0.1, delay: 0.3 },
    },
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    pathOffset: [1, 0],
    transition: {
      delay: 0.5,
      duration: 0.4,
      opacity: { duration: 0.1, delay: 0.5 },
    },
  },
};

const ticketTertiaryVariants: Variants = {
  normal: {
    opacity: 1,
    pathLength: 1,
    pathOffset: 0,
    transition: {
      delay: 0.6,
      duration: 0.3,
      opacity: { duration: 0.1, delay: 0.6 },
    },
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    pathOffset: [1, 0],
    transition: {
      delay: 0.8,
      duration: 0.4,
      opacity: { duration: 0.1, delay: 0.8 },
    },
  },
};

const AnimatedTicketIcon = ({ ref, onMouseEnter, onMouseLeave, className, size, "data-hovered": hovered, ...props }: AnimatedTicketIconProps & { ref?: RefObject<TicketIconHandle | null> }) => {
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
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isControlledRef.current) {
        void controls.start("animate");
      }
      else {
        onMouseEnter?.(e);
      }
    },
    [controls, onMouseEnter],
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isControlledRef.current) {
        void controls.start("normal");
      }
      else {
        onMouseLeave?.(e);
      }
    },
    [controls, onMouseLeave],
  );

  useEffect(() => {
    if (hovered) {
      void controls.start("animate");

      return;
    }

    void controls.start("normal");
  }, [hovered, controls]);

  return (
    <div className={cn(className)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.path
          d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"
          initial="normal"
          animate={controls}
          variants={ticketMainVariants}
        />
        <motion.path d="M13 5v2" initial="normal" animate={controls} variants={ticketSecondaryVariants} />
        <motion.path d="M13 17v2" initial="normal" animate={controls} variants={ticketTertiaryVariants} />
      </svg>
    </div>
  );
};

AnimatedTicketIcon.displayName = "AnimatedTicketIcon";

export { AnimatedTicketIcon };
