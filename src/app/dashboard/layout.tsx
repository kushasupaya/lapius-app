// "use client";
import { DashboardSidebar } from "@/components/sections/dashboard/components";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
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
        <main>
          {/* <div className="border-b border-gray-300">
            <div className="p-6">
              <Breadcrumbs items={breadcrumbItems} />
              <h1 className="text-xl font-bold mt-2">{currentPage}</h1>
            </div>
          </div> */}
          <div className="flex flex-1 flex-col gap-4 p-2 bg-gray-100">
            {children}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
