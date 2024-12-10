import mongoose from "mongoose";

import {ApiError} from "../errors/api.error.js";
import {configs} from "./config.js";

const connectDB = async () => {
    try {
        const dbConnection = await mongoose.connect(configs.DB_URL);
        // console.log(`2.MongoDB connected:${dbConnection.connection.host}/${dbConnection.connection.name}`);

    } catch (error) {
        console.log("Connection error:", error.message)
        throw new ApiError(error.message || "Failed to database connection", error?.status || 500)
    }
};

export default connectDB;