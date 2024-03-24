import User from "@/schemas/UserSchema";
import { connectToDB } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req) {
    try{
        const walletId = req.nextUrl.pathname.split("/")[3];

        await connectToDB();
        const user = await User.findOne({walletId})

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

//write a patch request to edit fields in a user document
export async function PATCH(req) {
    try{
        const walletId = req.nextUrl.pathname.split("/")[3];
        
        const body = await req.json();
        const {username} = body;

        await connectToDB();
        const user = await User.findOneAndUpdate({walletId},
            {username},
            {new: true}
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