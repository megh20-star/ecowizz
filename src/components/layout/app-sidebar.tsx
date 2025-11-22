

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  BarChart,
  Lightbulb,
  Trophy,
  Settings,
  Leaf,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  useSidebar
} from "@/components/ui/sidebar";
import { Button } from "../ui/button";

const menuItems = [
  {
    href: "/",
    label: "Dashboard",
    icon: BarChart,
  },
  {
    href: "/reminders",
    label: "Reminders",
    icon: Bell,
  },
  {
    href: "/tips",
    label: "Saving Tips",
    icon: Lightbulb,
  },
  {
    href: "/competition",
    label: "Competition",
    icon: Trophy,
  },
  {
    href: "/settings",
    label: "Settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { collapsed } = useSidebar();

  return (
    <Sidebar className="border-r">
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Leaf className="h-8 w-8 text-primary" />
          {!collapsed && <h1 className="text-xl font-bold text-primary">Eco Wizz</h1>}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <Link href={item.href} >
                <SidebarMenuButton
                  isActive={pathname === item.href}
                >
                  <item.icon className="mr-2 h-5 w-5" />
                  {!collapsed && item.label}
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      {!collapsed && <SidebarFooter>
        <div className="rounded-lg bg-accent p-4 text-center text-accent-foreground">
          <h3 className="font-bold">Go Premium!</h3>
          <p className="text-sm mt-2">Unlock more features and track your progress with more detail.</p>
          <Button size="sm" className="mt-4 w-full">Upgrade</Button>
        </div>
      </SidebarFooter>}
    </Sidebar>
  );
}
