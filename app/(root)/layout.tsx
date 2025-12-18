import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import MobileBottomNav from "@/components/dashboard/MobileBottomNav";

type Props = {
  children: ReactNode;
};
export default function DashboardLayout({ children }: Props) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="flex min-h-screen overflow-hidden w-full flex-col md:p-2 lg:ps-6 bg-muted">
        <DashboardNavbar />
        <div className="md:pt-2 mb-14">{children}</div>
      </main>
      <MobileBottomNav />
    </SidebarProvider>
  );
}
