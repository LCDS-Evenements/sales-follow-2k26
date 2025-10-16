import type { Component, PropsWithChildren } from "#/utils/react";
import { Header } from "#/react/components/header";

const DashboardLayout: Component<PropsWithChildren> = ({ children }) => {
  return (
    <main className="min-h-screen font-one">
      <Header />
      {children}
    </main>
  );
};

export default DashboardLayout;
