import User from "@/schemas/UserSchema";
import { connectToDB } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
    try{
        const body = await req.json();

        const {walletId, username} = body;

        await connectToDB();
        const user = await User.create({
                walletId,
                username
            }
        )
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