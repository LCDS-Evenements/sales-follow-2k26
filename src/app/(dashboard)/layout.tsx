import type { Component, PropsWithChildren } from "#/utils/react";
import { Header } from "#/react/components/header";

const DashboardLayout: Component<PropsWithChildren> = ({ children }) => {
  return (
    <main className="min-h-screen font-one">
      <Header />

      <div className="container mx-auto py-4 space-y-8 px-8">
        {children}
      </div>
    </main>
  );
};

export default DashboardLayout;
