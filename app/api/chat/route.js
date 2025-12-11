import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function POST(req) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    console.error("API Key is missing");
    return NextResponse.json({ error: "API Key is missing" }, { status: 500 });
  }

  const groq = new Groq({ apiKey });

  try {
    const data = await req.json();

    // Format messages for Groq (OpenAI-compatible format)
    const messages = [
      {
        role: "system",
        content: `You are an AI chatbot designed to assist users with anything related to the Paris 2024 Olympics. 
Provide accurate, friendly, and up-to-date information about events, schedules, venues, athletes, 
medal standings, tickets, travel, local attractions, and dining options. 
Integrated multilingual capabilities: respond in the language the user writes in. 
Keep your tone welcoming and engaging, like a helpful Olympic concierge. 
Organize your responses into clear paragraphs for readability. 
If a user asks something unrelated, gently guide the conversation back to the Paris 2024 Olympics.`
      },
      ...data // Your conversation history
    ];

    // Generate response using Groq
    const completion = await groq.chat.completions.create({
      messages,
      model: "llama-3.3-70b-versatile", // Fast and capable model
      temperature: 0.7,
      max_tokens: 1024,
    });

    const text = completion.choices[0]?.message?.content || "No content returned";

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