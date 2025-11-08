import type { Component } from "#/utils/react";
import { TimeRemaining } from "./time-remaining";
import { Card } from "#/react/ui";
import { day } from "#/utils/day";
import { envClient } from "#/utils/env/client";
import { ArrowRightIcon, CalendarIcon, PinIcon } from "lucide-react";
import Link from "next/link";

export const EventDetails: Component = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
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

      <TimeRemaining date={day(envClient.NEXT_PUBLIC_EVENT_DATE).toDate()} />
    </div>
  );
};
