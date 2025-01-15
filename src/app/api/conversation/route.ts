import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import {auth} from "@clerk/nextjs/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST (request : Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const { messages, history } = await request.json();

        const convertedHistory = history.map((item : { role: string, content: string }) => ({
            role: item.role,
            parts: [{ text: item.content }],
        }));

        const chat = model.startChat({
            history: convertedHistory,
        });
        const result = await chat.sendMessage(messages);
        return NextResponse.json({ message: result.response.text() });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal error" }, { status: 500 });
    }
}