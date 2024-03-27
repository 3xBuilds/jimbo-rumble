import Game from "@/schemas/GameSchema";
import Player from "@/schemas/PlayerSchema";
import { connectToDB } from "@/utils/db";
import { NextResponse } from "next/server";
import { revalidatePath } from 'next/cache'

export async function POST(req) {
    try{
        await connectToDB();

        revalidatePath('/', 'layout') 

        const playerId = req.nextUrl.pathname.split("/")[4];
        
        const currentGame = await Game.findOne(
            { status: "ongoing" }
        )
        .populate({
            path: 'players',
            model: 'Player'
        });

        if(currentGame == null){
            return new NextResponse(JSON.stringify({success: false, error: "No Game Scheduled Currently"}), { status: 404 });
        }
        else{

            let revivePlayer = currentGame.players.find(player => player.userId == playerId);

            if(revivePlayer == null){
                return new NextResponse(JSON.stringify({success: false, error: "Not a player"}), { status: 409 });
            }

            //find the revive player in the players document using player._id and update its isAlive to be true
            
            const revPlayer = await Player.findById(revivePlayer._id);
            
            if(revPlayer.isAlive==true){
                return new NextResponse(JSON.stringify({success: false, error: "Player is already alive"}), { status: 409 });
            }
            revPlayer.isAlive = true;
            
            if(revPlayer.revives>=currentGame.reviveLimit){
                return new NextResponse(JSON.stringify({success: false, error: "Revive Limit Exceeded"}), { status: 409 });
            }

            revPlayer.revives += 1;
            await revPlayer.save();

            return new NextResponse(JSON.stringify({
                success: true, message: "Successfully Revived"
            }), { status: 200 });
        }
        
    }
    catch (error) {
        return new NextResponse(JSON.stringify(error), {
            status: 500,
        });
    }
}