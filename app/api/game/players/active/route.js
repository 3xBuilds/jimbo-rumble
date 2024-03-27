import Game from "@/schemas/GameSchema";
import Player from "@/schemas/PlayerSchema";
import { connectToDB } from "@/utils/db";
import { NextResponse } from "next/server";
import { revalidatePath } from 'next/cache'

export async function GET(req) {
    try{
        await connectToDB();

        revalidatePath('/', 'layout') 
        
        const currentGame = await Game.findOne(
            { status: "upcoming" }
        )
        .populate({
            path: 'players',
            model: 'Player'
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