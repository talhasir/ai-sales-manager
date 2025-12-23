"use client";

import { useState, useActionState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SalesCall } from "@/lib/mock-data";
import { analyzeCall, AnalyzeCallState } from "@/app/actions/analyze-call";
import { updateCallAnalysis } from "@/app/actions/add-call";
import { TranscriptUploader } from "@/components/transcript-uploader";
import { 
  ArrowLeft, 
  CheckCircle2, 
  AlertTriangle,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Upload
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface CallDetailClientProps {
  call: SalesCall;
}

export function CallDetailClient({ call }: CallDetailClientProps) {
  const [showFullTranscript, setShowFullTranscript] = useState(false);
  const [uploadedTranscript, setUploadedTranscript] = useState<string>("");
  const [currentTranscript, setCurrentTranscript] = useState<string>(call.transcript);

  const initialState: AnalyzeCallState = {
    status: "idle"
  };

  const [state, formAction, isPending] = useActionState(analyzeCall, initialState);

  // Set initial transcript
  useEffect(() => {
    if (call) {
      setCurrentTranscript(call.transcript);
    }
  }, [call]);

  // Use existing analysis or new analysis from AI
  const analysis = state.status === "success" && state.data ? state.data : call.analysis;
  const hasAnalysis = !!analysis;
  
  // Debug logging
  useEffect(() => {
    console.log("🔍 State status:", state.status);
    console.log("🔍 State data:", state.data);
    console.log("🔍 Analysis:", analysis);
    console.log("🔍 Has analysis:", hasAnalysis);
  }, [state, analysis, hasAnalysis]);

  const handleTranscriptUpload = (transcript: string) => {
    setUploadedTranscript(transcript);
    setCurrentTranscript(transcript);
    console.log("📄 Transcript uploaded, length:", transcript.length);
  };

  const handleAnalyzeClick = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("transcript", currentTranscript);
    formAction(formData);
  };

  // Save analysis results to storage when analysis completes successfully
  useEffect(() => {
    const saveAnalysis = async () => {
      if (state.status === "success" && state.data && call.id.startsWith("uploaded-")) {
        console.log("💾 Saving analysis for uploaded call:", call.id);
        const result = await updateCallAnalysis(call.id, state.data);
        if (result.success) {
          console.log("✅ Analysis saved successfully");
        } else {
          console.error("❌ Failed to save analysis:", result.error);
        }
      }
    };
    saveAnalysis();
  }, [state.status, state.data, call.id]);

  return (
    <div className="space-y-4 sm:space-y-6" style={{ opacity: 1 }}>
      <div style={{ opacity: 1 }}>
        <Link 
          href="/dashboard/calls"
          className="inline-flex items-center text-sm sm:text-base text-gray-400 hover:text-white mb-3 sm:mb-4 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to calls
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Call Analysis</h1>
      </div>

      {/* Call Header */}
      <Card className="bg-zinc-900 border-zinc-800" style={{ opacity: 1 }}>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
            <div className="min-w-0 flex-1">
              <CardTitle className="text-base sm:text-xl text-white truncate">
                {call.repName} → {call.prospectName}
              </CardTitle>
              <p className="text-sm sm:text-base text-gray-400 mt-1 truncate">{call.prospectCompany}</p>
            </div>
            <Badge className="bg-zinc-800 text-gray-300 text-xs sm:text-sm shrink-0 self-start sm:self-center">
              {new Date(call.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2 sm:gap-4 text-xs sm:text-sm">
            <div>
              <p className="text-gray-400">Duration</p>
              <p className="font-medium text-white">{call.duration}</p>
            </div>
            <div>
              <p className="text-gray-400">Status</p>
              <p className="font-medium text-white capitalize">{call.status}</p>
            </div>
            <div>
              <p className="text-gray-400">Score</p>
              <p className="font-medium text-white">
                {analysis ? `${analysis.score}/100` : "Not analyzed"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Section */}
      <Tabs defaultValue="analysis" className="space-y-4 sm:space-y-6">
        <TabsList className="bg-zinc-900 border border-zinc-800 w-full sm:w-auto grid grid-cols-3 sm:inline-grid">
          <TabsTrigger value="analysis" className="text-xs sm:text-sm">AI Analysis</TabsTrigger>
          <TabsTrigger value="transcript" className="text-xs sm:text-sm">Transcript</TabsTrigger>
          <TabsTrigger value="upload" className="text-xs sm:text-sm">Upload New</TabsTrigger>
        </TabsList>

        {/* Analysis Tab */}
        <TabsContent value="analysis" className="space-y-6">
          {/* Show skeleton loader when analyzing */}
          {isPending ? (
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
                  <p className="text-sm">AI is analyzing the call transcript...</p>
                </div>
              </div>
            </>
          ) : state.status === "error" ? (
            /* Error State */
            <Alert className="bg-red-500/10 border-red-500" style={{ opacity: 1 }}>
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <AlertDescription className="ml-2 text-red-400">
                {state.error}
              </AlertDescription>
            </Alert>
          ) : hasAnalysis ? (
            /* Analysis Results - Show after successful analysis */
            <>
              {/* Score Progress Ring */}
              <Card className="bg-zinc-900 border-zinc-800" style={{ opacity: 1 }}>
                <CardContent className="pt-6 pb-6 flex flex-col items-center justify-center">
                  <div className="relative w-32 h-32 sm:w-48 sm:h-48">
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
                      <span className="text-3xl sm:text-5xl font-bold text-white">{analysis.score}</span>
                      <span className="text-gray-400 text-xs sm:text-sm">out of 100</span>
                    </div>
                  </div>
                  <p className="mt-3 sm:mt-4 text-base sm:text-lg font-medium text-white text-center">
                    {analysis.score >= 85 ? "Excellent Performance" :
                     analysis.score >= 70 ? "Good Performance" : "Needs Improvement"}
                  </p>
                </CardContent>
              </Card>

              {/* Summary */}
              <Card className="bg-zinc-900 border-zinc-800" style={{ opacity: 1 }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <CheckCircle2 className="h-5 w-5 text-success" />
                    Call Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
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

              {/* Coaching Note */}
              <Alert className="bg-warning/10 border-warning text-warning-foreground" style={{ opacity: 1 }}>
                <AlertTriangle className="h-5 w-5 text-warning" />
                <AlertDescription className="ml-2">
                  <p className="font-semibold text-warning mb-2">Manager's Coaching Note</p>
                  <p className="text-gray-300">{analysis.coachingNote}</p>
                </AlertDescription>
              </Alert>
            </>
          ) : (
            /* Show "Analyze This Call" button when no analysis yet */
            <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20" style={{ opacity: 1 }}>
              <CardContent className="py-12 text-center">
                <Sparkles className="h-12 w-12 text-success mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2 text-white">Analyze This Call</h3>
                <p className="text-gray-400 mb-6">
                  Get AI-powered insights including score, summary, and coaching recommendations
                </p>
                <form onSubmit={handleAnalyzeClick}>
                  <Button 
                    type="submit"
                    disabled={isPending}
                    className="bg-success hover:bg-success/90"
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    Analyze Call with AI
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Transcript Tab */}
        <TabsContent value="transcript">
          <Card className="bg-zinc-900 border-zinc-800" style={{ opacity: 1 }}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Call Transcript</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFullTranscript(!showFullTranscript)}
                  className="text-gray-400 hover:text-white"
                >
                  {showFullTranscript ? (
                    <>
                      <ChevronUp className="h-4 w-4 mr-2" />
                      Show Less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4 mr-2" />
                      Show Full Transcript
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div 
                className={cn(
                  "whitespace-pre-wrap text-gray-300 font-mono text-sm",
                  !showFullTranscript && "max-h-96 overflow-hidden"
                )}
              >
                {call.transcript}
              </div>
              {!showFullTranscript && (
                <div className="mt-4 text-center">
                  <Button
                    variant="ghost"
                    onClick={() => setShowFullTranscript(true)}
                    className="text-gray-400 hover:text-white"
                  >
                    Read More
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Upload Tab */}
        <TabsContent value="upload">
          <Card className="bg-zinc-900 border-zinc-800" style={{ opacity: 1 }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Upload className="h-5 w-5" />
                Upload New Transcript
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TranscriptUploader onTranscriptLoaded={handleTranscriptUpload} />
              {uploadedTranscript && (
                <div className="mt-4">
                  <Alert className="bg-success/10 border-success" style={{ opacity: 1 }}>
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    <AlertDescription className="ml-2 text-success">
                      New transcript loaded ({uploadedTranscript.length} characters)
                    </AlertDescription>
                  </Alert>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

