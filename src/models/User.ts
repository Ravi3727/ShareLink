import mongoose, { Schema, Document } from "mongoose";

export interface Link extends Document {
    title: string;
    url: string;
    createdAt: Date;
}

const LinkSchema:Schema<Link> = new Schema({
    title: { type: String, required: [true, "Title is required"] },
    url: { type: String, required: [true, "URL is required"] },
    createdAt: { type: Date, required: true, default: Date.now }
});

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    links: Link[];
    createdAt: Date;
}

const UserSchema: Schema<User> = new Schema({
    username: { type: String, required: [true, "Username is required"], unique: true },
    email: { type: String, required: [true, "Email is required"], unique: true, match: [/.+\@.+\..+/, "Please enter a valid email"], },
    password: { type: String, required: [true, "Password is required"] },
    verifyCode: {
        type: String,
        required: [true, "Verify Code is required"],
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, "verifyCodeExpiry is required"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    links:[{
        type: LinkSchema,
        required: false,
    }],
    createdAt: { type: Date, required: true, default: Date.now }
});



const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema);

export default UserModel;