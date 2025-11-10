"use client";

import type { Component } from "@core-modules/ui-kit/utils";
import { APIConfiguration } from "./api-configuration";
import { FestivalInformation } from "./festival-information";

export const Settings: Component = () => {
  return (
    <div>
      <p className="font-semibold text-lg mb-4">Settings</p>

      <div className="grid grid-cols-1 gap-8">

        <APIConfiguration />

        <FestivalInformation />
      </div>
    </div>
  );
};
