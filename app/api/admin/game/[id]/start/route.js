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
        })
        .populate({
            path: 'rounds',
            model: 'Round'
        });

        if(game == null){
            return new NextResponse(JSON.stringify({success: false, error: "Game Not Found"}), { status: 404 });
        }
        else{
            const messages = startGame(game.players);
            
            let addTime = 0;
            let startTime = Date.now();

            if(game.rounds?.length > 0){
                startTime = game.rounds[game.rounds.length - 1].roundEndTime;
            }else{
                if( startTime < game.battleStartTime){
                    startTime = game.battleStartTime;
                }
            }

            
            messages.map(async message => {
                message.timeStamp = Number(startTime) + addTime;
                addTime += 3000;
                if(message.killed){
                    await Player.findByIdAndUpdate(message.killed._id, {isAlive: false});
                }
            });
                
            const round = await Round.create({
                messages: messages,
                revivalStopTime: (Number(startTime) + addTime + 120000), // 2mins
                roundEndTime: (Number(startTime) + addTime + 150000) // (2min+30s)
            });

            game.status = "ongoing";
            game.rounds.push(round._id);
            await game.save();

            return new NextResponse(JSON.stringify({
                messages
            }), { status: 200 });
        }
        
    }
    catch (error) {
        return new NextResponse(JSON.stringify(error), {
            status: 500,
        });
    }
}