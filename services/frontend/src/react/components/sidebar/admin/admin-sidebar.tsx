"use client";

import type { AdminSidebarProps, AdminTabsTypeElement } from "./admin-sidebar.type";
import type { Component } from "#/utils/react";
import { ADMIN_TABS } from "./admin-sidebar.config";
import { Button } from "#/react/ui";
import { cn } from "../utils/style";
import { XIcon } from "lucide-react";

export const AdminSidebar: Component<AdminSidebarProps> = ({ activeTab, setActiveTab, open, setOpen }) => {
  const handleTabChange = (tab: AdminTabsTypeElement) => {
    setActiveTab(tab);

    setOpen(false);
  };

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/50 md:hidden z-30" onClick={() => setOpen(false)} />}

      <aside
        className={cn(
          "fixed md:static left-0 top-0 h-screen md:top-0 md:h-auto w-64 border-r border-border bg-card transition-transform duration-300 md:translate-x-0 z-40",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <nav className="p-4 space-y-2 flex flex-col">
          <Button variant="outline" className="md:hidden" size="icon" onClick={() => setOpen(false)}>
            <XIcon size={16} />
          </Button>

          {ADMIN_TABS.map((tab) => {
            const Icon = tab.icon;

            return (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "secondary"}
                className="w-full justify-start gap-2"
                onClick={() => handleTabChange(tab.id as AdminTabsTypeElement)}
              >
                <Icon size={16} />

                <span className="truncate">{tab.label}</span>
              </Button>
            );
          })}
        </nav>
      </aside>
    </>
  );
};
