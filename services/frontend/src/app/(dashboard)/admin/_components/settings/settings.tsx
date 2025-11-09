"use client";

import type { Component } from "#/utils/react";
import { APIConfiguration } from "./api-configuration";
import { FestivalInformation } from "./festival-information";

export const Settings: Component = () => {
  return (
    <div className="grid grid-cols-1 gap-8">
      <APIConfiguration />

      <FestivalInformation />
    </div>
  );
};
