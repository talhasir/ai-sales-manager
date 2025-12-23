"use server";

import { analyzeCallTranscript } from "@/lib/gemini";

export interface AnalysisResult {
  summary: string[];
  score: number;
  coachingNote: string;
}

export interface AnalyzeCallState {
  status: "idle" | "loading" | "success" | "error";
  data?: AnalysisResult;
  error?: string;
}

export async function analyzeCall(
  prevState: AnalyzeCallState,
  formData: FormData
): Promise<AnalyzeCallState> {
  console.log("[Server Action] analyzeCall called");
  
  const transcript = formData.get("transcript") as string;

  if (!transcript || transcript.trim().length === 0) {
    console.log("[Server Action] No transcript provided");
    return {
      status: "error",
      error: "Transcript is required"
    };
  }

  console.log("[Server Action] Transcript length:", transcript.length);
  console.log("[Server Action] Calling Gemini API...");
  
  const result = await analyzeCallTranscript(transcript);

  console.log("[Server Action] Gemini result:", JSON.stringify(result, null, 2));

  if (result.success && result.data) {
    console.log("[Server Action] Success! Returning data:", result.data);
    return {
      status: "success",
      data: result.data
    };
  } else {
    console.log("[Server Action] Error:", result.error);
    return {
      status: "error",
      error: result.error || "Failed to analyze call"
    };
  }
}

