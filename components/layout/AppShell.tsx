import Sidebar from "@/components/layout/Sidebar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-bg-main">
      <Sidebar />

      {/* main area */}
      <div className="lg:pl-64">
        {children}
      </div>
    </div>
  );
}
