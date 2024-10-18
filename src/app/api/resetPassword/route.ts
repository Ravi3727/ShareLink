import { sendVerificationEmailToResetPassword } from "@/helper/sendVerificationEmailToResetPassword";
import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";


export async function POST(request: Request) {
    await dbConnect();
    
    try {
        const { identifier, newpassword, confirmPassword, username} = await request.json();

        if(newpassword !== confirmPassword){
            return Response.json({
                success: false,
                message: "Password and confirm password are not same",
            }, { status: 400 })
        }

        // console.log("resetPassword backend se identifier ", identifier);
        const existingUserByEmail = await UserModel.findOne({
            email: identifier
        })

        // console.log("resetPassword backend ", existingUserByEmail);
        const verifyCodeOtp = Math.floor(100000 + Math.random() * 900000).toString()

        if (existingUserByEmail) {
            const hashedPassword = await bcrypt.hash(newpassword, 10)
            existingUserByEmail.password = hashedPassword;
            existingUserByEmail.resetPasswordverifyCode = verifyCodeOtp;
            existingUserByEmail.resetPasswordverifyCodeExpiry = new Date(Date.now() + 3600000) 
            await existingUserByEmail.save();
        }

        // console.log("added restPasswordVerifyCode", existingUserByEmail);

        const verifyEmailResponse = await sendVerificationEmailToResetPassword(
            identifier, username, verifyCodeOtp
        )

        if (!verifyEmailResponse.success) {
            return Response.json({
                success: false,
                message: verifyEmailResponse.message || 'Verification email otp is wrong',
            }, { status: 500 })
        }

        return Response.json({
            success: true,
            message: "Please set your new password by confirm email",
        }, { status: 200 });


    } catch (error) {
        console.error("Error in reseting password", error);
        return Response.json({
            success: false,
            message: "User reseting password failed",
        }, {
            status: 500
        });
    }
}