"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { SalesCall } from "@/lib/mock-data";
import Link from "next/link";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 }
};

export function CallLibraryClient({ calls }: { calls: SalesCall[] }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCalls = calls.filter(call => {
    const query = searchQuery.toLowerCase();
    return (
      call.repName.toLowerCase().includes(query) ||
      call.prospectName.toLowerCase().includes(query) ||
      call.prospectCompany.toLowerCase().includes(query)
    );
  });

  return (
    <motion.div
      initial="initial"
      animate="animate"
      className="space-y-6"
    >
      <motion.div variants={fadeInUp}>
        <h1 className="text-3xl font-bold">Call Library</h1>
        <p className="text-gray-400 mt-1">Browse and analyze all sales calls.</p>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>All Calls ({filteredCalls.length})</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search calls..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-zinc-800 border-zinc-700"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {filteredCalls.map((call) => (
                <Link
                  key={call.id}
                  href={`/dashboard/calls/${call.id}`}
                  className="flex items-center justify-between p-4 rounded-lg hover:bg-zinc-800 transition-colors border border-transparent hover:border-zinc-700"
                >
                  <div className="flex-1 grid grid-cols-4 gap-4 items-center">
                    <div>
                      <p className="font-medium">{call.repName}</p>
                      <p className="text-sm text-gray-400">Sales Rep</p>
                    </div>
                    <div>
                      <p className="font-medium">{call.prospectName}</p>
                      <p className="text-sm text-gray-400">{call.prospectCompany}</p>
                    </div>
                    <div>
                      <p className="font-medium">
                        {new Date(call.date).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-400">{call.duration}</p>
                    </div>
                    <div className="flex items-center justify-end gap-2">
                      {call.analysis ? (
                        <Badge 
                          className={cn(
                            "text-base px-3 py-1",
                            call.analysis.score >= 85 
                              ? "bg-success/20 text-success hover:bg-success/30" 
                              : call.analysis.score >= 70
                              ? "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
                              : "bg-warning/20 text-warning hover:bg-warning/30"
                          )}
                        >
                          {call.analysis.score}
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-gray-400">
                          Not analyzed
                        </Badge>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}

