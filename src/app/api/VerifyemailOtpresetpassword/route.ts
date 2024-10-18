import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/models/User";

export async function POST(request:Request){
    await dbConnect()

    try {
        const {email, code} = await request.json()

        const decodedEmail = decodeURIComponent(email)
        
        // console.log(decodedEmail);
        // console.log(email)
        const user = await UserModel.findOne({
            email:decodedEmail
        })

        // console.log("user found",user);

        if(!user){
            return Response.json({
                success:false,
                message:"User not found"
            },{ status: 500})
        }

        // console.log("codes", user.resetPasswordverifyCode, code)
        const isOtpValid = user.resetPasswordverifyCode === code
        const isCodeExpired = new Date(user.resetPasswordverifyCodeExpiry) > new Date()
        // console.log("isOtpValid",isOtpValid, isCodeExpired);

        if(isOtpValid && isCodeExpired) {
            user.isResetPasswordVerified = true
            await user.save()

            return Response.json({  
                success:true,
                message:"Password reset successfully"
            },{ status: 200})
        }else if(!isCodeExpired){
            return Response.json({
                success:false,
                message:"Verification code is expired please signUp again to get new Otp"
            },{ status: 400})
        }else{
            return Response.json({
                success:false,
                message:"Invalid verfication otp"
            },{ status: 400})
        }


    } catch (error) {
        console.error("Error verifying email otp" , error);
        return Response.json({
            success:false,
            message:"Error verifying email otp"
        },{ status: 500})
    }
}