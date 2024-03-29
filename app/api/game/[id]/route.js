import Game from "@/schemas/GameSchema";
import User from "@/schemas/UserSchema";
import { connectToDB } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req) {
    try{
        const id = req.nextUrl.pathname.split("/")[3];

        await connectToDB();
        const game = await Game.findById(id).populate({
            path: 'rounds',
            model: 'Round'
        })
        .populate({
            path: 'players',
            model: 'Player'
        });

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

//write a patch request to edit fields in a user document
export async function PATCH(req) {
    try{
        const id = req.nextUrl.pathname.split("/")[3];

        await connectToDB();
        const game = await Game.findById(id)

        const body = await req.json();
        const {fee, revivalFee, battleStartTime, regClosingTime, reviveLimit} = body;

        //update the fields that exists in body
        if(fee) game.fee = fee;
        if(revivalFee) game.revivalFee = revivalFee;
        if(battleStartTime) game.battleStartTime = battleStartTime;
        if(regClosingTime) game.regClosingTime = regClosingTime;
        if(reviveLimit) game.reviveLimit = reviveLimit;

        await game.save();

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