import mongoose from "mongoose";
import {ApiError} from "../errors/api.error";
import {Role} from "../models/role.model";
import {User} from "../models/user.model";

const connectDB = async () => {
    try {
        const dbConnection = await mongoose.connect(process.env.DB_URL);
        // console.log(`2.MongoDB connected:${dbConnection.connection.host}:${dbConnection.connection.port}/${dbConnection.connection.name}`);
        // Check if roles already exist
        const existingRoles = await Role.find();
        if (existingRoles.length === 0) {
            // Create default roles if none exist
           const createdRoles= await Role.createDefaultRoles();
            console.log("Default roles created.",createdRoles);
        } else {
            console.log("Roles already exist, skipping creation.");
        }

        // Fetch all roles after creation
        const roles = await Role.find();
        console.log("existingRoles:",roles.length);
        // Check if the user already exists
        const existingUser = await User.findOne({ email: "andrew_100@gmail.com" });
        if (!existingUser) {
            // Create a new user with all roles
            const user = new User({
                name: "Super Andrew",
                email: "andrew_100@gmail.com",
                roles: roles.map(role => role._id) // Assign all roles to the user
            });
            await user.save();
            console.log("New user created with all roles.",{user});
        } else {
            console.log("User already exists, skipping creation.");
        }

    } catch (error) {
        console.log("Connection error:", error.message)
        throw new ApiError("Failed to database connection",500)
    }
};

export default connectDB;