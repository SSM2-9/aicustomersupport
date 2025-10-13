import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error("API Key is missing");
    return NextResponse.json({ error: "API Key is missing" }, { status: 500 });
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "You are a chatbot designed to help people with anything regarding the Paris Olympics 2024",
  });

  try {
    const data = await req.json();
    console.log("Raw request data from client:", JSON.stringify(data, null, 2));

    // Validate input
    if (!Array.isArray(data)) {
      console.error("Expected an array of messages. Got:", data);
      return NextResponse.json({ error: "Invalid request body. Must be an array of messages." }, { status: 400 });
    }

    const invalidMessage = data.find(msg => typeof msg.content !== "string");
    if (invalidMessage) {
      console.error("Message missing 'content' field:", invalidMessage);
      return NextResponse.json({ error: "Each message must have a 'content' string property." }, { status: 400 });
    }

    // Construct conversation prompt
    const conversationHistory = data.map(m => m.content).join("\n\n");
    const prompt = `You are a chatbot designed to help people with anything regarding the Paris Olympics 2024.\n\nHere's what has been discussed so far:\n${conversationHistory}\n`;
    console.log("Generated prompt for Gemini:", prompt);

    // Generate response
    const result = await model.generateContent({
      prompt,
      temperature: 0.7,
      maxOutputTokens: 500,
    });
    console.log("Full result from Gemini:", JSON.stringify(result, null, 2));

    // Extract assistant's text
    const text = result.output?.[0]?.content?.[0]?.text || "No content returned";

    return NextResponse.json({ response: text }, { status: 200 });
  } catch (error) {
    console.error("Error in API Call:", error.message);
    console.error("Full Error Details:", error);
    return NextResponse.json({ error: "Error generating response" }, { status: 500 });
  }
}
