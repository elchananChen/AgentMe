/**
 * listAvailableModels.ts
 * 
 * Diagnostic script to check which models are available for your API Key 
 * and what their exact names are.
 */

import dotenv from 'dotenv';
dotenv.config();

async function main() {
    const key = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    
    if (!key) {
        console.error("❌ Error: GOOGLE_GENERATIVE_AI_API_KEY not found in .env");
        return;
    }

    console.log("📡 Querying Google AI Studio for available models...");
    
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
        const data: any = await response.json();

        if (data.error) {
            console.error("❌ API Error:", data.error.message);
            return;
        }

        console.log("\n✅ Available Models for your API Key:");
        console.table(data.models.map((m: any) => ({
            Name: m.name.replace('models/', ''),
            DisplayName: m.displayName,
            Description: m.description?.substring(0, 50) + '...'
        })));

    } catch (error) {
        console.error("❌ Failed to fetch models:", error);
    }
}

main();
