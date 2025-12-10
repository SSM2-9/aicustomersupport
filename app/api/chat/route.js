import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error("API Key is missing");
    return NextResponse.json({ error: "API Key is missing" }, { status: 500 });
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  // Swapped to the live model
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-lite",
    systemInstruction: `
      You are an AI chatbot designed to assist users with anything related to the Paris 2024 Olympics. 
      Provide accurate, friendly, and up-to-date information about events, schedules, venues, athletes, 
      medal standings, tickets, travel, local attractions, and dining options. 
      Integrated multilingual capabilities: respond in the language the user writes in. 
      Keep your tone welcoming and engaging, like a helpful Olympic concierge. 
      Organize your responses into clear paragraphs for readability. 
      If a user asks something unrelated, gently guide the conversation back to the Paris 2024 Olympics.
    `
  });

  try {
    const data = await req.json();

    // Construct the conversation history
    const conversationHistory = data.map(message => message.content).join("\n\n");

    const prompt = `${model.systemInstruction}\n\nHere's what has been discussed so far:\n${conversationHistory}\n`;

    // Generate response using the AI model
    const result = await model.generateContent(prompt);

    // Extract the relevant text
    const text = typeof result.response.text === 'function' 
      ? await result.response.text() 
      : result.response.text || "No content returned";

    // Return the assistant's response as a string
    return NextResponse.json({ response: text }, { status: 200 });
  } catch (error) {
    // Handle rate-limit or other errors gracefully
    if (error.message && error.message.toLowerCase().includes("rate")) {
      console.error("Rate limit reached:", error);
      return NextResponse.json({
        error: "The AI is busy right now. Please try again in a few moments."
      }, { status: 429 });
    }

    console.error("Error in API Call:", error.message);
    console.error("Full Error Details:", error);
    return NextResponse.json({ error: "Error generating response" }, { status: 500 });
  }
}
