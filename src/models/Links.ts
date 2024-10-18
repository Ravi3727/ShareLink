import mongoose, { Schema, Document } from "mongoose";

export interface link extends Document {
    title: string;
    url: string;
    createdAt: Date;
}

const LinkSchema: Schema<link> = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title of url is required"],
        unique: true,
    },
    url:{
        type: String,
        required: [true, "url is required"],
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


const LinkModel = (mongoose.models.Problem as mongoose.Model<link>) || mongoose.model<link>("links", LinkSchema);

export default LinkModel;