import type { Component } from "#/utils/react";
import EventDetails from "./_components/event-details/event-details";
import { StatsCards } from "./_components/stats-cards";

const Dashboard: Component = () => {
  return (
    <>
      <EventDetails />

      <StatsCards />
    </>
  );
};

export default Dashboard;
