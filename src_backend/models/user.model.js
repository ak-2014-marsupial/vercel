import mongoose from "mongoose";
import {Schema} from "mongoose";
import {Role} from "./role.model";

const providers = ["email/password", "google"];
// const roles = ["user", "manager", "admin"];

const roles= {
    admin: {rate: 0, title: "admin"},
    manager: {rate: 1, title: "manager"},
    user: {rate: 3, tittle: "user"},
    guest: {rate: 4, title: "guest"},
}
const roleList=Object.keys(roles)

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
            type: [String],
            enum: roleList,
            required: true,
            default: roles.guest.title,
        },
        roles: [{
            type: Schema.Types.ObjectId,
            ref: "Role",
            required: true,
        }],
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
);

// Middleware to set default roles for a new user
userSchema.pre('save', async function(next) {
    if (this.isNew) {
        const roles = await Role.find();
        this.roles = roles[0]._id;
    }
    next();
});

export const User = mongoose.model("users", userSchema);