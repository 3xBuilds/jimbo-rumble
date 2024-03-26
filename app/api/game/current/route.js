import Game from "@/schemas/GameSchema";
import User from "@/schemas/UserSchema";
import { connectToDB } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req) {
    try{
        const id = req.nextUrl.pathname.split("/")[3];

        await connectToDB();
        const game = await Game.findOne(
            { status: "upcoming" }
        );

        if(game == null){
            return new NextResponse(JSON.stringify({success: false, error: "Game not found"}), { status: 404 });
        }

        return new NextResponse(JSON.stringify({
            game
        }), { status: 200 });
    }
    catch (error) {
        return new NextResponse(JSON.stringify(error), {
            status: 500,
        });
    }
}