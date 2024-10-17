import mongoose from "mongoose";

type ConnectObject = {
    isConnected?: number
}

const connection: ConnectObject = {}
export async function dbConnect(): Promise<void> {
    // console.log("DB Connect function called")
    if (connection.isConnected) {
        console.log("Already connected to database")
        return
    }

    try {
        console.log("Connecting to database",process.env.DATABASE_URL)
        const DB = await mongoose.connect(process.env.DATABASE_URL || "", {})

        connection.isConnected = DB.connections[0].readyState

        console.log("DB connection established");

    } catch (error) {
        //@ts-ignore
        console.log("database connection failed ", + error.message);
        process.exit(1);
    }
}