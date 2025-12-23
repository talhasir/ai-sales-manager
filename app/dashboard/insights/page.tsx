import { getTeamStats, getCalls } from "@/lib/mock-data";
import { InsightsClient } from "./insights-client";

export default async function TeamInsightsPage() {
  const stats = await getTeamStats();
  const allCalls = await getCalls();

  // Extract common coaching themes from analyzed calls
  const coachingThemes = [
    {
      theme: "Discovery Questions",
      count: 6,
      improvement: "+15%",
      description: "Reps improving at asking deeper discovery questions"
    },
    {
      theme: "Objection Handling",
      count: 4,
      improvement: "-8%",
      description: "Need more practice handling price objections"
    },
    {
      theme: "Rapport Building",
      count: 8,
      improvement: "+22%",
      description: "Strong improvement in building authentic connections"
    },
    {
      theme: "Closing Technique",
      count: 3,
      improvement: "+5%",
      description: "Better at identifying buying signals"
    }
  ];

  // Mock weekly trend data
  const weeklyData = [
    { week: "Week 1", avgScore: 78, calls: 8 },
    { week: "Week 2", avgScore: 82, calls: 10 },
    { week: "Week 3", avgScore: 85, calls: 12 },
    { week: "Week 4", avgScore: 88, calls: 10 }
  ];

  return <InsightsClient stats={stats} weeklyData={weeklyData} coachingThemes={coachingThemes} />;
}

