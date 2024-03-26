import Game from "@/schemas/GameSchema";
import { connectToDB } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req) {
    try{
        await connectToDB();

        const currentGame = await Game.findOne(
            { status: "ongoing" }
        ).populate({
            path: 'rounds',
            model: 'Round'
        });

        if (!currentGame) {
            return new NextResponse(JSON.stringify({
                message: "No Ongoing Game Found"
            }), { status: 404 });
        }

        const rounds = currentGame.rounds;

        return new NextResponse(JSON.stringify({
            rounds
        }), { status: 200 });
    }
    catch (error) {
        return new NextResponse(JSON.stringify(error), {
            status: 500,
        });
    }
}