// Test script to verify Gemini API connectivity
// Run with: node test-gemini.js

require('dotenv').config({ path: '.env.local' });
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function testGemini() {
  console.log("🧪 Testing Gemini API Integration...\n");

  // Check if API key is set
  if (!process.env.GEMINI_API_KEY) {
    console.error("❌ ERROR: GEMINI_API_KEY not found in .env.local");
    console.log("\n📝 Create a .env.local file with:");
    console.log("GEMINI_API_KEY=your_api_key_here\n");
    process.exit(1);
  }

  console.log("✅ API Key found");
  console.log(`🔑 Key: ${process.env.GEMINI_API_KEY.substring(0, 10)}...`);

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // Test with gemini-2.5-flash (latest stable version)
    console.log("\n🤖 Testing model: gemini-2.5-flash");
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const testTranscript = `Rep: Hi, this is Sarah. How are you today?
Prospect: I'm good, thanks. What's this about?
Rep: I wanted to discuss how we can help improve your sales process. What are your biggest challenges right now?
Prospect: We struggle with lead qualification and our team spends too much time on unqualified prospects.`;

    const prompt = `You are an expert Sales Manager. Analyze this sales call transcript and provide your assessment.

Transcript:
${testTranscript}

Provide your analysis in the following JSON format (respond with ONLY valid JSON, no markdown, no code blocks):
{
  "summary": ["bullet point 1", "bullet point 2", "bullet point 3"],
  "score": 85,
  "coachingNote": "specific coaching note here"
}`;

    console.log("📤 Sending test request to Gemini...");
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log("\n📥 Raw response received:");
    console.log(text);

    // Try to parse JSON
    let jsonText = text.trim();
    if (jsonText.startsWith("```json")) {
      jsonText = jsonText.replace(/```json\n?/g, "").replace(/```\n?/g, "");
    } else if (jsonText.startsWith("```")) {
      jsonText = jsonText.replace(/```\n?/g, "");
    }

    const analysis = JSON.parse(jsonText);

    console.log("\n✅ SUCCESS! Parsed analysis:");
    console.log("📊 Score:", analysis.score);
    console.log("📝 Summary:", analysis.summary);
    console.log("🎯 Coaching Note:", analysis.coachingNote);

    console.log("\n✨ Gemini integration is working correctly!");
    return true;

  } catch (error) {
    console.error("\n❌ ERROR:", error.message);
    
    if (error.message.includes("API_KEY_INVALID") || error.message.includes("invalid_api_key")) {
      console.log("\n🔧 Your API key appears to be invalid.");
      console.log("📝 Get a new key at: https://makersuite.google.com/app/apikey");
    } else if (error.message.includes("model") || error.message.includes("404")) {
      console.log("\n🔧 The model may not be available.");
      console.log("💡 The app uses 'gemini-1.5-flash' which should work for most users.");
    } else {
      console.log("\n🔧 Full error details:");
      console.log(error);
    }
    
    return false;
  }
}

testGemini();

