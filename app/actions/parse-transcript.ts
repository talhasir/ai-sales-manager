"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export interface ParsedTranscript {
  repName: string;
  prospectName: string;
  prospectCompany: string;
  formattedTranscript: string;
  rawTranscript: string;
}

export async function parseTranscript(transcript: string): Promise<{
  success: boolean;
  data?: ParsedTranscript;
  error?: string;
}> {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not configured");
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `You are an expert at analyzing sales call transcripts. Parse this transcript and extract information.

Transcript:
${transcript}

Your task:
1. Identify who is the sales representative (Rep) and who is the prospect
2. Extract the rep's name if mentioned, or use "Sales Rep" if not found
3. Extract the prospect's name if mentioned, or use "Prospect" if not found  
4. Extract the prospect's company name if mentioned, or use "Company" if not found
5. Format the conversation clearly with "Rep:" and "Prospect:" labels

Provide your response in the following JSON format (respond with ONLY valid JSON, no markdown):
{
  "repName": "extracted rep name or 'Sales Rep'",
  "prospectName": "extracted prospect name or 'Prospect'",
  "prospectCompany": "extracted company name or 'Company'",
  "formattedTranscript": "formatted conversation with Rep: and Prospect: labels on each line"
}

Example format for formattedTranscript:
Rep: Hello, this is John from TechCorp.
Prospect: Hi John, what can I help you with?
Rep: I wanted to discuss...

Important: Ensure each line starts with either "Rep:" or "Prospect:"`;

    console.log("[Parse Transcript] Calling Gemini API...");
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // Clean up response
    text = text.trim();
    if (text.startsWith("```json")) {
      text = text.replace(/```json\n?/g, "").replace(/```\n?/g, "");
    } else if (text.startsWith("```")) {
      text = text.replace(/```\n?/g, "");
    }

    const parsed = JSON.parse(text);

    // Validate structure
    if (!parsed.repName || !parsed.prospectName || !parsed.formattedTranscript) {
      throw new Error("Invalid response structure from Gemini");
    }

    console.log("[Parse Transcript] Success:", {
      repName: parsed.repName,
      prospectName: parsed.prospectName,
      company: parsed.prospectCompany
    });

    return {
      success: true,
      data: {
        repName: parsed.repName,
        prospectName: parsed.prospectName,
        prospectCompany: parsed.prospectCompany || "Company",
        formattedTranscript: parsed.formattedTranscript,
        rawTranscript: transcript
      }
    };
  } catch (error) {
    console.error("[Parse Transcript] Error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to parse transcript"
    };
  }
}

