import { connectToDB } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {

    return new NextResponse(JSON.stringify({
        message: "Server is up and running!"
    }), {
        status: 200
    })

}