"use client";

import type { NotificationProps } from "./notification/notification.type";
import type { Component } from "#/utils/react";
import { Notification } from "./notification";
import { Badge, Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "#/react/ui";
import { day } from "#/utils/day";
import { BellIcon, RadioIcon } from "lucide-react";
import { useEffect, useState } from "react";

const samples: NotificationProps[] = [
  {
    label: "Regular - Pass Samedi",
    type: "sold",
    ago: day("2025-08-04 09:25").toDate(),
  },
  {
    label: "Regular - Pass Samedi",
    type: "limited-stock",
    ago: day("2025-08-06 09:25").toDate(),
  },
  {
    label: 5000,
    type: "reached",
    ago: day("2025-08-06 09:25").toDate(),
  },
];

export const LiveNotifications: Component = () => {
  const [notifications, setNotifications] = useState<NotificationProps[]>(samples);

  useEffect(() => {
    const interval = setInterval(() => {
      const tickets = [
        "Early - Pass Vendredi",
        "Early - Pass Samedi",
        "Early - Pass 2 jours",
        "Regular - Pass Vendredi",
        "Regular - Pass Samedi",
        "Regular - Pass 2 jours",
        "Late - Pass Vendredi",
        "Late - Pass Samedi",
        "Late - Pass 2 jours",
      ];

      const newNotification: NotificationProps = {
        type: "sold",
        label: tickets[Math.floor(Math.random() * tickets.length)],
        ago: day().toDate(),
      };

      setNotifications((prev) => [newNotification, ...prev.slice(0, 9)]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary/20">
            <BellIcon size={22} className="text-primary" />
          </div>

          <div className="flex items-start gap-1 flex-col">
            <CardTitle>Live notifications</CardTitle>

            <CardDescription>Real-time sales updates</CardDescription>
          </div>
        </div>

        <CardAction>
          <Badge className="text-green-700 dark:text-green-300 border-green-700 bg-green-700/10 dark:border-green-300 dark:bg-green-300/10">
            <RadioIcon />

            Live
          </Badge>
        </CardAction>
      </CardHeader>

      <CardContent className="flex flex-col gap-2 max-h-[450px] overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {notifications.map((notification) => (
          <Notification key={Math.random().toString(36).substring(2, 11)} ago={notification.ago} label={notification.label} type={notification.type} />
        ))}
      </CardContent>
    </Card>
  );
};
