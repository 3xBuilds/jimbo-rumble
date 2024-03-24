import User from "@/schemas/UserSchema";
import { connectToDB } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
    try{
        const body = await req.json();
        
        const {walletId, username} = body;
        
        await connectToDB();
        
        const userNameExists = await User.findOne({
            username
        });

        if(userNameExists != null){
            return new NextResponse(JSON.stringify({success: false, error: "Username already exists"}), { status: 409 });
        }

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