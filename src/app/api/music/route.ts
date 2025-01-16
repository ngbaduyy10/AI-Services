import { NextResponse } from "next/server";
import {auth} from "@clerk/nextjs/server";
import Replicate from "replicate";

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_KEY,
});

export async function POST (request : Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { prompt } = await request.json();

        const input = {
            prompt,
            model_version: "stereo-large",
            output_format: "mp3",
            normalization_strategy: "peak"
        };

        const output = await replicate.run("meta/musicgen:671ac645ce5e552cc63a54a2bbff63fcf798043055d2dac5fc9e36a837eedcfb", { input });

        return NextResponse.json({ music: output });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal error" }, { status: 500 });
    }
}