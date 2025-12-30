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
    <SidebarProvider defaultOpen={false}>
      <DashboardSidebar />
      <main className="bg-muted flex min-h-screen w-full flex-col overflow-hidden md:p-2 lg:ps-6">
        <DashboardNavbar />
        <div className="max-lg:mb-14 md:pt-2">{children}</div>
      </main>
      <MobileBottomNav />
    </SidebarProvider>
  );
}
