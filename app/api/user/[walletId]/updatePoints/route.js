import { connectToDB } from "@/utils/db";
import { NextResponse } from "next/server";
import User from "@/schemas/UserSchema";

export async function POST(req) {
    try{
        const walletId = req.nextUrl.pathname.split("/")[3];

        await connectToDB();
        const body = await req.json();

        const {addPoints} = body; 
        const user = await User.findOne({walletId})

        user.points += addPoints;
        await user.save();

        return new NextResponse(JSON.stringify({
            user
        }), { status: 200 });
    }
    catch (error) {
        return new NextResponse(JSON.stringify(error), {
            status: 500,
        });
    }
}