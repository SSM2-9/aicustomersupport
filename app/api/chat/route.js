import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error("GEMINI_API_KEY is missing");
    return NextResponse.json({ error: "API Key is missing" }, { status: 500 });
  }

  try {
    // Parse incoming messages
    const messages = await req.json();
    console.log("Received messages:", JSON.stringify(messages, null, 2));

    if (!Array.isArray(messages) || messages.some(m => typeof m.content !== "string")) {
      return NextResponse.json(
        { error: "Invalid request body. Must be an array of objects with a 'content' string." },
        { status: 400 }
      );
    }

    // Build conversation text
    const conversationHistory = messages.map(m => m.content).join("\n\n");
    const promptText = `You are a chatbot designed to help people with anything regarding the Paris Olympics 2024.\n\nConversation so far:\n${conversationHistory}\n`;

    console.log("Prompt sent to Gemini:", promptText);

    // Initialize Gemini model
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: "You are a helpful chatbot for the Paris Olympics 2024.",
    });

    // Generate response
    const result = await model.generateContent({
      prompt: { text: promptText }, // Ensure prompt is wrapped correctly
      temperature: 0.7,
      maxOutputTokens: 500,
    });

    console.log("Full Gemini response:", JSON.stringify(result, null, 2));

    // Extract assistant's text safely
    const responseText = result.output?.[0]?.content?.[0]?.text || "No content returned";

    return NextResponse.json({ response: responseText }, { status: 200 });

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return NextResponse.json({ error: "Error generating response" }, { status: 500 });
  }
}
