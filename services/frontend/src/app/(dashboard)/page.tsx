import type { Component } from "@core-modules/ui-kit/utils";
import { CustomerAnalytics } from "./_components/customer-analytics";
import { EventDetails } from "./_components/event-details";
import { LiveNotifications } from "./_components/live-notifications";
import { RecentActivity } from "./_components/recent-activity";
import { RevenueOverTime } from "./_components/revenue-over-time";
import { StatsCards } from "./_components/stats-cards";
import { Tickets } from "./_components/tickets";
import { TopPerformers } from "./_components/top-performers";

const Dashboard: Component = () => {
  return (
    <div className="container mx-auto py-4 space-y-8 px-4">
      <EventDetails />

      <StatsCards />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <RevenueOverTime />

        <TopPerformers />
      </div>

      <Tickets />

      <CustomerAnalytics />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <RecentActivity />

        <LiveNotifications />
      </div>
    </div>
  );
};

export default Dashboard;
