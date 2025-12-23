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
      className="space-y-6"
    >
      <motion.div variants={fadeInUp}>
        <h1 className="text-3xl font-bold">Team Insights</h1>
        <p className="text-gray-400 mt-1">Analyze team performance and identify coaching opportunities.</p>
      </motion.div>

      <Tabs defaultValue="leaderboard" className="space-y-6">
        <TabsList className="bg-zinc-900 border border-zinc-800">
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="coaching">Coaching Themes</TabsTrigger>
        </TabsList>

        {/* Leaderboard Tab */}
        <TabsContent value="leaderboard" className="space-y-6">
          <motion.div variants={fadeInUp}>
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-warning" />
                  Top Performers
                </CardTitle>
              </CardHeader>
              <CardContent>
                {stats.repPerformance.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <Trophy className="h-12 w-12 mx-auto mb-3 opacity-20" />
                    <p>No analyzed calls yet. Upload and analyze calls to see the leaderboard!</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {stats.repPerformance.map((rep, index) => (
                      <div key={rep.name} className="flex items-center gap-4">
                        <div className={cn(
                          "w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg",
                          index === 0 ? "bg-warning/20 text-warning" :
                          index === 1 ? "bg-gray-400/20 text-gray-400" :
                          index === 2 ? "bg-amber-700/20 text-amber-700" :
                          "bg-zinc-800 text-gray-400"
                        )}>
                          #{index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <p className="font-semibold text-lg">{rep.name}</p>
                              <p className="text-sm text-gray-400">
                                {rep.callCount} calls analyzed
                              </p>
                            </div>
                            <Badge 
                              className={cn(
                                "text-lg px-3 py-1",
                                rep.avgScore >= 85 ? "bg-success/20 text-success" :
                                rep.avgScore >= 70 ? "bg-blue-500/20 text-blue-400" :
                                "bg-warning/20 text-warning"
                              )}
                            >
                              {rep.avgScore}
                            </Badge>
                          </div>
                          <div className="w-full bg-zinc-800 rounded-full h-3">
                            <div
                              className={cn(
                                "h-3 rounded-full transition-all",
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
        <TabsContent value="trends" className="space-y-6">
          <motion.div variants={fadeInUp}>
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-success" />
                  Performance Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {/* Chart */}
                  <div className="space-y-4">
                    {weeklyData.map((week, index) => (
                      <div key={week.week} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">{week.week}</span>
                          <span className="font-medium">
                            Avg {week.avgScore} · {week.calls} calls
                          </span>
                        </div>
                        <div className="relative w-full bg-zinc-800 rounded-full h-8">
                          <div
                            className="bg-success h-8 rounded-full transition-all flex items-center justify-end pr-3"
                            style={{ width: `${week.avgScore}%` }}
                          >
                            <span className="text-sm font-semibold">{week.avgScore}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Summary Stats */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-zinc-800">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-success">+10</p>
                      <p className="text-sm text-gray-400">Point Increase</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-400">{stats.totalCalls}</p>
                      <p className="text-sm text-gray-400">Total Calls</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-warning">{stats.avgScore}</p>
                      <p className="text-sm text-gray-400">Avg Score</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Coaching Themes Tab */}
        <TabsContent value="coaching" className="space-y-6">
          <motion.div variants={fadeInUp}>
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-blue-400" />
                  Common Coaching Themes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {coachingThemes.map((theme) => (
                    <div 
                      key={theme.theme}
                      className="p-4 bg-zinc-800 rounded-lg hover:bg-zinc-800/70 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <Target className="h-5 w-5 text-blue-400" />
                          <div>
                            <h3 className="font-semibold">{theme.theme}</h3>
                            <p className="text-sm text-gray-400">{theme.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline" className="mb-1">
                            {theme.count} mentions
                          </Badge>
                          <p className={cn(
                            "text-sm font-medium",
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

