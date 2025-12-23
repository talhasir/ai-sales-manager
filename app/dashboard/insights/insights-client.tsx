"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Trophy, TrendingUp, Target, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

interface InsightsClientProps {
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
  weeklyData: Array<{
    week: string;
    avgScore: number;
    calls: number;
  }>;
  coachingThemes: Array<{
    theme: string;
    count: number;
    improvement: string;
    description: string;
  }>;
}

export function InsightsClient({ stats, weeklyData, coachingThemes }: InsightsClientProps) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={staggerContainer}
      className="space-y-4 sm:space-y-6"
    >
      <motion.div variants={fadeInUp}>
        <h1 className="text-2xl sm:text-3xl font-bold">Team Insights</h1>
        <p className="text-sm sm:text-base text-gray-400 mt-1">Analyze team performance and identify coaching opportunities.</p>
      </motion.div>

      <Tabs defaultValue="leaderboard" className="space-y-4 sm:space-y-6">
        <TabsList className="bg-zinc-900 border border-zinc-800 w-full sm:w-auto grid grid-cols-3 sm:inline-grid">
          <TabsTrigger value="leaderboard" className="text-xs sm:text-sm">Leaderboard</TabsTrigger>
          <TabsTrigger value="trends" className="text-xs sm:text-sm">Trends</TabsTrigger>
          <TabsTrigger value="coaching" className="text-xs sm:text-sm">Coaching</TabsTrigger>
        </TabsList>

        {/* Leaderboard Tab */}
        <TabsContent value="leaderboard" className="space-y-4 sm:space-y-6">
          <motion.div variants={fadeInUp}>
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Trophy className="h-4 w-4 sm:h-5 sm:w-5 text-warning" />
                  Top Performers
                </CardTitle>
              </CardHeader>
              <CardContent>
                {stats.repPerformance.length === 0 ? (
                  <div className="text-center py-6 sm:py-8 text-gray-400 text-sm sm:text-base">
                    <Trophy className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-3 opacity-20" />
                    <p className="px-4">No analyzed calls yet. Upload and analyze calls to see the leaderboard!</p>
                  </div>
                ) : (
                  <div className="space-y-4 sm:space-y-6">
                    {stats.repPerformance.map((rep, index) => (
                      <div key={rep.name} className="flex items-center gap-3 sm:gap-4">
                        <div className={cn(
                          "w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-base sm:text-lg shrink-0",
                          index === 0 ? "bg-warning/20 text-warning" :
                          index === 1 ? "bg-gray-400/20 text-gray-400" :
                          index === 2 ? "bg-amber-700/20 text-amber-700" :
                          "bg-zinc-800 text-gray-400"
                        )}>
                          #{index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-1">
                            <div className="min-w-0 flex-1">
                              <p className="font-semibold text-base sm:text-lg truncate">{rep.name}</p>
                              <p className="text-xs sm:text-sm text-gray-400">
                                {rep.callCount} calls analyzed
                              </p>
                            </div>
                            <Badge 
                              className={cn(
                                "text-sm sm:text-lg px-2 sm:px-3 py-0.5 sm:py-1 shrink-0",
                                rep.avgScore >= 85 ? "bg-success/20 text-success" :
                                rep.avgScore >= 70 ? "bg-blue-500/20 text-blue-400" :
                                "bg-warning/20 text-warning"
                              )}
                            >
                              {rep.avgScore}
                            </Badge>
                          </div>
                          <div className="w-full bg-zinc-800 rounded-full h-2 sm:h-3">
                            <div
                              className={cn(
                                "h-2 sm:h-3 rounded-full transition-all",
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
                )}
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Trends Tab */}
        <TabsContent value="trends" className="space-y-4 sm:space-y-6">
          <motion.div variants={fadeInUp}>
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-success" />
                  Performance Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6 sm:space-y-8">
                  {/* Chart */}
                  <div className="space-y-3 sm:space-y-4">
                    {weeklyData.map((week, index) => (
                      <div key={week.week} className="space-y-2">
                        <div className="flex items-center justify-between text-xs sm:text-sm">
                          <span className="text-gray-400">{week.week}</span>
                          <span className="font-medium">
                            Avg {week.avgScore} · {week.calls} calls
                          </span>
                        </div>
                        <div className="relative w-full bg-zinc-800 rounded-full h-6 sm:h-8">
                          <div
                            className="bg-success h-6 sm:h-8 rounded-full transition-all flex items-center justify-end pr-2 sm:pr-3"
                            style={{ width: `${week.avgScore}%` }}
                          >
                            <span className="text-xs sm:text-sm font-semibold">{week.avgScore}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Summary Stats */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 border-t border-zinc-800">
                    <div className="text-center">
                      <p className="text-lg sm:text-2xl font-bold text-success">+10</p>
                      <p className="text-xs sm:text-sm text-gray-400">Point Increase</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg sm:text-2xl font-bold text-blue-400">{stats.totalCalls}</p>
                      <p className="text-xs sm:text-sm text-gray-400">Total Calls</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg sm:text-2xl font-bold text-warning">{stats.avgScore}</p>
                      <p className="text-xs sm:text-sm text-gray-400">Avg Score</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Coaching Themes Tab */}
        <TabsContent value="coaching" className="space-y-4 sm:space-y-6">
          <motion.div variants={fadeInUp}>
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
                  Common Coaching Themes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  {coachingThemes.map((theme) => (
                    <div 
                      key={theme.theme}
                      className="p-3 sm:p-4 bg-zinc-800 rounded-lg hover:bg-zinc-800/70 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-2">
                        <div className="flex items-start gap-2 sm:gap-3 flex-1 min-w-0">
                          <Target className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 shrink-0 mt-0.5" />
                          <div className="min-w-0 flex-1">
                            <h3 className="font-semibold text-sm sm:text-base">{theme.theme}</h3>
                            <p className="text-xs sm:text-sm text-gray-400 mt-0.5">{theme.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between sm:flex-col sm:items-end sm:text-right gap-2 shrink-0">
                          <Badge variant="outline" className="text-xs sm:mb-1">
                            {theme.count} mentions
                          </Badge>
                          <p className={cn(
                            "text-xs sm:text-sm font-medium",
                            theme.improvement.startsWith("+") ? "text-success" : "text-warning"
                          )}>
                            {theme.improvement}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}

