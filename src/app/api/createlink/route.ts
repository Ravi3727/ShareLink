import { dbConnect } from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/models/User";
import { getServerSession } from 'next-auth/next';
import { User } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/options';

export async function POST(request: NextRequest) {
    await dbConnect();
    const session = await getServerSession(authOptions);
    const _user: User = session?.user;

    if (!session || !_user) {
        return NextResponse.json(
            { success: false, message: 'Not authenticated' },
            { status: 401 }
        );
    }

    const { title, url } = await request.json();

 
    if (!title || !url) {
        return NextResponse.json(
            { success: false, message: 'Invalid data' },
            { status: 400 }
        );
    }

    try {
        const user = await UserModel.findOne({ email: _user.email });
        if (!user) {
            return NextResponse.json(
                { success: false, message: 'User not found' },
                { status: 404 }
            );
        }

    
        const newLink:any = { title, url, createdAt: new Date() };
        
        console.log("User before", user);
        user.links.push(newLink);
        await user.save(); 
        console.log("User after", user);
        return NextResponse.json(
            { message: 'Link created successfully', success: true, data: newLink },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error creating link:', error);
        return NextResponse.json(
            { message: 'Error creating link', success: false },
            { status: 500 }
        );
    }
}
