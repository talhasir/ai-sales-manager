"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Brain, TrendingUp, Users, Zap } from "lucide-react";
import Link from "next/link";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Hero Section */}
      <motion.div 
        className="container mx-auto px-4 py-20"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        <motion.div className="text-center max-w-4xl mx-auto" variants={fadeInUp}>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            The Manager that never sleeps.
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-8">
            Automate sales coaching with AI. Transform your team's performance with real-time insights and personalized feedback.
          </p>
          <Link href="/login">
            <Button size="lg" className="text-lg px-8 py-6 bg-success hover:bg-success/90">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}>
            <Card className="p-6 bg-zinc-900 border-zinc-800 hover:border-success/50 transition-colors">
              <Brain className="h-12 w-12 text-success mb-4" />
              <h3 className="text-xl font-semibold mb-2">AI-Powered Analysis</h3>
              <p className="text-gray-400">
                Advanced AI evaluates every call for rapport, discovery, and objection handling.
              </p>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card className="p-6 bg-zinc-900 border-zinc-800 hover:border-success/50 transition-colors">
              <TrendingUp className="h-12 w-12 text-success mb-4" />
              <h3 className="text-xl font-semibold mb-2">Real-Time Insights</h3>
              <p className="text-gray-400">
                Get instant feedback on sales calls with actionable coaching notes.
              </p>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card className="p-6 bg-zinc-900 border-zinc-800 hover:border-success/50 transition-colors">
              <Users className="h-12 w-12 text-success mb-4" />
              <h3 className="text-xl font-semibold mb-2">Team Performance</h3>
              <p className="text-gray-400">
                Track team metrics, identify top performers, and spot coaching opportunities.
              </p>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card className="p-6 bg-zinc-900 border-zinc-800 hover:border-success/50 transition-colors">
              <Zap className="h-12 w-12 text-success mb-4" />
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-gray-400">
                Powered by Gemini 2.0 for near-instant analysis of call transcripts.
              </p>
            </Card>
          </motion.div>
        </motion.div>

        {/* Social Proof */}
        <motion.div 
          className="mt-20 text-center"
          variants={fadeInUp}
        >
          <p className="text-gray-500 mb-4">Trusted by high-performing sales teams</p>
          <div className="flex justify-center gap-8 text-2xl font-bold text-gray-600">
            <span>10K+</span>
            <span className="text-gray-700">|</span>
            <span>98% Accuracy</span>
            <span className="text-gray-700">|</span>
            <span>24/7 Available</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

