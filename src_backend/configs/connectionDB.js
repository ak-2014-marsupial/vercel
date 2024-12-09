import mongoose from "mongoose";
import {ApiError} from "../errors/api.error";
import {Role} from "../models/role.model";
import {rolesNew, User} from "../models/user.model";
import {populateDB} from "./populateDB";

const connectDB = async () => {
    try {
        const dbConnection = await mongoose.connect(process.env.DB_URL);
        // console.log("ConnectionDB:",dbConnection.connections[0].port);


    } catch (error) {
        console.log("Connection error:", error.message)
        throw new ApiError(error.message || "Failed to database connection", error?.status || 500)
    }
};

export default connectDB;