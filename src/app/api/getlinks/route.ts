import { dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import { getServerSession } from 'next-auth/next';
import { User } from 'next-auth';
import UserModel from "@/models/User";
import { authOptions } from '../auth/[...nextauth]/options';

export async function GET() {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const _user: User = session?.user;

  if (!session || !_user) {
    return NextResponse.json(
      { success: false, message: 'Not authenticated' },
      { status: 401 }
    );
  }
  try {
    const user = await UserModel.findOne(
      { email: _user.email },
    );

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    // console.log('User found:', user.links);

    return NextResponse.json(
      { message: `Links fetched successfully`, success: true,data:user.links },
      { status: 200, headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (error) {
    console.error('Error fetching link:', error);
    return NextResponse.json(
      { message: 'Error fetching link:', success: false },
      { status: 500 }
    );
  }
}
