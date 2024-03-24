import Game from "@/schemas/GameSchema";
import Player from "@/schemas/PlayerSchema";
import { connectToDB } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
    try{
        await connectToDB();
        
        const body = await req.json();
        const {id, tokenId} = body;

        //search for active game whose status is upcoming
        const currentGame = await Game.findOne(
            { status: "upcoming" }
        ).populate({
            path: 'players',
            model: 'Player'
        });

        if(currentGame == null){
            return new NextResponse(JSON.stringify({success: false, error: "No Game Scheduled Currently"}), { status: 409 });
        }
        else{

            //check if player already exists using userId in players array of Game document
            let player = currentGame.players.find(player => player.userId == id);

            if(player != null){
                return new NextResponse(JSON.stringify({success: false, error: "Already Joined"}), { status: 409 });
            }

            //create a player document and then add its id to the players array i game document
            let newPlayer = await Player.create({
                userId: id,
                tokenId: tokenId
            });

            //edit the game document to add the id of the player in the players array in the currentGame
            currentGame.players.push(newPlayer._id);

            await currentGame.save();
            
            return new NextResponse(JSON.stringify({success: true, message: "Successfully Joined Game", game: currentGame}), { status: 200 });
        }
    }
    catch (error) {
        return new NextResponse(JSON.stringify(error), {
            status: 500,
        });
    }
}