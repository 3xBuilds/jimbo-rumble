import Game from "@/schemas/GameSchema";
import { connectToDB } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req) {
    try{
        await connectToDB();
        const games = await Game.find()

        return new NextResponse(JSON.stringify({
            games
        }), { status: 200 });
    }
    catch (error) {
        return new NextResponse(JSON.stringify(error), {
            status: 500,
        });
    }
}