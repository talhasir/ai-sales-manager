"use client";

import { useState, useActionState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { analyzeCall, AnalyzeCallState } from "@/app/actions/analyze-call";
import { TranscriptUploader } from "@/components/transcript-uploader";
import {
  CheckCircle2,
  AlertTriangle,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AnalyzePage() {
  const [uploadedTranscript, setUploadedTranscript] = useState<string>("");

  const initialState: AnalyzeCallState = {
    status: "idle"
  };

  const [state, formAction, isPending] = useActionState(analyzeCall, initialState);

  const handleTranscriptUpload = (transcript: string) => {
    setUploadedTranscript(transcript);
  };

  const analysis = state.status === "success" && state.data ? state.data : null;
  const hasAnalysis = !!analysis;

  return (
    <div className="space-y-6">
      <div style={{ opacity: 1 }}>
        <h1 className="text-3xl font-bold text-white">Analyze New Transcript</h1>
        <p className="text-gray-400 mt-1">Upload a sales call transcript to get AI-powered insights.</p>
      </div>

      {/* Upload Section */}
      {!hasAnalysis && (
        <div style={{ opacity: 1 }}>
          <TranscriptUploader onTranscriptLoaded={handleTranscriptUpload} />
        </div>
      )}

      {/* Analyze Button - Shows after upload, hides when analyzing */}
      {uploadedTranscript && !hasAnalysis && !isPending && (
        <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20" style={{ opacity: 1 }}>
          <CardContent className="py-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/20 mb-2">
                <Sparkles className="h-8 w-8 text-success" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Ready to Analyze</h3>
                <p className="text-gray-300 max-w-md mx-auto">
                  Click below to get AI-powered insights including score, summary, and coaching recommendations.
                </p>
              </div>
              <form action={formAction}>
                <input type="hidden" name="transcript" value={uploadedTranscript} />
                <Button
                  type="submit"
                  size="lg"
                  className="bg-success hover:bg-success/90 text-white font-semibold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all"
                  disabled={isPending}
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Analyze Transcript with AI
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Skeleton Loader - Shows while analyzing */}
      {isPending && (
        <>
          {/* Score Skeleton */}
          <Card className="bg-zinc-900 border-zinc-800" style={{ opacity: 1 }}>
            <CardContent className="pt-6 pb-6 flex flex-col items-center justify-center">
              <Skeleton className="h-48 w-48 rounded-full bg-zinc-800 animate-pulse" />
              <Skeleton className="h-6 w-48 mt-4 bg-zinc-800 animate-pulse" />
            </CardContent>
          </Card>

          {/* Summary Skeleton */}
          <Card className="bg-zinc-900 border-zinc-800" style={{ opacity: 1 }}>
            <CardContent className="pt-6 space-y-3">
              <Skeleton className="h-5 w-32 bg-zinc-800 animate-pulse" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full bg-zinc-800 animate-pulse" />
                <Skeleton className="h-4 w-full bg-zinc-800 animate-pulse" />
                <Skeleton className="h-4 w-3/4 bg-zinc-800 animate-pulse" />
              </div>
            </CardContent>
          </Card>

          {/* Coaching Note Skeleton */}
          <Card className="bg-zinc-900 border-zinc-800" style={{ opacity: 1 }}>
            <CardContent className="pt-6 space-y-3">
              <Skeleton className="h-5 w-48 bg-zinc-800 animate-pulse" />
              <Skeleton className="h-20 w-full bg-zinc-800 animate-pulse" />
            </CardContent>
          </Card>

          {/* Loading Message */}
          <div className="text-center py-4" style={{ opacity: 1 }}>
            <div className="inline-flex items-center gap-2 text-gray-400">
              <Sparkles className="h-5 w-5 animate-pulse text-success" />
              <p className="text-sm">AI is analyzing the transcript...</p>
            </div>
          </div>
        </>
      )}

      {/* Error State */}
      {state.status === "error" && (
        <Alert className="bg-red-500/10 border-red-500" style={{ opacity: 1 }}>
          <AlertTriangle className="h-5 w-5 text-red-500" />
          <AlertDescription className="ml-2 text-red-400">
            {state.error}
          </AlertDescription>
        </Alert>
      )}

      {/* Display Analysis Results */}
      {hasAnalysis && (
        <>
          <Card className="bg-zinc-900 border-zinc-800" style={{ opacity: 1 }}>
            <CardContent className="pt-6 flex flex-col items-center justify-center">
              <div className="relative w-48 h-48">
                <svg className="w-full h-full" viewBox="0 0 192 192">
                  {/* Background circle */}
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="none"
                    className="text-zinc-800"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 88}`}
                    strokeDashoffset={`${2 * Math.PI * 88 * (1 - analysis.score / 100)}`}
                    className={cn(
                      "transition-all duration-1000 ease-out",
                      analysis.score >= 85 ? "text-success" :
                      analysis.score >= 70 ? "text-blue-500" : "text-warning"
                    )}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-bold text-white">{analysis.score}</span>
                  <span className="text-gray-400 text-sm">out of 100</span>
                </div>
              </div>
              <p className="mt-4 text-lg font-medium text-white">
                {analysis.score >= 85 ? "Excellent Performance" :
                 analysis.score >= 70 ? "Good Performance" : "Needs Improvement"}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800" style={{ opacity: 1 }}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="h-5 w-5 text-success" />
                <h3 className="text-lg font-semibold text-white">AI Summary</h3>
              </div>
              <ul className="list-none space-y-2">
                {analysis.summary.map((item, index) => (
                  <li key={index} className="flex items-start text-gray-300">
                    <CheckCircle2 className="h-4 w-4 text-success mr-2 mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Alert className="bg-warning/10 border-warning text-warning-foreground" style={{ opacity: 1 }}>
            <AlertTriangle className="h-5 w-5 text-warning" />
            <AlertDescription className="ml-2">
              <p className="font-semibold text-warning mb-2">Manager's Coaching Note</p>
              <p className="text-gray-300">{analysis.coachingNote}</p>
            </AlertDescription>
          </Alert>
        </>
      )}
    </div>
  );
}
