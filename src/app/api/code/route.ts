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

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-pro",
            tools: [
                { codeExecution: {}, }
            ]
        });
        const { messages } = await request.json();
        const result = await model.generateContent(messages);
        const response = result.response;

        return NextResponse.json({ message: response.text() });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal error" }, { status: 500 });
    }
}