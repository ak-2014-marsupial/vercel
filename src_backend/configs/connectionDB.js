import mongoose from "mongoose";
import {ApiError} from "../errors/api.error";

import {configs} from "./config";

const connectDB = async () => {
    console.log("start connect to DB....");
    try {
        const dbConnection = await mongoose.connect(configs.DB_URL);
        console.log(`2.MongoDB connected:${dbConnection.connection.host}/${dbConnection.connection.name}`);

    } catch (error) {
        console.log("Connection error:", error.message)
        throw new ApiError(error.message || "Failed to database connection", error?.status || 500)
    }
};

export default connectDB;