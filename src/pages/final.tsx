import DashboardHeader from "@/components/navbar/dashboard-header";
import SidebarDashboard from "@/components/sidebar/dashboard-sidebar";
import { ReactNode } from "react";

export default function Dashboard({ children }: { children: ReactNode }) {
  return (
    <div
      className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] font-custom font-bold"
      dir="rtl"
    >
      <SidebarDashboard></SidebarDashboard>
      <div className="flex flex-col">
        <DashboardHeader />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
