
// import { z } from 'zod';
import { dbConnect } from '@/lib/dbConnect';
// import { userNameValidation } from '@/schemas/signUpSchema';
import UserModel from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';

// const UserNameUniqueSchema = z.object({
//   username: userNameValidation,
// });

export async function GET(request: NextRequest, { params }: { params: { username: string } }) {
  // console.log("DB connect");
  await dbConnect();
  const { username } = params;
  // console.log("User name h : ",username);
  try {
    const existingVerifiedUserName = await UserModel.findOne({ username, isVerified: true });

    if (existingVerifiedUserName) {
      return NextResponse.json({
        success: false,
        message: 'Username is already taken',
      }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: 'Username is unique',
    }, { status: 200 });

  } catch (error) {
    console.error('Error username unique', error);
    return NextResponse.json({
      success: false,
      message: 'Error checking username',
    }, { status: 500 });
  }
}
