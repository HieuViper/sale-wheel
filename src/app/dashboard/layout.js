import { Toaster } from "react-hot-toast";
import DashboardSidebar from "./(components)/DashboardSidebar";
import DashboardTopNav from "./(components)/DashboardTopNav";
export const metadata = {
  title: "Dashboard Wheel",
  description: "Dashboard Wheel",
};

export default function DashboardLayout({ children }) {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <DashboardSidebar />
      <DashboardTopNav>
        <main className="flex flex-col gap-4 p-4 lg:gap-6 min-h-[cacl(100vh-56px)] w-full">
          {children}
        </main>
      </DashboardTopNav>
      <Toaster position="top-right" />
    </div>
  );
}
