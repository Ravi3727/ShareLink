import { sendVerificationEmail } from "@/helpers/verficationEmail";
import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";


export async function POST(request: Request) {
    await dbConnect();
    
    try {
        const { username, email, password } = await request.json();

        const existVerfiedUserByUserName = await UserModel.findOne({
            username,
            isVerified: true,
        });

        if (existVerfiedUserByUserName) {
            return Response.json({
                success: false,
                message: "Username already exists",
            }, { status: 400 })
        }


        const existingUserByEmail = await UserModel.findOne({
            email
        })

        const verifyCodeOtp = Math.floor(100000 + Math.random() * 900000).toString()

        if (existingUserByEmail) {
            if (existingUserByEmail.isVerified) {
                return Response.json({
                    success: false,
                    message: 'User already exist with this email',
                }, { status: 400 });
            } else {
                const hashedPassword = await bcrypt.hash(password, 10)
                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.verifyCode = verifyCodeOtp;
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000) 

                await existingUserByEmail.save();
            }
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const expirydate = new Date()
            expirydate.setHours(expirydate.getHours() + 1)


            const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
                verifyCode: verifyCodeOtp,
                verifyCodeExpiry: expirydate,
                isVarified: false,
                links : [],
                createdAt: Date.now(),
            })

            await newUser.save();
        }

        const verifyEmailResponse = await sendVerificationEmail(
            email, username, verifyCodeOtp
        )

        if (!verifyEmailResponse.success) {
            return Response.json({
                success: false,
                message: verifyEmailResponse.message || 'Verification email otp is wrong',
            }, { status: 500 })
        }

        return Response.json({
            success: true,
            message: "Please verify your email to complete signup",
        }, { status: 201 });


    } catch (error) {
        console.error("Error in registering user", error);
        return Response.json({
            success: false,
            message: "User registration failed",
        }, {
            status: 500
        });
    }
}