"use client";
import { DashboardSidebar } from "@/components/sections/dashboard/components";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useAuthRedirect } from "@/utils/authRedirect";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }: { children: React.ReactNode }) {
  // const isAuthenticated = useAuthRedirect(true); // Automatically redirect if not authenticated
  // const [hydrated, setHydrated] = useState(false);

  // useEffect(() => {
  //   setHydrated(true);
  // }, []);

  // // // Prevent rendering until hydrated to avoid HTML mismatch
  // if (!hydrated) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       Loading...
  //     </div>
  //   );
  // }

  // if (!isAuthenticated) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       Redirecting...
  //     </div>
  //   );
  // }

  // Breadcrumbs part
  //   const pathname = usePathname() || "";
  //   const segments = pathname.split("/").filter(Boolean);

  //   const breadcrumbSegments =
  //     segments[0] === "dashboard" ? segments.slice(1) : segments;

  //   const breadcrumbItems = breadcrumbSegments.map((segment, index) => {
  //     const href =
  //       "/dashboard/" + breadcrumbSegments.slice(0, index + 1).join("/");
  //     return {
  //       label: segment.charAt(0).toUpperCase() + segment.slice(1),
  //       href,
  //     };
  //   });

  //   const currentPage =
  //     breadcrumbSegments[breadcrumbSegments.length - 1] || "Dashboard";
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <header className="sticky top-0 flex md:hidden  h-14 shrink-0 items-center gap-2 bg-background">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger className="-ml-1" />
          </div>
        </header>
        <main
          className={`${inter.className} flex flex-col h-screen overflow-auto bg-gray-100`}
        >
          {/* <div className="border-b border-gray-300">
            <div className="p-6">
              <Breadcrumbs items={breadcrumbItems} />
              <h1 className="text-xl font-bold mt-2">{currentPage}</h1>
            </div>
          </div> */}
          <div className="flex flex-1 flex-col gap-4 p-2 ">{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
