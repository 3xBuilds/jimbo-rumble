import Game from "@/schemas/GameSchema";
import { connectToDB } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
    try{
        await connectToDB();
        
        const body = await req.json();
        const {fee, revivalFee, battleStartTime, regClosingTime, reviveLimit} = body;

        const dateExists = await Game.findOne(
            { battleStartTime }
        );
        console.log("dateexist", dateExists);

        if(dateExists != null){
            return new NextResponse(JSON.stringify({success: false, error: "Game already scheduled"}), { status: 500 });
        }
        else{
            const game = await Game.create({
                fee, revivalFee, battleStartTime, regClosingTime, reviveLimit
            })
            return new NextResponse(JSON.stringify({success: true, message: "Successfully Created Game", game: game}), { status: 200 });
        }
    }
    catch (error) {
        return new NextResponse(JSON.stringify(error), {
            status: 500,
        });
    }
}