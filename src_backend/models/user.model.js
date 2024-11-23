import mongoose from "mongoose";
import {Schema} from "mongoose";

const userSchema = new Schema(
    {
        name: {type: String, required: true},
        age: {type: Number, required: true},
        email: {type: String, required: true, unique: true},
        phone: {type: String, required: false},
        password: {type: String, required: true},
        role: {
            type: String,
            required: true,
            default: "user"
        },
        isVerified: {type: Boolean, required: true, default: false},
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

export const User = mongoose.model("users", userSchema);