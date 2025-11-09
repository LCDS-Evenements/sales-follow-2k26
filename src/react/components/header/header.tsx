"use client";

import type { Component } from "#/utils/react";
import { Profile } from "#/react/components/profile";
import { RangePicker } from "#/react/components/range-picker";
import { Badge, Button } from "#/react/ui";
import { BellIcon, DownloadIcon, MenuIcon, MusicIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Header: Component = () => {
  const pathname = usePathname();

  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto py-6 px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex size-10 items-center justify-center rounded-md bg-primary/20">
              <MusicIcon size={20} className="text-primary" />
            </div>

            <Link href="/">
              <h1 className="font-bold">Les CuicuiteDays 2k26</h1>
              <p className="text-sm font-semibold text-muted-foreground">Sales analytics & insights</p>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            {pathname !== "/admin" && (
              <>
                <Button variant="outline" className="relative" size="icon-sm">
                  <BellIcon />

                  <Badge className="absolute -right-1 -top-1 size-4 rounded-full p-0 flex items-center justify-center text-xs font-mono">
                    2
                  </Badge>
                </Button>

                <RangePicker />

                <Button size="sm" className="gap-2 hidden sm:flex">
                  <DownloadIcon />

                  Export data
                </Button>

                <Button variant="outline" size="sm" className="sm:hidden">
                  <MenuIcon />
                </Button>
              </>
            )}

            <Profile className="ml-6" />
          </div>
        </div>
      </div>
    </header>
  );
};
