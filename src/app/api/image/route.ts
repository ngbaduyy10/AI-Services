import {auth} from "@clerk/nextjs/server";
import {NextResponse} from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST (request : Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { prompt, amount, resolution } = await request.json();
        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt,
            n: parseInt(amount),
            size: resolution,
        });

        return NextResponse.json({ images: response.data });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal error" }, { status: 500 });
    }
}