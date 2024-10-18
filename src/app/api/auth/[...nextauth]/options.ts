import { NextAuthOptions, User as NextAuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/models/User";

interface User extends NextAuthUser {
  _id: string;
  isVerified: boolean;
  username: string;

}

interface Credentials {
  email: string;
  password: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Credentials | undefined): Promise<User | null> {
        await dbConnect();
        try {
          if (!credentials) throw new Error("Missing credentials");

          const user = await UserModel.findOne({
            $or: [{ email: credentials.email }, { username: credentials.email }],
          });

          if (!user) {
            throw new Error("No user found with this email address");
          }
          if (!user.isVerified) {
            throw new Error("Please verify your email address");
          }

          const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
          if (isPasswordCorrect) {
            return user as User; // Cast to the extended User type
          } else {
            throw new Error("Incorrect password");
          }
        } catch (error: unknown) {
          throw new Error((error as Error).message);
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.isVerified = user.isVerified;
        token.username = user.username;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.isVerified = token.isVerified;
        session.user.username = token.username;
      }
      return session;
    },
  },

  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET_KEY,
  pages: {
    signIn: "/signin",
  },
};
