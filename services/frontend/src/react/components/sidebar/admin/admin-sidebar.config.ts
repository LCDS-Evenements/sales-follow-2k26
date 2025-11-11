import { AnimatedCartIcon, AnimatedSettingsIcon, AnimatedUsersIcon, AnimatedBookmarkIcon, AnimatedTicketIcon } from "@core-modules/ui-kit/components";

export const ADMIN_TABS = [
  { id: "settings", label: "Settings", icon: AnimatedSettingsIcon },
  { id: "members", label: "Members", icon: AnimatedUsersIcon },
  { id: "purchases", label: "Purchases", icon: AnimatedCartIcon },
  { id: "categories", label: "Ticket categories", icon: AnimatedBookmarkIcon },
  { id: "tickets", label: "Tickets", icon: AnimatedTicketIcon },
];
