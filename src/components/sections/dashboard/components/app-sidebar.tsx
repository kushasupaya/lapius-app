"use client";

import {
  Bell,
  LayoutGrid,
  MessageSquare,
  Calculator,
  LineChart,
  Bot,
  FileText,
  Settings,
  HelpCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  isActive?: boolean;
}

const mainNavItems: NavItem[] = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutGrid,
    isActive: true,
  },
  {
    title: "All Conversations",
    href: "/dashboard/conversations",
    icon: MessageSquare,
    isActive: false,
  },
  {
    title: "Price Tool",
    href: "/dashboard/price-tool",
    icon: Calculator,
    isActive: false,
  },
  {
    title: "Insight",
    href: "/dashboard/insight",
    icon: LineChart,
    isActive: false,
  },
  {
    title: "AI Chatbot",
    href: "/dashboard/chatbot",
    icon: Bot,
    isActive: false,
  },
  {
    title: "Documents",
    href: "/dashboard/documents",
    icon: FileText,
    isActive: false,
  },
];

const favoriteItems = [
  { title: "Fusce non enim non tortor...", color: "bg-purple-500" },
  { title: "Fusce non enim non tortor...", color: "bg-pink-500" },
  { title: "Fusce non enim non tortor...", color: "bg-cyan-500" },
  { title: "Fusce non enim non tortor...", color: "bg-red-500" },
];

export function DashboardSidebar() {
  return (
    <Sidebar className="border-r-0 bg-[#11180C]">
      <SidebarHeader className="border-b border-muted/10 px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo/logo.svg"
              alt="Lapius Logo"
              width={120}
              height={24}
              className="rounded-sm"
            />
            {/* <span className="text-lg font-semibold text-white">LAPIUS</span> */}
          </Link>
          <div className="rounded-full border-muted-foreground border p-1">
            <Bell className="h-5 w-5  text-white " />
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 text-xs font-semibold text-muted-foreground ">
            MAIN
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "gap-2 text-white hover:bg-muted/5 hover:text-muted-foreground",
                      item.isActive &&
                        "bg-muted/5 rounded-lg  border-muted-foreground border"
                    )}
                  >
                    <Link href={item.href}>
                      <item.icon
                        className={cn(
                          "h-5 w-5",
                          item.isActive && "text-[#ACDB88]"
                        )}
                      />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-8">
          <SidebarGroupLabel className="px-2 text-xs font-semibold text-muted-foreground">
            FAVORITES
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {favoriteItems.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton
                    asChild
                    className="gap-2 hover:text-muted-foreground hover:bg-muted/5 text-white"
                  >
                    <Link href="#">
                      <div className={cn("h-2 w-2 rounded-full", item.color)} />
                      <span className="truncate">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="mt-auto border-t border-muted/10 px-4 py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="gap-2 hover:text-muted-foreground hover:bg-muted/5 text-white"
            >
              <Link href="/settings">
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="gap-2 hover:text-muted-foreground hover:bg-muted/5 text-white"
            >
              <Link href="/help">
                <HelpCircle className="h-5 w-5" />
                <span>Help & Support</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="mt-4 gap-2 text-muted-foreground hover:bg-muted/5 hover:text-white"
            >
              <Link href="/profile" className="flex items-center">
                <Image
                  src="/logo/lapius.svg"
                  alt="Profile"
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                <div className="ml-2 flex flex-col text-white">
                  <span className="text-sm font-medium">Jacopo Cirica</span>
                  <span className="text-xs text-muted-foreground">
                    jacopo@gmail...
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
