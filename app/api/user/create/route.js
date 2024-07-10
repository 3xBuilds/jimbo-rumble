import User from "@/schemas/UserSchema";
import { connectToDB } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
    try{
        const body = await req.json();
        
        const {walletId, username, referral} = body;
        
        await connectToDB();
        
        const userNameExists = await User.findOne({
            username
        });

        if(userNameExists != null){
            return new NextResponse(JSON.stringify({success: false, error: "Username already exists"}), { status: 409 });
        }


        if(referral != ""){
            const referralFind = await User.findOne({username: referral});
            console.log(referralFind);

            if(referralFind != null){
                referralFind.points += 100;
                referralFind.referrals += 1;

                await referralFind.save();
            }

            else{
                return new NextResponse(JSON.stringify({success: false, error: "Referral doesn't exist"}), { status: 410 });
            }
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