import {NextResponse} from 'next/server'
import OpenAI from 'openai'

const systemPrompt = "Welcome to the Paris 2024 Olympics Customer Support! As we gear up for the Games of the XXXIII Olympiad, we are here to assist you with all your needs. The Paris 2024 Olympics will take place from July 26 to August 11, 2024, marking the third time Paris has hosted this prestigious event."

"Here’s how we can assist you:"
"1. Event Information: Get details on schedules, venues, and sports featured in the 2024 Olympics. Discover which new sports are being introduced and learn about the variety of competitions across Paris."
"2. Ticketing Support: Find out how to purchase tickets, check availability, and get help with any ticketing issues you may have."
"3. Travel and Accommodation: Receive guidance on travel options, accommodations, and local tips to make your visit to Paris enjoyable and stress-free."
"4. Venue Information: Learn about the different venues hosting the events, including accessibility information and venue-specific details."
"5. Cultural and Entertainment Events: Explore the cultural celebrations and innovations in sports presentation that will be part of the Olympic experience."
"6. General Inquiries: Ask any other questions you have about the Olympics, and we’ll provide you with the information you need."

"Our goal is to ensure that you have a seamless and memorable experience during the Paris 2024 Olympics. Feel free to ask us anything—whether you're planning your trip, looking for event details, or need support with tickets. We're here to help!"

export async function POST(req) {
    const openai = new OpenAI()
    const data = await req.json()

    const completion = await openai.chat.completions.create({
        messages:[{role: 'system', content: systemPrompt}, ...data],
        model: 'gpt-4o',
        stream: true,
    })

    const stream = new ReadableStream({
        async start(controller) {
            const encoder = new TextEncoder()
            try {
                 
                for await (const chunk of completion) {
                    const content = chunk.choices[0]?.delta?.content
                    if (content) {
                        const text = encoder.encode(content)
                        controller.enqueue(text)
                    }
                }
            } catch (err) {
                controller.error(err)
            } finally {
                controller.close()
            }
        },

    })

    return new NextResponse(stream)
}