"use client";

import {
  Bell,
  LayoutGrid,
  MessageSquare,
  PiggyBank,
  LineChart,
  BookCheck,
  Bot,
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
import { usePathname } from "next/navigation";
import SettingsDialog from "./settings/settings";
import { useEffect, useState } from "react";

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
  },
  // {
  //   title: "All Conversations",
  //   href: "/dashboard/conversations",
  //   icon: MessageSquare,
  // },
  {
    title: "Price Tool",
    href: "/dashboard/price-tool",
    icon: PiggyBank,
  },
  {
    title: "Insight",
    href: "/dashboard/insight",
    icon: LineChart,
  },
  {
    title: "AI Chatbot",
    href: "/dashboard/chatbot",
    icon: Bot,
  },
  {
    title: "Cost Estimator",
    href: "/dashboard/cost-estimator",
    icon: BookCheck,
  },
];

const favoriteItems = [
  // { title: "Fusce non enim non tortor...", color: "bg-purple-500" },
  //   { title: "Fusce non enim non tortor...", color: "bg-pink-500" },
  //   { title: "Fusce non enim non tortor...", color: "bg-cyan-500" },
  //   { title: "Fusce non enim non tortor...", color: "bg-red-500" },
];

const DashboardSidebar = () => {
  const pathname = usePathname();

  const [userData, setUserData] = useState<{
    firstName: string;
    lastName: string;
    email: string;
  }>({
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    // Access localStorage safely on the client-side
    const data = localStorage.getItem("user");
    if (data) {
      setUserData(JSON.parse(data));
    }
  }, []);

  const { firstName, lastName, email } = userData;

  return (
    <Sidebar className="border-r-0 ">
      <SidebarHeader className=" px-8 py-4 bg-[#]">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo/logo.svg"
              alt="Lapius Logo"
              width={80}
              height={16}
              className="rounded-sm"
            />
            {/* <span className="text-lg font-semibold text-white">LAPIUS</span> */}
          </Link>
          <div className="rounded-full p-2">
            <Bell className="h-4 w-4  text-white " />
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 text-xs font-semibold text-teal-700 ">
            MAIN
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        "gap-2 text-green-100 text-sm leading-5 font-medium hover:bg-muted/5 hover:bg-teal-900 py-5 px-4",
                        isActive &&
                          "text-sm text-white leading-5 font-medium rounded-lg bg-teal-800 py-5 px-4"
                      )}
                    >
                      <Link href={item.href}>
                        <item.icon
                          className={cn("h-5 w-5", isActive && "text-lime-300")}
                        />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* <SidebarGroup className="mt-8">
          <SidebarGroupLabel className="px-2 text-xs font-semibold text-teal-700 ">
            FAVORITES
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {favoriteItems.length > 0 &&
                favoriteItems?.map((item, index) => (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton
                      asChild
                      className="gap-2 text-green-100 text-sm leading-5 font-medium  hover:white hover:bg-muted/5"
                    >
                      <Link href="#">
                        <div
                          className={cn("h-2 w-2 rounded-full", item.color)}
                        />
                        <span className="truncate">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup> */}
      </SidebarContent>

      <SidebarFooter className="mt-auto px-4 py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="gap-2 text-green-100 text-sm leading-5 font-medium hover:bg-muted/5 hover:bg-teal-900 py-5 px-4"
            >
              <SettingsDialog />
              {/* <Link href="/settings">
              <Settings className="h-5 w-5" />
                <span>Settings</span>
              </Link> */}
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="gap-2 text-green-100 text-sm leading-5 font-medium hover:bg-muted/5 hover:bg-teal-900 py-5 px-4"
            >
              <Link href="/dashboard/help">
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
              <Link href="/dashboard/profile" className="flex items-center">
                <Image
                  src="/logo/lapius.svg"
                  alt="Profile"
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                <div className="ml-2 flex flex-col text-white">
                  <span className="text-sm font-medium">
                    {firstName} {lastName}
                  </span>
                  <span className="text-xs text-muted-foreground text-ellipsis overflow-hidden ">
                    {email}
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
