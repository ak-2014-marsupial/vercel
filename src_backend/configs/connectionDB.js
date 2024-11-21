import mongoose from "mongoose";
import {ApiError} from "../errors/api.error";

const connectDB = async () => {
    try {
        const dbConnection = await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`2.MongoDB connected:${dbConnection.connection.host}:${dbConnection.connection.port}/${dbConnection.connection.name}`);
    } catch (error) {
        console.log("Connection error:", error.message)
        throw new ApiError("Failed to connect to database",500)
    }
};

export default connectDB;