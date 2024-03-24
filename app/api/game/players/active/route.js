import Game from "@/schemas/GameSchema";
import Player from "@/schemas/PlayerSchema";
import { connectToDB } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req) {
    try{
        await connectToDB();
        
        const currentGame = await Game.findOne(
            { status: "upcoming" }
        )
        .populate({
            path: 'players',
            model: 'Player',
            populate: {
                path: 'userId',
                model: 'User'
            }
        });

        if(currentGame == null){
            return new NextResponse(JSON.stringify({success: false, error: "No Game Scheduled Currently"}), { status: 404 });
        }
        else{

            const activePlayers = currentGame.players

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