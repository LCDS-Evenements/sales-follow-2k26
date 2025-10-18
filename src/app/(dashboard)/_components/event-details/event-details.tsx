"use client";

import type { TimeRemaining } from "./event-details.type";
import type { Component } from "#/utils/react";
import { Card } from "#/react/ui";
import { day } from "#/utils/day";
import { ArrowRightIcon, CalendarIcon, ClockIcon, PinIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const EventDetails: Component = () => {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeRemaining = () => {
      // Get the current date:
      const now = day();

      // Set the event date:
      const eventDate = day("2026-06-12");

      // Get the difference between the current date and the event date in seconds:
      const diff = eventDate.diff(now, "second");

      if (diff <= 0) {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
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

  return (
    <div className="grid grid-cols-3 gap-2">
      <Card className="p-0 rounded-lg px-2 py-1.5">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-md bg-primary/20">
              <CalendarIcon size={16} className="text-primary" />
            </div>

            <p className="text-sm font-semibold">Date</p>
          </div>

          <div className="flex items-center gap-1">
            <p className="text-sm font-semibold">{day("2026-06-12").format("D MMMM YYYY")}</p>

            <ArrowRightIcon size={14} className="text-muted-foreground" />

            <p className="text-sm font-semibold">{day("2026-06-13").format("D MMMM YYYY")}</p>
          </div>
        </div>
      </Card>

      <Card className="p-0 rounded-lg px-2 py-1.5">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-md bg-primary/20">
              <PinIcon size={16} className="text-primary" />
            </div>

            <p className="text-sm font-semibold">Location</p>
          </div>

          <Link
            href="https://www.google.com/maps/place/Les+Cuicuite+Days/@46.9135184,-0.4306296,766m/data=!3m2!1e3!4b1!4m6!3m5!1s0x4807a59fadc70f57:0xf219041b3e9c10c7!8m2!3d46.9135184!4d-0.4280547!16s%2Fg%2F11stpt67_q?entry=ttu&g_ep=EgoyMDI1MTAxNC4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
          >
            <p className="text-sm font-semibold underline">Champ du Moulin, Noirlieu, 79300</p>
          </Link>
        </div>
      </Card>

      <Card className="p-0 rounded-lg px-2 py-1.5">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-md bg-primary/20">
              <ClockIcon size={16} className="text-primary" />
            </div>

            <p className="text-sm font-semibold">Time remaining</p>
          </div>

          <div className="flex items-center gap-1.5">
            <div className="flex items-center justify-center flex-col gap-0.5 bg-primary/10 border py-1 px-2 rounded-md">
              <p className="text-sm font-semibold font-mono">{timeRemaining.days}</p>

              <p className="text-xs text-foreground">DAYS</p>
            </div>

            <div className="flex items-center justify-center flex-col gap-0.5 bg-primary/10 border py-1 px-2 rounded-md">
              <p className="text-sm font-semibold font-mono">{timeRemaining.hours}</p>

              <p className="text-xs text-foreground">HRS</p>
            </div>

            <div className="flex items-center justify-center flex-col gap-0.5 bg-primary/10 border py-1 px-2 rounded-md">
              <p className="text-sm font-semibold font-mono">{timeRemaining.minutes}</p>

              <p className="text-xs text-foreground">MINS</p>
            </div>

            <div className="flex items-center justify-center flex-col gap-0.5 bg-primary/10 border py-1 px-2 rounded-md">
              <p className="text-sm font-semibold font-mono">{timeRemaining.seconds}</p>

              <p className="text-xs text-foreground">SECS</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EventDetails;
