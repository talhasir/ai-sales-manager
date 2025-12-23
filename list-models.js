// List available Gemini models
require('dotenv').config({ path: '.env.local' });
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function listModels() {
  console.log("🔍 Listing available Gemini models...\n");

  if (!process.env.GEMINI_API_KEY) {
    console.error("❌ ERROR: GEMINI_API_KEY not found");
    process.exit(1);
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // Try to list models using the API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    console.log("✅ Available models:\n");
    
    if (data.models && data.models.length > 0) {
      data.models.forEach(model => {
        console.log(`📦 ${model.name}`);
        console.log(`   Display Name: ${model.displayName || 'N/A'}`);
        console.log(`   Description: ${model.description || 'N/A'}`);
        if (model.supportedGenerationMethods) {
          console.log(`   Supported: ${model.supportedGenerationMethods.join(', ')}`);
        }
        console.log();
      });
      
      // Find models that support generateContent
      const contentModels = data.models.filter(m => 
        m.supportedGenerationMethods && 
        m.supportedGenerationMethods.includes('generateContent')
      );
      
      if (contentModels.length > 0) {
        console.log("\n✨ Recommended models for this app:");
        contentModels.slice(0, 3).forEach(m => {
          const modelId = m.name.replace('models/', '');
          console.log(`   - ${modelId}`);
        });
      }
    } else {
      console.log("⚠️  No models found or API key doesn't have access");
    }
    
  } catch (error) {
    console.error("\n❌ ERROR:", error.message);
    console.log("\n🔧 Possible issues:");
    console.log("   1. API key may be invalid");
    console.log("   2. API key may not have Gemini API enabled");
    console.log("   3. Network or firewall issues");
    console.log("\n📝 Try:");
    console.log("   - Verify your API key at: https://makersuite.google.com/app/apikey");
    console.log("   - Make sure Gemini API is enabled in your Google Cloud project");
  }
}

listModels();

