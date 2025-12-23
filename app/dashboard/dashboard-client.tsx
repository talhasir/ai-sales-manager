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
      className="space-y-6"
    >
      <motion.div variants={fadeInUp}>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-400 mt-1">Welcome back! Here's your sales performance overview.</p>
      </motion.div>

      {/* KPI Cards */}
      <motion.div 
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
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
            <div className="space-y-3">
              {recentCalls.map((call) => (
                <Link 
                  key={call.id} 
                  href={`/dashboard/calls/${call.id}`}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-zinc-800 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="font-medium">{call.repName}</p>
                        <p className="text-sm text-gray-400">
                          {call.prospectName} · {call.prospectCompany}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-400">
                        {new Date(call.date).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-500">{call.duration}</p>
                    </div>
                    {call.analysis && (
                      <Badge 
                        className={cn(
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
            <div className="space-y-4">
              {stats.repPerformance.map((rep, index) => (
                <div key={rep.name} className="flex items-center gap-4">
                  <div className="w-8 text-center text-gray-400 font-medium">
                    #{index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{rep.name}</span>
                      <span className="text-sm text-gray-400">
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

