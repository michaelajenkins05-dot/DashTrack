import { Header } from "@/components/dashboard/header";
import { DashboardGrid } from "@/components/dashboard/dashboard-grid";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-slate-900 to-slate-800">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <DashboardGrid />
      </main>
    </div>
  );
}
