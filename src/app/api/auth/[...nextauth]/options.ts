import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"
import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/models/User";

// interface Credentials {
//     [key: string]: any;
//   }

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any): Promise<any> {
                await dbConnect()
                try {
                    // const session = await getServerSession(authOptions);
                    // const SessionEmail = session?.user.email;
                    // const userName = session?.user.username;
                    const user = await UserModel.findOne({
                        $or: [
                            { email: credentials.identifier },
                            { username: credentials.identifier }
                        ]
                    })

                    if (!user) {
                        throw new Error("No user found with this email address")
                    }
                    if (!user.isVerified) {
                        throw new Error("Please verify your email address")
                    }
                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)
                    if (isPasswordCorrect) {
                        return user
                    } else {
                        throw new Error("Incorrect password")
                    }

                } catch (error:unknown) {
                    throw new Error(error as string)
                }
            }
        }),
    ],

    callbacks: {

        async jwt({ token, user }) {
            if (user) {
                token._id = user._id?.toString()
                token.isVerified = user.isVerified
                token.username = user.username
            }

            // console.log("From callbacks", token);
            return token;
            
        },
        async session({ session, token }) {
            if (token) {
                session.user._id = token._id
                session.user.isVerified = token.isVerified
                session.user.username = token.username
            }
            return session
        },
    },
   
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET_KEY,
    pages: {
        signIn: '/signin',
    },
}