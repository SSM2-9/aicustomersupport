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

When providing information, include:
- Event details and schedules
- Venue information and directions
- Athlete profiles and achievements
- Medal standings and results
- Travel and accommodation tips
- Local recommendations

If a user asks something unrelated, gently guide the conversation back to the Paris 2024 Olympics.`
      },
      ...data
    ];
    
    // Generate response using Groq
    const completion = await groq.chat.completions.create({
      messages,
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 1024,
    });
    
    const text = completion.choices[0]?.message?.content || "No content returned";
    
    // Post-process the response to add proper formatting
    const formattedText = text
      .replace(/Events?:/gi, '\n\nEvents:\n')
      .replace(/Schedule:/gi, '\n\nSchedule:\n')
      .replace(/Venues?:/gi, '\n\nVenues:\n')
      .replace(/Athletes?:/gi, '\n\nAthletes:\n')
      .replace(/Medal Standings?:/gi, '\n\nMedal Standings:\n')
      .replace(/Tickets?:/gi, '\n\nTickets:\n')
      .replace(/Travel:/gi, '\n\nTravel:\n')
      .replace(/Attractions?:/gi, '\n\nAttractions:\n')
      .replace(/Dining:/gi, '\n\nDining:\n')
      .replace(/Tips?:/gi, '\n\nTips:\n')
      .replace(/(\d+)\.\s+/g, '\n$1. ') // Add line break before numbered lists
      .replace(/([•\-\*])\s+/g, '\n$1 ') // Add line break before bullet points
      .replace(/\n{3,}/g, '\n\n') // Remove excessive line breaks (more than 2)
      .trim();
    
    return NextResponse.json({ response: formattedText }, { status: 200 });
    
  } catch (error) {
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