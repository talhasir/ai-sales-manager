"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, 
  TrendingUp, 
  Trophy, 
  Calendar 
} from "lucide-react";
import { SalesCall } from "@/lib/mock-data";
import Link from "next/link";
import { cn } from "@/lib/utils";

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 }
};

interface DashboardClientProps {
  stats: {
    totalCalls: number;
    avgScore: number;
    topPerformer: string;
    callsThisWeek: number;
    repPerformance: Array<{
      name: string;
      avgScore: number;
      callCount: number;
    }>;
  };
  recentCalls: SalesCall[];
}

export function DashboardClient({ stats, recentCalls }: DashboardClientProps) {
  const kpis = [
    {
      title: "Total Calls",
      value: stats.totalCalls,
      icon: Phone,
      color: "text-blue-500"
    },
    {
      title: "Avg Score",
      value: stats.avgScore,
      icon: TrendingUp,
      color: "text-success",
      suffix: "/100"
    },
    {
      title: "Top Performer",
      value: stats.topPerformer,
      icon: Trophy,
      color: "text-warning"
    },
    {
      title: "Calls This Week",
      value: stats.callsThisWeek,
      icon: Calendar,
      color: "text-purple-500"
    }
  ];

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={staggerContainer}
      className="space-y-4 sm:space-y-6"
    >
      <motion.div variants={fadeInUp}>
        <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
        <p className="text-sm sm:text-base text-gray-400 mt-1">Welcome back! Here's your sales performance overview.</p>
      </motion.div>

      {/* KPI Cards */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
        variants={staggerContainer}
      >
        {kpis.map((kpi) => (
          <motion.div key={kpi.title} variants={fadeInUp}>
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">
                  {kpi.title}
                </CardTitle>
                <kpi.icon className={cn("h-4 w-4", kpi.color)} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {kpi.value}{kpi.suffix}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Recent Calls Table */}
      <motion.div variants={fadeInUp}>
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle>Recent Calls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 sm:space-y-3">
              {recentCalls.map((call) => (
                <Link 
                  key={call.id} 
                  href={`/dashboard/calls/${call.id}`}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 rounded-lg hover:bg-zinc-800 transition-colors gap-2 sm:gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <div className="min-w-0 flex-1">
                        <p className="font-medium truncate">{call.repName}</p>
                        <p className="text-xs sm:text-sm text-gray-400 truncate">
                          {call.prospectName} · {call.prospectCompany}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
                    <div className="text-left sm:text-right">
                      <p className="text-xs sm:text-sm text-gray-400">
                        {new Date(call.date).toLocaleDateString()}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500">{call.duration}</p>
                    </div>
                    {call.analysis && (
                      <Badge 
                        className={cn(
                          "shrink-0",
                          call.analysis.score >= 85 
                            ? "bg-success/20 text-success hover:bg-success/30" 
                            : call.analysis.score >= 70
                            ? "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
                            : "bg-warning/20 text-warning hover:bg-warning/30"
                        )}
                      >
                        {call.analysis.score}
                      </Badge>
                    )}
                  </div>
                </Link>
              ))}
            </div>
            <Link 
              href="/dashboard/calls"
              className="block mt-4 text-center text-sm text-success hover:text-success/80 transition-colors"
            >
              View all calls →
            </Link>
          </CardContent>
        </Card>
      </motion.div>

      {/* Team Performance Chart */}
      <motion.div variants={fadeInUp}>
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle>Team Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {stats.repPerformance.map((rep, index) => (
                <div key={rep.name} className="flex items-center gap-2 sm:gap-4">
                  <div className="w-6 sm:w-8 text-center text-gray-400 font-medium text-sm sm:text-base shrink-0">
                    #{index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1 gap-1">
                      <span className="font-medium text-sm sm:text-base truncate">{rep.name}</span>
                      <span className="text-xs sm:text-sm text-gray-400 shrink-0">
                        {rep.callCount} calls · Avg {rep.avgScore}
                      </span>
                    </div>
                    <div className="w-full bg-zinc-800 rounded-full h-2">
                      <div
                        className={cn(
                          "h-2 rounded-full transition-all",
                          rep.avgScore >= 85 ? "bg-success" : 
                          rep.avgScore >= 70 ? "bg-blue-500" : "bg-warning"
                        )}
                        style={{ width: `${rep.avgScore}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}

