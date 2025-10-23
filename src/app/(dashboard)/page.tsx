import type { Component } from "#/utils/react";
import EventDetails from "./_components/event-details/event-details";
import { RevenueOverTime } from "./_components/revenue-over-time";
import { StatsCards } from "./_components/stats-cards";
import { TopPerformers } from "./_components/top-performers";

const Dashboard: Component = () => {
  return (
    <>
      <EventDetails />

      <StatsCards />

      <div className="grid grid-cols-2 gap-4">
        <RevenueOverTime />

        <TopPerformers />
      </div>
    </>
  );
};

export default Dashboard;
