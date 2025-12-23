"use server";

import { revalidatePath } from "next/cache";

export interface CallAnalysis {
  summary: string[];
  score: number;
  coachingNote: string;
}

export interface NewCallData {
  repName: string;
  prospectName: string;
  prospectCompany: string;
  transcript: string;
  date: string;
  duration: string;
  analysis?: CallAnalysis;
}

// In-memory storage for new calls (resets on server restart)
// In production, this would be a database
const newCalls: Map<string, NewCallData> = new Map();

export async function addCall(callData: NewCallData): Promise<{
  success: boolean;
  callId?: string;
  error?: string;
}> {
  try {
    // Generate unique ID
    const callId = `uploaded-${Date.now()}`;
    
    // Add to storage
    newCalls.set(callId, {
      ...callData,
      date: callData.date || new Date().toISOString(),
      duration: callData.duration || calculateDuration(callData.transcript)
    });

    console.log(`[Add Call] Saved call ${callId}:`, {
      repName: callData.repName,
      prospectName: callData.prospectName,
      company: callData.prospectCompany
    });

    // Revalidate the calls page to show the new call
    revalidatePath("/dashboard/calls");
    revalidatePath("/dashboard");

    return {
      success: true,
      callId
    };
  } catch (error) {
    console.error("[Add Call] Error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to add call"
    };
  }
}

export async function getUploadedCalls(): Promise<Map<string, NewCallData>> {
  return newCalls;
}

export async function getUploadedCallById(id: string): Promise<NewCallData | undefined> {
  return newCalls.get(id);
}

export async function updateCallAnalysis(callId: string, analysis: CallAnalysis): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    const call = newCalls.get(callId);
    
    if (!call) {
      return {
        success: false,
        error: "Call not found"
      };
    }

    // Update the call with analysis
    newCalls.set(callId, {
      ...call,
      analysis
    });

    console.log(`[Update Call Analysis] Updated call ${callId} with analysis:`, {
      score: analysis.score
    });

    // Revalidate pages that display analysis
    revalidatePath(`/dashboard/calls/${callId}`);
    revalidatePath("/dashboard/calls");
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/insights");

    return {
      success: true
    };
  } catch (error) {
    console.error("[Update Call Analysis] Error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update analysis"
    };
  }
}

function calculateDuration(transcript: string): string {
  // Rough estimate: ~150 words per minute for conversation
  const wordCount = transcript.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / 150);
  const seconds = Math.floor((wordCount % 150) / 2.5);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

