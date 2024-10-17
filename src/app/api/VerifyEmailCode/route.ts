import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, code } = await request.json();
    const decodedUsername = decodeURIComponent(username);

    const user = await UserModel.findOne({
      username: decodedUsername,
    });

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "User not found",
      }, { status: 404 }); // Use 404 for not found
    }

    const isOtpValid = user.verifyCode === code;
    const isCodeExpired = new Date() > new Date(user.verifyCodeExpiry);

    if (isOtpValid && !isCodeExpired) {
      user.isVerified = true;
      await user.save();

      return NextResponse.json({
        success: true,
        message: "Account verified successfully",
      }, { status: 200 });
    } else if (isCodeExpired) {
      return NextResponse.json({
        success: false,
        message: "Verification code is expired. Please sign up again to get a new OTP.",
      }, { status: 400 });
    } else {
      return NextResponse.json({
        success: false,
        message: "Invalid verification OTP",
      }, { status: 400 });
    }

  } catch (error) {
    console.error("Error verifying email OTP", error);
    return NextResponse.json({
      success: false,
      message: "Error verifying email OTP",
    }, { status: 500 });
  }
}
