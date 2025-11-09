"use client";

import type { Component } from "#/utils/react";
import { Settings } from "./_components/settings";
import { AdminSidebar } from "#/react/components/sidebar";
import { AdminTabsType, type AdminTabsTypeElement } from "#/react/components/sidebar/admin";
import { useState } from "react";

const Admin: Component = () => {
  const [activeTab, setActiveTab] = useState<AdminTabsTypeElement>(AdminTabsType.Settings);

  return (
    <div className="min-h-[calc(100vh-92px)] flex">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 p-8">
        {activeTab === AdminTabsType.Settings && <Settings />}
      </div>
    </div>
  );
};

export default Admin;
