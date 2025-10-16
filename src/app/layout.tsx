import type { Component, PropsWithChildren } from "#/utils/react";
import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "#/react/providers/theme-provider";
import { Toaster } from "#/react/ui";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ticket sales tracking tool",
  description: "Ticket sales tracking tool for our festival, accessible to association members. ",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

const RootLayout: Component<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system">
          <Toaster richColors />

          {children}
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
