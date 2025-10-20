"use client";

import type { StateType, TimeRemainingProps, TimeRemainingType } from "./time-remaining.type";
import type { Component } from "#/utils/react";
import { Card } from "#/react/ui";
import { day } from "#/utils/day";
import { ClockIcon } from "lucide-react";
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
  }, []);

  if (state === "after") return (
    <>after</>
  );

  if (state === "live") return (
    <>live</>
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
          <div className="flex items-center justify-center flex-col bg-background border py-1 px-2 rounded-md">
            <p className="text-xs font-semibold font-mono">{timeRemaining.days}</p>

            <p className="text-xs text-foreground">DAYS</p>
          </div>

          <div className="flex items-center justify-center flex-col bg-background border py-1 px-2 rounded-md">
            <p className="text-xs font-semibold font-mono">{timeRemaining.hours}</p>

            <p className="text-xs text-foreground">HRS</p>
          </div>

          <div className="flex items-center justify-center flex-col bg-background border py-1 px-2 rounded-md">
            <p className="text-xs font-semibold font-mono">{timeRemaining.minutes}</p>

            <p className="text-xs text-foreground">MINS</p>
          </div>

          <div className="flex items-center justify-center flex-col bg-background border py-1 px-2 rounded-md">
            <p className="text-xs font-semibold font-mono">{timeRemaining.seconds}</p>

            <p className="text-xs text-foreground">SECS</p>
          </div>
        </div>
      </div>
    </Card>
  );
};
