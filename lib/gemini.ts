import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function analyzeCallTranscript(transcript: string) {
  try {
    // Check if API key is configured
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not configured. Please add it to your .env.local file.");
    }

    // Use gemini-2.0-flash-lite - lightweight and fast model
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

    const prompt = `You are an expert Sales Manager. Analyze this sales call transcript and provide your assessment.

Transcript:
${transcript}

Provide your analysis in the following JSON format (respond with ONLY valid JSON, no markdown, no code blocks):
{
  "summary": ["bullet point 1", "bullet point 2", "bullet point 3"],
  "score": <number between 0-100 based on rapport building, discovery questions, objection handling, and overall effectiveness>,
  "coachingNote": "<one specific, actionable coaching note identifying exactly where the rep can improve>"
}

Be specific and actionable in your feedback. The score should reflect:
- Rapport building and relationship development (25%)
- Discovery and understanding customer needs (35%)
- Objection handling and responses (25%)
- Overall sales effectiveness (15%)`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Try to extract JSON from the response
    let jsonText = text.trim();
    
    // Remove markdown code blocks if present
    if (jsonText.startsWith("```json")) {
      jsonText = jsonText.replace(/```json\n?/g, "").replace(/```\n?/g, "");
    } else if (jsonText.startsWith("```")) {
      jsonText = jsonText.replace(/```\n?/g, "");
    }
    
    const analysis = JSON.parse(jsonText);
    
    // Validate the response structure
    if (!analysis.summary || !Array.isArray(analysis.summary) || 
        typeof analysis.score !== 'number' || 
        typeof analysis.coachingNote !== 'string') {
      throw new Error("Invalid response structure from Gemini");
    }

    // Ensure score is between 0 and 100
    analysis.score = Math.max(0, Math.min(100, Math.round(analysis.score)));

    return {
      success: true,
      data: {
        summary: analysis.summary.slice(0, 3), // Ensure max 3 bullets
        score: analysis.score,
        coachingNote: analysis.coachingNote
      }
    };
  } catch (error) {
    console.error("Error analyzing transcript:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to analyze transcript"
    };
  }
}

