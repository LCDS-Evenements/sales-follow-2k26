import { SettingsIcon, ShoppingCartIcon, TagIcon, TicketIcon, UsersIcon } from "lucide-react";

export const ADMIN_TABS = [
  { id: "settings", label: "Settings", icon: SettingsIcon },
  { id: "members", label: "Members", icon: UsersIcon },
  { id: "purchases", label: "Purchases", icon: ShoppingCartIcon },
  { id: "categories", label: "Ticket categories", icon: TagIcon },
  { id: "tickets", label: "Tickets", icon: TicketIcon },
];
