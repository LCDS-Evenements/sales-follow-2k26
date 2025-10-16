"use client";

import type { ProfileProps } from "./profile.type";
import type { Component } from "#/utils/react";
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "#/react/ui";
import { LogOutIcon, MonitorIcon, MoonIcon, SettingsIcon, SunIcon, SwatchBookIcon } from "lucide-react";
import { useTheme } from "next-themes";

export const Profile: Component<ProfileProps> = ({ className }) => {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className={className}>
          <AvatarImage src="https://github.com/shadcn.png" />

          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">

        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />

              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">Hugo CAMPOS</span>

              <span className="truncate text-xs">hcampospro@gmail.com</span>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup className="*:cursor-pointer">
          <DropdownMenuItem>
            <SettingsIcon />

            Settings
          </DropdownMenuItem>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <SwatchBookIcon />

              Theme
            </DropdownMenuSubTrigger>

            <DropdownMenuSubContent>
              <DropdownMenuGroup className="*:cursor-pointer">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  <SunIcon />

                  Light
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  <MoonIcon />

                  Dark
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => setTheme("system")}>
                  <MonitorIcon />

                  System
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem variant="destructive">
          <LogOutIcon />

          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
