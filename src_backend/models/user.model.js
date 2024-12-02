import mongoose from "mongoose";
import {Schema} from "mongoose";

const providers = ["email/password", "google"];
const roles = ["user", "manager", "admin"];

const userSchema = new Schema(
    {
        name: {type: String, required: true},
        age: {type: Number, required: false},
        email: {type: String, required: true, unique: true},
        phone: {type: String, required: false},
        password: {type: String, required: false},
        googleId: {type: String, required: false, unique: true},
        given_name: {type: String, required: false},
        family_name: {type: String, required: false},

        role: {
            type: String,
            enum: roles,
            required: true,
            default: roles[0],
        },
        provider: {
            type: String,
            enum: providers,
            default: providers[0],
            required: true,
        },
        isVerified: {type: Boolean, required: true, default: false},
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

export const User = mongoose.model("users", userSchema);