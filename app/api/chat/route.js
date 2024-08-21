import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    systemInstruction: "Hi! I'm the Paris Olympics 2024 customer support. How can I help you today?",
  });

  try {
    // Parse the request body
    const data = await req.json();

    // Construct the conversation history
    const conversationHistory = data.map(message => `${message.role}: ${message.content}`).join("\n\n");

    // Combine the system instruction with the conversation history
    const prompt = `${model.systemInstruction}\n\nHere's what has been discussed so far:\n${conversationHistory}\n`;

    // Generate response using the model
    const result = await model.generateContentStream({ prompt });

    // Read the stream response
    const text = await result.text();

    // Return the assistant's response
    return new Response(text, { status: 200, headers: { 'Content-Type': 'application/json' } });

  } catch (error) {
    console.error("Error in API Call:", error.message);
    console.error("Full Error Details:", error);
    return NextResponse.json({ error: "Error generating response" }, { status: 500 });
  }
}
