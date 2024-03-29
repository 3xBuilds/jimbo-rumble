// import Round from "@/schemas/RoundSchema";
import Game from "@/schemas/GameSchema";
import Player from "@/schemas/PlayerSchema";
import Round from "@/schemas/RoundSchema";
import { connectToDB } from "@/utils/db";
import { startGame } from "@/utils/wordPlay";
import { NextResponse } from "next/server";

export async function GET(req) {
    try{
        await connectToDB();

        const id = req.nextUrl.pathname.split("/")[4];
        const game = await Game.findById(id)
        .populate({
            path: 'players',
            model: 'Player',
        });

        if(game == null){
            return new NextResponse(JSON.stringify({success: false, error: "Game Not Found"}), { status: 404 });
        }
        else{

            if(game.status == "ended"){
                return new NextResponse(JSON.stringify({success: false, error: "Game already ended"}), { status: 404 });
            }

            game.status = "ended";

            await game.save();

            return new NextResponse(JSON.stringify({
                success: true, message: "Game Ended Successfully"
            }), { status: 200 });
        }
        
    }
    catch (error) {
        return new NextResponse(JSON.stringify(error), {
            status: 500,
        });
    }
}