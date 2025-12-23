import { getTeamStats, getCalls } from "@/lib/mock-data";
import { DashboardClient } from "./dashboard-client";

export default async function DashboardPage() {
  const stats = await getTeamStats();
  const allCalls = await getCalls();
  const recentCalls = allCalls.slice(0, 5);

  return <DashboardClient stats={stats} recentCalls={recentCalls} />;
}

