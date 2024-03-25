import Game from "@/schemas/GameSchema";
import Player from "@/schemas/PlayerSchema";
import { connectToDB } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req) {
    try{

        await connectToDB();
        
        const id = req.nextUrl.pathname.split("/")[3];

        const game = await Game.findById(id)
        .populate({
            path: 'players',
            model: 'Player'
        });

        if(game == null){
            return new NextResponse(JSON.stringify({success: false, error: "Game Not Found"}), { status: 404 });
        }
        else{
            const activePlayers = game.players

            return new NextResponse(JSON.stringify({
                activePlayers
            }), { status: 200 });
        }
    }
    catch (error) {
        return new NextResponse(JSON.stringify(error), {
            status: 500,
        });
    }
}