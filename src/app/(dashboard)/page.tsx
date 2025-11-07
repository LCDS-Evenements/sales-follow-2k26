import type { Component } from "#/utils/react";
import { CustomerAnalytics } from "./_components/customer-analytics";
import EventDetails from "./_components/event-details/event-details";
import { RecentActivity } from "./_components/recent-activity";
import { RevenueOverTime } from "./_components/revenue-over-time";
import { StatsCards } from "./_components/stats-cards";
import { Tickets } from "./_components/tickets";
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

      <Tickets />

      <CustomerAnalytics />

      <div className="grid grid-cols-2 gap-4">
        <RecentActivity />
      </div>
    </>
  );
};

export default Dashboard;
