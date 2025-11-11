"use client";

import type { StateType, TimeRemainingProps, TimeRemainingType } from "./time-remaining.type";
import type { Component } from "@core-modules/ui-kit/utils";
import { CheckIcon, ClockIcon, PartyPopperIcon } from "@core-modules/ui-kit/icons";
import { Card } from "@core-modules/ui-kit/ui";
import { range } from "@core-packages/effect";
import { day } from "#/utils/day";
import { useEffect, useState } from "react";

export const TimeRemaining: Component<TimeRemainingProps> = ({ date }) => {
  const [state, setState] = useState<StateType>("before");

  const [timeRemaining, setTimeRemaining] = useState<TimeRemainingType>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeRemaining = () => {
      // Get the current date:
      const now = day();

      const eventDate = day(date);

      // Get the difference between the current date and the event date in seconds:
      const diff = eventDate.diff(now, "second");

      if (diff <= 0) {
        if (now.isSame(eventDate, "day") || now.isSame(eventDate.add(1, "day"), "day")) {
          setState("live");

          return;
        }

        setState("after");

        return;
      }

      // Set the units into each const:
      const days = Math.floor(diff / (24 * 60 * 60));
      const hours = Math.floor((diff % (24 * 60 * 60)) / (60 * 60));
      const minutes = Math.floor((diff % (60 * 60)) / 60);
      const seconds = diff % 60;

      setTimeRemaining({ days, hours, minutes, seconds });
    };

    // Execute function:
    calculateTimeRemaining();

    // Exectute the function with interval each seconds:
    const interval = setInterval(calculateTimeRemaining, 1000);

    // Then clear the interval:
    return () => clearInterval(interval);
  }, [date]);

  if (state === "after") return (
    <Card className="p-0 rounded-lg px-2 py-1.5 border-dashed border-amber-200 bg-amber-500/10 relative overflow-hidden">
      <div className="flex items-center justify-between h-full">
        <div className="flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-md bg-amber-500/20">
            <CheckIcon size={16} className="text-amber-500" />
          </div>

          <p className="text-sm font-semibold">Event ended</p>
        </div>

        <div className="text-right">
          <p className="text-xs font-mono text-amber-500 uppercase tracking-wider">ENDED</p>
        </div>
      </div>

      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-2 right-2 w-20 h-20 rounded-full bg-muted-foreground blur-xl" />
        <div className="absolute bottom-2 left-2 w-16 h-16 rounded-full bg-muted-foreground blur-xl" />
      </div>
    </Card>
  );

  if (state === "live") return (
    <Card className="p-0 rounded-lg px-2 py-1.5 border-green-700 bg-green-700/10 dark:border-green-300 dark:bg-green-300/10 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {range(20).map((index) => (
          <div
            key={index}
            className="absolute w-2 h-2 rounded-full animate-confetti-fall"
            style={{
              left: `${String(Math.random() * 100)}%`,
              animationDelay: `${String(Math.random() * 3)}s`,
              animationDuration: `${String(2 + Math.random() * 2)}s`,
              backgroundColor: ["#ef4444", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6", "#ec4899"][Math.floor(Math.random() * 6)],
            }}
          />
        ))}
      </div>

      <div className="flex items-center justify-between h-full">
        <div className="flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-md bg-green-700/20 dark:bg-green-300/20">
            <PartyPopperIcon size={16} className="text-green-700 dark:text-green-300" />
          </div>

          <p className="text-sm font-semibold">Event is LIVE</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex items-center">
            <div className="size-2 rounded-full bg-green-700 dark:bg-green-300 animate-ping absolute" />

            <div className="size-2 rounded-full bg-green-700 dark:bg-green-300 relative" />
          </div>

          <p className="text-xs font-mono text-green-700 dark:text-green-300 uppercase tracking-wider">LIVE NOW</p>
        </div>
      </div>

      <div className="absolute inset-0 bg-linear-to-r from-transparent via-green-700/20 dark:via-green-300/20 to-transparent animate-shimmer" />
    </Card>
  );

  return (
    <Card className="p-0 rounded-lg px-2 py-1.5">
      <div className="flex items-center justify-between h-full">
        <div className="flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-md bg-primary/20">
            <ClockIcon size={16} className="text-primary" />
          </div>

          <p className="text-sm font-semibold">Time remaining</p>
        </div>

        <div className="flex items-center gap-1">
          <div className="flex items-center justify-center flex-col bg-background border py-1 px-1 sm:px-2 rounded-md">
            <p className="text-xs font-semibold font-mono">{timeRemaining.days}</p>

            <p className="text-xs text-foreground">DAYS</p>
          </div>

          <div className="flex items-center justify-center flex-col bg-background border py-1 px-1 sm:px-2 rounded-md">
            <p className="text-xs font-semibold font-mono">{timeRemaining.hours}</p>

            <p className="text-xs text-foreground">HRS</p>
          </div>

          <div className="flex items-center justify-center flex-col bg-background border py-1 px-1 sm:px-2 rounded-md">
            <p className="text-xs font-semibold font-mono">{timeRemaining.minutes}</p>

            <p className="text-xs text-foreground">MINS</p>
          </div>

          <div className="flex items-center justify-center flex-col bg-background border py-1 px-1 sm:px-2 rounded-md">
            <p className="text-xs font-semibold font-mono">{timeRemaining.seconds}</p>

            <p className="text-xs text-foreground">SECS</p>
          </div>
        </div>
      </div>
    </Card>
  );
};
