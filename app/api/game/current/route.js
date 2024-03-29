import Game from "@/schemas/GameSchema";
import User from "@/schemas/UserSchema";
import { connectToDB } from "@/utils/db";
import { NextResponse } from "next/server";
import { revalidatePath } from 'next/cache';

export async function GET(req) {
    try{
        const path = req.nextUrl.pathname || '/';
        revalidatePath(path)

        await connectToDB();
        let currentGame = await Game.findOne({ status: "ongoing" })
        .populate({
            path: 'rounds',
            model: 'Round'
        }).populate({
            path: 'players',
            model: 'Player'
        });

        if (!currentGame) {
            currentGame = await Game.findOne({ status: "halted" })
            .populate({
                path: 'rounds',
                model: 'Round'
            }).populate({
                path: 'players',
                model: 'Player'
            });
        }

        if (!currentGame) {
            currentGame = await Game.findOne({ status: "upcoming" })
            .populate({
                path: 'rounds',
                model: 'Round'
            }).populate({
                path: 'players',
                model: 'Player'
            });
        }

        if (!currentGame) {
            currentGame = await Game.findOne({ status: "ended" })
            .populate({
                path: 'rounds',
                model: 'Round'
            }).populate({
                path: 'players',
                model: 'Player'
            });
        }

        if(currentGame == null){
            return new NextResponse(JSON.stringify({success: false, error: "Game not found"}), { status: 404 });
        }

        return new NextResponse(JSON.stringify({
            currentGame
        }), { status: 200 });
    }
    catch (error) {
        return new NextResponse(JSON.stringify(error), {
            status: 500,
        });
    }
}