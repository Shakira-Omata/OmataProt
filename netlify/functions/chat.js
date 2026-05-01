import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from 'fs';
import path from 'path';

// Manually load .env if not present (helps in some local dev environments)
const loadEnv = () => {
  try {
    const envPath = path.resolve(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8');
      envContent.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split('=');
        if (key && valueParts.length > 0) {
          process.env[key.trim()] = valueParts.join('=').trim();
        }
      });
    }
  } catch (err) {
    console.error("Error loading .env manually:", err);
  }
};

loadEnv();

export const handler = async (event, context) => {
  // Handle CORS
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return { 
      statusCode: 405, 
      body: JSON.stringify({ error: "Method Not Allowed" }) 
    };
  }

  try {
    console.log("--- New Chat Request ---");
    const { message, history } = JSON.parse(event.body || "{}");
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === "your_gemini_api_key_here") {
      return {
        statusCode: 500,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ error: "API Key Not Configured" }),
      };
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    // Using gemini-1.5-flash-latest for better compatibility
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    // Format history for Gemini
    const chatHistory = (history || [])
      .filter(m => m.content && !m.content.includes("I'm your AI health assistant"))
      .map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }],
      }));

    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: "You are an empathetic, non-judgmental SRHR health assistant for SalamaHub, a platform for young people in Kenya and Africa. Provide accurate, stigma-free information. Maintain confidentiality. For emergencies, advise professional help. Be warm and concise." }]
        },
        {
          role: 'model',
          parts: [{ text: "I understand. I am here as a safe, supportive, and non-judgmental space for young people to talk about sexual health, relationships, and their bodies. How can I help you today?" }]
        },
        ...chatHistory
      ],
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();
    console.log("Success: AI response generated");

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ reply: text }),
    };
  } catch (error) {
    console.error("AI Error:", error);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ 
        error: "Failed to generate AI response", 
        details: error.message || "Unknown error occurred" 
      }),
    };
  }
};
